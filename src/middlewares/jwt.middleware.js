import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    // 1. Read the token
    const token = req.headers['authorization'];

    // 2. If no token, return the error.
    if(!token){
        return res.status(401).send('Unauthorized');
    }
    // 3. check if token is valid.
    try {
        const payload = jwt.verify(
            token,
            process.env.SECRET_KEY
        );
        req.userID = payload.userID;
        console.log("payload", payload);
    } catch (error) {
        // 4.return the errorj
        console.log("error", error);
        return res.status(401).send('Unauthorized');  
    }
    // 5. call next middleware
    next();
}

export default jwtAuth;