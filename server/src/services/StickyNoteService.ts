import { getCustomRepository } from "typeorm";
import {StickyNotesRepository} from "../repositories/StickyNotesRepository";


interface IStickyNote{
    idUser: string;
    name?: string;
}

class StickyNoteService{
    async create({idUser, name} : IStickyNote){
        const stickyNotesRepository = getCustomRepository(StickyNotesRepository);

        const stickyNote = stickyNotesRepository.create({idUser, name});

        await stickyNotesRepository.save(stickyNote);

        return stickyNote;
    }

    async delete(stickyNoteId:string, userId: string){
        const stickyNotesRepository = getCustomRepository(StickyNotesRepository);

        const stickyNoteExists = await stickyNotesRepository.findOne(stickyNoteId);

        if(!stickyNoteExists){
            throw new Error("this note does not exists!");
        }

        if(stickyNoteExists.idUser != userId){
            throw new Error("Authorization error");
        }

        stickyNotesRepository.delete(stickyNoteId);
    }

    async get(userId: string){
        const stickyNotesRepository = getCustomRepository(StickyNotesRepository);

        const stickyNotes = await stickyNotesRepository.find({where:{idUser: userId}});

        return stickyNotes;
    }
}

export {StickyNoteService}