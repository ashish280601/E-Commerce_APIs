import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next) => {
  // 1. Check if authorization header is empty.

  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).send("No authorization details found");
  }
  console.log(authHeader);

  // 2. Extracting credentials. [Basic qwertri683538wryuhu]
  const base64Credential = authHeader.replace("Basic", ",", "");
  console.log(base64Credential);

  // 3. Decoding Credential
  const decodeCredential = Buffer.from(base64Credential, "base64").toString(
    "utf8"
  );
  console.log(decodeCredential); // [username:password]

  const creds = decodeCredential.split(":");

  const user = UserModel.getAllUser().find(
    (u) => u.email === creds[0] && u.password === creds[1]
  );

  if (user) {
    // next will send the next middleware function of an api
    next();
    // return res.status(201).send("Authorization Successful");
  } else {
    return res.status(401).send("Incorrect Credential");
  }
};

export default basicAuthorizer;