import { getDB } from "../../config/mongodb.js";
import { ApplicationErrors } from "../../error-handler/applicationError.js";

class UserRepository {
  async signUp(newUser) {
    try {
      // 1. Get a dataabse
      const db = getDB();

      // 2. Creating a collection
      const userCollection = db.collection("users");

      // 3. Insert the data
      await userCollection.insertOne(newUser);
    } catch (error) {
      console.log(error);
      throw new ApplicationErrors("Something went wrongs", 500)
    }
  }

  async signIn(email, password){
    try {
        const db = getDB();

    const userCollection = db.collection("users");

    return await userCollection.findOne({ email, password });
    } catch (error) {
        console.log(error);
        throw new ApplicationErrors("Something went wrong with database", 500)
    }
  }

  async findByEmail(email){
    try {
        const db = getDB();

    const userCollection = db.collection("users");

    return await userCollection.findOne({ email });
    } catch (error) {
        console.log(error);
        throw new ApplicationErrors("Something went wrong with database", 500)
    }
  }
}

export default UserRepository;
