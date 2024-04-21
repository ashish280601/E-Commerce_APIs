import { getDB } from "../../config/mongodb.js";
import { ApplicationErrors } from "../../error-handler/applicationError.js";

export default class UserModel {
  // creating a constructor
  constructor(name, email, password, type) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
  }

  // static async signUp(name, email, password, type) {
  //   try {
  //     // 1. Getting a database
  //     const db = getDB();

  //     // 2. Creating an collection.
  //     const userCollection = db.collection("users");

  //     const newUser = { name, email, password, type };
  //     // 3. insert the data from an client to the user collection
  //     await userCollection.insertOne(newUser);
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApplicationErrors("Something went wrongs", 500);
  //   }
  // }

  // static async signIn(email, password) {
  //   try {
  //     const db = getDB();

  //     const userLogin = db.collection("users");

  //     const user = userLogin.findOne({ email, password });
  //     return user;
  //   } catch (error) {
  //     console.log(error);
  //     throw new ApplicationErrors("Something went wrong with database", 500);
  //   }
  // }

  static getAllUser() {
    return users;
  }
}
