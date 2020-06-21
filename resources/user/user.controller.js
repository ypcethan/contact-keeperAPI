const User = require('./user.model')

const catchAsync = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err))
    }
}
exports.postRegister = async (req, res) => {
    try {
        const user = await User.create({ ...req.body })
        res.status(201).json({
            status: "success",
            data: {
                user: user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error
        });
    }
}