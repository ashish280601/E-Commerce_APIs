import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";


export default class UserController {
  signUp(req, res) {
    // write your code logic here
    const { name, email, password, type } = req.body;
    const newUser = UserModel.signUp(name, email, password, type);
    return res.status(201).send(newUser);
  }

  signIn(req, res) {
    // write your code logic here
    const result = UserModel.signIn(req.body.email, req.body.password);
    if (!result) {
      return res.status(400).send("Invalid Credentials");
    } else {
      // create json token for successful login
      // syntax jwt.sing(payload object, secretKey, optional object); 

      console.log(process.env.SECRET_KEY);
      const token = jwt.sign({
        userID: result.id,
        userEmail: result.email
      }, process.env.SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )

      return res.status(200).send(token);
    }
  }
}
