import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user.repository.js";
import { ApplicationErrors } from "../../error-handler/applicationError.js";

export default class UserController {
  // creating an instance of an userRepository
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    // write your code logic here
    try {
      const { name, email, password, type } = req.body;
      //  creating an instance of an model
      const newUser = new UserModel(name, email, password, type);
      await this.userRepository.signUp(newUser);
      return res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      throw new ApplicationErrors('Something went wrong', 500);
    }
  }

  async signIn(req, res, next) {
    // write your code logic here
    try {
      const { email, password } = req.body;
      const result = await this.userRepository.signIn(email, password);
      if (!result) {
        return res.status(400).send("Invalid Credentials");
      } else {
        // create json token for successful login
        // syntax jwt.sing(payload object, secretKey, optional object);
        console.log(process.env.SECRET_KEY);
        const token = jwt.sign(
          {
            userID: result.id,
            userEmail: result.email,
          },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).send(token);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrongs");
    }
  }
}
