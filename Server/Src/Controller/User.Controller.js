const User = require('../models/User.js')
const { registerSchema, loginSchema } = require('../Validator/auth.Schema.js') 
const ApiError = require('../utils/ApiError.js')