const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    }

    //console.log(process.env);
    /** @param expiresIn 
     *  can be number (seconds)
     *  or string (for example, "1h")
     */
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: 3*60*60});
}

module.exports = jwtGenerator;