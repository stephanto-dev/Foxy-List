import { getCustomRepository } from "typeorm"
import { ItemsRepository } from "../repositories/ItemsRepository"
import { StickyNotesRepository } from "../repositories/StickyNotesRepository";



interface IItemService{
    text: string;
    idStickyNote: string;
}

class ItemService{
    async create({text, idStickyNote} : IItemService){
        const itemsRepository = getCustomRepository(ItemsRepository);

        const item = itemsRepository.create({text, idStickyNote});

        await itemsRepository.save(item);

        return item;
    }

    async delete(stickyNoteId:string, userId: string, itemId: string){
        const itemsRepository = getCustomRepository(ItemsRepository);

        const itemExists = await itemsRepository.findOne(itemId, {relations: ['stickyNote']});

        if(!itemExists){
            throw new Error("this item does not exists!");
        }
        if(itemExists.idStickyNote != stickyNoteId){
            throw new Error("wrong sticky note");
        }

        if (userId != itemExists.stickyNote.idUser){
            throw new Error("Authorization Error");
        }
        await itemsRepository.delete(itemId);
    }

    async update(stickyNoteId:string, userId: string, itemId: string, text:string){
        const itemsRepository = getCustomRepository(ItemsRepository);

        const itemExists = await itemsRepository.findOne(itemId, {relations: ['stickyNote']});

        if(!itemExists){
            throw new Error("this item does not exists!");
        }
        if(itemExists.idStickyNote != stickyNoteId){
            throw new Error("wrong sticky note");
        }

        if (userId != itemExists.stickyNote.idUser){
            throw new Error("Authorization Error");
        }

        await itemsRepository.update(itemId, {text});
    }

    async setIsDone(stickyNoteId:string, userId: string, itemId: string){
        const itemsRepository = getCustomRepository(ItemsRepository);

        const itemExists = await itemsRepository.findOne(itemId, {relations: ['stickyNote']});

        if(!itemExists){
            throw new Error("this item does not exists!");
        }
        if(itemExists.idStickyNote != stickyNoteId){
            throw new Error("wrong sticky note");
        }

        if (userId != itemExists.stickyNote.idUser){
            throw new Error("Authorization Error");
        }

        const setIsDone = !itemExists.isDone;
        await itemsRepository.update(itemId, {isDone: setIsDone});
    }

    async get(userId:string){
        const stickyNotesRepository = getCustomRepository(StickyNotesRepository)
        
        const items = await stickyNotesRepository.find({where:{idUser: userId}, relations:['item']});

        return items;

    }
}

export {ItemService}