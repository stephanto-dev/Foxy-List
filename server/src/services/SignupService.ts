import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";


interface ISignupCreate{
    name: string;
    email: string;
    password: string;
}

class SignupService{
    async create({name, email, password} : ISignupCreate){
        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists){
            throw new Error("User already exists");
        }

    
        const userData = usersRepository.create({
            name,
            email,
            password
        });
    
        await usersRepository.save(userData);

        return userData;
    }
}

export {SignupService}