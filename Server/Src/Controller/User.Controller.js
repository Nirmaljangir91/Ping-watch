const User = require('../models/User.js')
const { registerSchema, loginSchema } = require('../Validator/auth.Schema.js') 
const ApiError = require('../Utills/ApiError.Util.js')
const asyncHandler = require('../Utills/AsyncHandle.Util.js')
const ApiResponse = require('../Utills/ApiResponse.Util.js')


exports.registerUser = asyncHandler(async (req, res) => {
        const { name, email, password } = req.body

        const exitstingUser = await User.findOne({email});
        if(exitstingUser) throw  new ApiError(409, 'User already exists')

            const user= await User.create({ name, email, password});

            res.status(201).json(
                new ApiResponse(201, 'User registered successfully', user)
            )
    
})



exports.loginUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const user = await User.findOne({ email}).select('+password') 

        if(!user) throw new ApiError(404, 'User not found')

        const isPasswordValid = await user.comparePassword(password, user.password);

        if(!isPasswordValid) return new ApiError(401, 'Invalid email or password');

        // Prepare user response 
        const loggedInUser = await User.findById(user._id).select('-password');
        res.status(200).json(
            new ApiResponse(200, 'User logged in successfully', loggedInUser)
        )

   
}) 








