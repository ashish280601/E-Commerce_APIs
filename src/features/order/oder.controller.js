import OrderRepository from "./order.repository.js";

export default class OrderController{
    constructor(){
        this.orderRepository = new OrderRepository();
    }

    async placeOrder(req, res){
        try {
            const userID = req.userID;
            await this.orderRepository.placeOrder(userID);
            return res.status(201).send("Order is created");
        } catch (error) {
            console.log(error);
        }
    }
}