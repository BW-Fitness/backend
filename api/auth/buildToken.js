const jwt = require('jsonwebtoken');

// module.exports = ({ 
//   user_id, 
//   username, 
//   role 
// }) => { const payload = {
//     subject: user_id,
//     username: username,
//     role: role
//   }
//   const options = {
//     expiresIn: '1d'
//   }
//   const SECRET = process.env.SECRET 
//   return jwt.sign(payload, SECRET, options)
// };

module.exports = ({ 
  user_id, 
  username, 
  role 
});
