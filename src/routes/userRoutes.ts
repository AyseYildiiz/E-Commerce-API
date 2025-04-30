import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import db  from "../db";

const router = express.Router();

//Register
router.post("/register",async (req: Request, res: Response)=>{
    const {name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    try{
        const newUser = await db("users").insert({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            message: "User registered successfully",
            userId: newUser[0],
        });
    } catch (error){
        res.status(500).json({error: "Internal Server Error"});
    }
});
// Login
router.post("/login", async (req:Request, res: Response)=>{
    const { email, password } = req.body;
    try {
        const user = await db("users").where({email}).first();
        if(!user){
            res.status(404).json({error: "User not found"});
            return
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentials" });
            return
        }

        res.status(200).json({ message: "Login successful", userId: user.id });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
export default router;

router.post("/products", async (req: Request, res: Response) => {
    const { name, description, price, stock } = req.body;

    try {
        const newProduct = await db("products").insert({
            name,
            description,
            price,
            stock,
        });

        res.status(201).json({
            message: "Product added successfully",
            productId: newProduct[0],
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/products", async (req: Request, res: Response) => {
    try {
        const products = await db("products").select("*");
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.put("/products/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;

    try {
        const product = await db("products").where({ id }).first();
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return
        }

        await db("products").where({ id }).update({
            name: name || product.name,
            description: description || product.description,
            price: price || product.price,
            stock: stock || product.stock,
        });

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/products/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const product = await db("products").where({ id }).first();
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return
        }

        await db("products").where({ id }).del();
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});