const {handleWebhook} = require('../controller/Stripe')
const express = require('express')
const paymentRoute = express.Router()

paymentRoute.post('/', handleWebhook)

module.exports = paymentRoute