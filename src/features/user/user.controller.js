import UserModel from "./user.model.js";
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
    }else{
        return res.status(200).send("Login Successful");
    }

  }
}
