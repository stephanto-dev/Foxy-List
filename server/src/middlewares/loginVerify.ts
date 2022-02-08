import { NextFunction, Request, Response } from "express";
import {verify} from "jsonwebtoken";

interface IPayload{
    userId:string;
    iat: number;
    exp:number;
}


export function loginVerify(request: Request, response:Response, next: NextFunction){
    const authToken = request.headers.authorization;

    if(!authToken){
        return response.status(401).json({error:"token.invalid"});
    }

    const [, token] = authToken.split(" ");
    try {

        const data = verify(token, `${process.env.JWT_SECRET}`);

        const {userId} = data as IPayload;

        request.userId = userId;

        return next();
    } catch (error) {
        return response.status(401).json({error:"token.expired"})
    }
}