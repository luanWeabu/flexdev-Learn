const User = require('../../models/authorization/User.model')

exports.signin = async (req, res , next) => {
  try{
      const newUser = await User.create(req.body)
      res.status(200).json({
          status: 'success',
          data:{
              user: newUser
          }
      })
  } catch (e) {
      res.status(400).json({
          code: "CODE_ERR",
          message: "Something is wrong in her"})
  }
}