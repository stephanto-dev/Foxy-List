import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface ILoginCreate{
    email: string;
    password: string;
}

class LoginService{
    async create({email, password} : ILoginCreate){

        const usersRepository = getCustomRepository(UsersRepository);

        const userExists = await usersRepository.findOne({email});

        if(!userExists){
            throw new Error("Authentication error");
        }
        
        const isValidPassword = await bcrypt.compare(password, userExists.password);
        if(!isValidPassword){
            throw new Error('invalid password');
        }

        let token = jwt.sign({
            userId: userExists.id,
            email: userExists.email
        },)
    }
}

export{LoginService}