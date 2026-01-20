const express = require('express')
const { logon, getMessage } = require('../controllers/main')
const authenticationMiddleware = require('../middleware/auth')

const router = express.Router()

router.route('/logon').post(logon)

router.route('/hello').get(authenticationMiddleware, getMessage)

module.exports = router