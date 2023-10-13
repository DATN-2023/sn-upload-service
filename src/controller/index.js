module.exports = (container) => {
  const minioController = require('./minioController')(container)
  return { minioController }
}
