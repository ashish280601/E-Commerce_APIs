// 1. Import Express
import express from "express";
import UserController from "./user.controller.js";

// 2. Initialize the router
const userRouter = express.Router();

// 3. creating an instance to get an access of an userController method and parameter
const userController = new UserController();

// binding a contructor instance of an controller with callback
userRouter.post('/signup', (req, res) => {
    userController.signUp(req, res);
});

userRouter.post('/signin', (req, res) => {
    userController.signIn(req, res);
})

// In this routing we are passing a reference 

// userRouter.post('/signup', userController.signUp)
// userRouter.post('/signin', userController.signIn)

export default userRouter;