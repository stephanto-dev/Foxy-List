import { Request, Response } from "express";
import { StickyNoteService } from "../services/StickyNoteService";


class StickyNoteController{
    async create(request: Request, response: Response){
        const idUser = request.userId;
        const stickyNoteService = new StickyNoteService();

        const stickyNote = await stickyNoteService.create({
            idUser
        })


        return response.status(200).json({message: 'Sticky note created', id: stickyNote});
    }

    async delete(request: Request, response: Response){
        const stickyNoteId = request.params.id;
        const userId = request.userId;

        const stickyNoteService = new StickyNoteService();
        
        try {
            await stickyNoteService.delete(stickyNoteId, userId);

            return response.status(201).json({message: 'Sticky note deleted'});
        } catch (error: any) {
            return response.status(400).json({message: error.message});
        }
    }

    async get(request: Request, response: Response){
        const userId = request.userId;

        const stickyNoteService = new StickyNoteService();

        try {
            const stickyNotes = await stickyNoteService.get(userId);
            return response.status(200).json({stickyNotes});
        } catch (error:any) {
            return response.status(400).json({message: error.message});
        }

    }
}

export {StickyNoteController}