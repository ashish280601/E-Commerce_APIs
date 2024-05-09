import { model } from "mongoose";
import { userSchema } from "./user.schema.js";

// Creating an model from schema.
const UserModel = model("Users", userSchema);

export default class UserRepository {
  async signUp(user) {
    try {
      const newUser = new UserModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with database");
    }
  }

  async signIn(email, password) {
    try {
        return await UserModel.findOne({email, password});

    } catch (error) {
      console.log(error);
    }
  }

  async  findByEmail(email){
    try {

    return await UserModel.findOne({ email });
    } catch (error) {
        console.log(error);
        throw new Error("Something went wrong with database", 500)
    }
  }
}
