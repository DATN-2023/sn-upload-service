const serverSettings = {
  port: process.env.PORT || 8004,
  basePath: process.env.BASE_PATH || ''
}

const httpCode = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  TOKEN_EXPIRED: 409,
  UNKNOWN_ERROR: 520,
  FORBIDDEN: 403,
  ADMIN_REQUIRE: 406
}

const dbSettings = {
  db: process.env.DB || 'hddt-customer',
  user: process.env.DB_USER || '',
  pass: process.env.DB_PASS || '',
  repl: process.env.DB_REPLS || '',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.split(',') : [
    'localhost:27017'
  ]
}
const serverHelper = function () {
  const jwt = require('jsonwebtoken')
  const crypto = require('crypto')
  const secretKey = process.env.SECRET_KEY || '112customer#$!@!'

  function decodeToken (token) {
    return jwt.decode(token)
  }

  function genToken (obj) {
    return jwt.sign(obj, secretKey, { expiresIn: '1d' })
  }

  function verifyToken (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secretKey, (err, decoded) => {
        err ? reject(new Error(err)) : resolve(decoded)
      })
    })
  }

  function encryptPassword (password) {
    return crypto.createHash('sha256').update(password, 'binary').digest('base64')
  }

  function stringToSlug (str) {
    const from = 'àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ'
    const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy'
    for (let i = 0, l = from.length; i < l; i++) {
      str = str.replace(RegExp(from[i], 'gi'), to[i])
    }

    str = str.toLowerCase()
      .trim()
      .replace(/[^a-z0-9/ -]/g, '')
      .replace(/ +/g, '-')

    return str
  }


  return { decodeToken, encryptPassword, verifyToken, genToken, stringToSlug }
}

const minioConfig = {
  endPoint: process.env.MINIO_ENDPOINT || '127.0.0.1',
  port: +process.env.MINIO_PORT || 9000,
  useSSL: process.env.MINIO_USESSL || false,
  accessKey: process.env.MINIO_ACCESSKEY || '9s7yoeIjnXuQerU2Zu3A',
  secretKey: process.env.MINIO_SECRETKEY || '5zhUE5gb600VFXmHkx7MOVbt01CGkKULzsJ3Dmff',
  bucket: process.env.MINIO_BUCKET || 'social-network'
}
module.exports = { dbSettings, serverHelper: serverHelper(), serverSettings, httpCode, minioConfig }
