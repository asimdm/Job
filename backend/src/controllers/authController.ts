import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/user";
import { error } from "console";
import bcrypt from 'bcryptjs';

export const signup = async (req: Request, res: Response)=>{
    const{name, username, password} = req.body;
    try{
        const findUser = User.findOne({where: {username}});
        if(!findUser){
            const user = await User.create({name, username, password});
            res.status(201).json({
                message: 'User created successfully!'
            });
        }
        else{
            res.status(200).json({
                message: "User already exist. Please log in"
            });
        }
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "There was an error"
        });
    }
};

export const login = async (req: Request, res: Response)=>{
    const {username, password} = req.body;
    try{
        const user = await User.findOne({where: {username}});
        if(!user){
            return res.status(401).json({
                error: "Invalid Username or Password. Try Again"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({
                    error: 'Invalid username or password'
            });
        }


        const token=jwt.sign({id: user.user_id, username: user.username}, process.env.JWT_SECRET!, {
            expiresIn: '1h',
        });
        res.status(200).json({ token });
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "There was an error. Please try again"
        });
    }
};

export const logout = (req: Request, res: Response)=>{
    res.json({message: "User logged out successfully"})
};

export const getUsers = async (req: Request, res: Response)=>{
    try{
        const users = await User.findAll();
        res.status(200).json(users);
    } catch(err){
        console.log(err);
        res.status(500).json({
            error: "There was an error. Please try again later."
        });
    }
};