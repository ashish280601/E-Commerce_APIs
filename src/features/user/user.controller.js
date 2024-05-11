import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserModel from "./user.model.js";
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
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new UserModel(name, email, hashedPassword, type);
      await this.userRepository.signUp(newUser);
      return res.status(201).send(newUser);
    } catch (error) {
      console.log(error);
      throw new ApplicationErrors("Something went wrong", 500);
    }
  }

  async signIn(req, res, next) {
    // write your code logic here
    try {
      const { email, password } = req.body;
      // 1. Find user by email.
      const user = await this.userRepository.findByEmail(email);
      if (!user) {

        return res.status(400).send("Invalid user email credential");

      } else {
        // 2. Compare password with hashed Password
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          // create json token for successful login
          // syntax jwt.sing(payload object, secretKey, optional object);
          console.log(process.env.SECRET_KEY);
          const token = jwt.sign(
            {
              userID: user._id,
              userEmail: user.email,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h",
            }
          );

          return res.status(200).send(token);
        } else {
          return res.status(400).send("Invalid user password credential");
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went wrongs");
    }
  }

  // function for reset password.
  async resetPassword(req, res, next){
    try {
      const { newPassword } = req.body;
      const hashedPassword = await bcrypt.hash(newPassword,12);
      const userID = req.userID;

      await this.userRepository.resetPassword(userID, hashedPassword);
      return res.status(200).send('Password reset successful');
    } catch (error) {
      console.log(error); 
      throw new Error("Something went wrong");
    }
  }
}
