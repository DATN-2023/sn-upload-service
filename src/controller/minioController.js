module.exports = (container) => {
  const logger = container.resolve('logger')
  const {
    httpCode,
    serverHelper
  } = container.resolve('config')
  const minioHelper = container.resolve('minioHelper')

  const extractFileExtension = filename => {
    const files = filename.split('.')
    const extension = files.pop()
    const file = files.join('.')
    const time = (Date.now() / 1000).toFixed(3)
    return `${serverHelper.stringToSlug(file)}-${time}.${extension}`
  }

  const getPresignedUrl = async (req, res) => {
    try {
      const { name } = req.query
      if (!name) {
        return res.status(httpCode.BAD_REQUEST).json({ msg: 'name required' })
      }
      const minioName = extractFileExtension(name)
      const url = await minioHelper.getPresignedUrl(minioName)
      res.status(httpCode.SUCCESS).json({
        url,
        name: minioName
      })
    } catch (e) {
      logger.e(e)
      res.status(httpCode.UNKNOWN_ERROR).end()
    }
  }
  return {
    getPresignedUrl
  }
}
