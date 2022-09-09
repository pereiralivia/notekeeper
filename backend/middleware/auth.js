const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (request, response, next) => {
    const token = getToken(request)
    
    if(!token || token === "null"){
        response.status(400)
        throw new Error('Not authorized')
    }

    const decodedToken = jwt.verify(token, process.env.SECRET)
    const user = await User.findById(decodedToken.userId)
    request.user = {
        _id: user._id
    }
    next()
}

const getToken = (request) => {
    const authorization = request.headers.authorization;
  
    if (authorization && authorization.startsWith("Bearer ")) {
      return authorization.substring(7);
    } else {
      return null;
    }
  };
  

module.exports = auth