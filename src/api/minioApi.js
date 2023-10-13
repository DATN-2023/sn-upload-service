module.exports = (app, container) => {
  const { serverSettings } = container.resolve('config')
  const { minioController } = container.resolve('controller')
  const { basePath } = serverSettings
  app.get(`${basePath}/presignedUrl`, minioController.getPresignedUrl)
}
