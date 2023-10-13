module.exports = (container) => {
  const logger = container.resolve('logger')
  const {
    httpCode,
    serverHelper
  } = container.resolve('config')
  const minioHelper = container.resolve('minioHelper')
  const getPresignedUrl = async (req, res) => {
    try {
      const { name } = req.query
      if (!name) {
        return res.status(httpCode.BAD_REQUEST).json({ msg: 'name required' })
      }
      const url = await minioHelper.getPresignedUrl(name)
      res.status(httpCode.SUCCESS).json({
        url,
        name
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
