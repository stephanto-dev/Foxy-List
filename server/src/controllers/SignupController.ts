import {Request, Response} from "express";

import { SignupService } from "../services/SignupService";


class SignupController{
    async handle(request:Request, response: Response){
        const {name, email, password} = request.body;

        const signupService = new SignupService();

        try {
            const userData = await signupService.create({name, email, password});
        
            return response.status(201).json(userData);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message,
            })
        }
    }
}

export {SignupController}