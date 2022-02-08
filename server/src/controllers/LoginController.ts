import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";



class LoginController{
    async handle(request:Request,response:Response){
        const {email, password} = request.body;

        const loginService = new LoginService();

        try {
            const token = await loginService.create({email, password});

            return response.status(200).json({message: "Authenticated", token});
        } catch (error:any) {
            return response.status(401).json({
                message: error.message,
            })
        }
    }
}

export {LoginController}