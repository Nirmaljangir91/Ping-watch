const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../Controller/User.Controller.js');
const validate = require('../Middleware/validate.middleware.js');
const { registerSchema, loginSchema } = require('../Validator/auth.Schema.js');


router.post('/reg', validate(registerSchema), registerUser)

router.post('/log', validate(loginSchema), loginUser)

module.exports = router;