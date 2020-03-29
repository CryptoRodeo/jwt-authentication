const jwt = require('jsonwebtoken');

module.exports = {
    validateToken: (req,res,next) => {
        const authHeader = req.headers.authorization;
        let result;
        let status = 200;

        if(authHeader)
        {
            const token = req.headers.authorization.split(' ')[1]; //bearer token format
            const options = {
                expiresIn: '2d',
                issuer: 'bryanramos.xyz'
            };

            try
            {
                //verify that token hasnt expired & has been issued by the correct party 
                result = jwt.verify(token, process.env.JWT_SECRET, options);

                //pass the decoded result back to the body of the request
                req.decoded = result;

                //call the next middleware
                next();
            }
            catch(err)
            {
                throw new Error(err);
            }
        }
        else
        {
            result = {
                error: 'Authentication error, token required',
                status: 401
            };
            res.status(401).send(result);
        }
    }
}