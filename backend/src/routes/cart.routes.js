


import express from "express";
import { addItemToCart, removeItemFromCart, getCart } from "../controllers/cart.Controller.js";


const router = express.Router();

router.post("/add", addItemToCart);
router.post("/remove", removeItemFromCart);
router.get("/:userID", getCart);

export default router;
