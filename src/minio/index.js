module.exports = container => {
    const Minio = require('minio')
    const { minioConfig } = container.resolve('config')

    const minioClient = new Minio.Client(minioConfig)

    const getPresignedUrl = (name) => {
        return new Promise((resolve, reject) => {
            minioClient.presignedPutObject(minioConfig.bucket, name, (err, url) => {
                if (err) {
                    reject(err)
                }
                else resolve(url)
            })
        })
    }

    return {
        getPresignedUrl
    }
}
