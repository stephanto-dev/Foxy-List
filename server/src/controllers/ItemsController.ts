import { Request, Response } from "express";
import { ItemService } from "../services/ItemService";



class ItemsController{
    async create(request: Request, response: Response){
        const {text} = request.body;
        const idStickyNote = request.params.idStickyNote;

        const itemsService = new ItemService();

        try {
            const item = await itemsService.create({text, idStickyNote});

            response.status(201).json({message: 'Item created', item});
        } catch (error:any) {
            response.status(400).json({message: error.message});
        }
    }

    async delete(request: Request, response: Response){
        const idStickyNote = request.params.idStickyNote;
        const idItem = request.params.idItem;
        const userId = request.userId;

        const itemsService = new ItemService();

        try {
            await itemsService.delete(idStickyNote, userId, idItem);

            return response.status(201).json({message: 'Item deleted'});
        } catch (error: any) {
            return response.status(400).json({message: error.message});
        }
    }

    async update(request: Request, response: Response){
        const idStickyNote = request.params.idStickyNote;
        const idItem = request.params.idItem;
        const userId = request.userId;
        const {text} = request.body;

        const itemsService = new ItemService();

        try {
            await itemsService.update(idStickyNote, userId, idItem, text);
            
            return response.status(201).json({message: 'Item updated'});
        } catch (error:any) {
            response.status(400).json({message: error.message})
        }
    }

    async setIsDone(request: Request, response: Response){
        const idStickyNote = request.params.idStickyNote;
        const idItem = request.params.idItem;
        const userId = request.userId;

        const itemsService = new ItemService();

        try {
            await itemsService.setIsDone(idStickyNote, userId, idItem);

            return response.status(201).json({message: 'Item status update'});

        } catch (error:any) {
            response.status(400).json({message: error.message});
        }
    }

    async get(request: Request, response: Response){
        const userId = request.userId;

        const itemsService = new ItemService();

        try {
            const items = await itemsService.get(userId);
            return response.status(200).json({items});
        } catch (error:any) {
            response.status(400).json({message: error.message});
        }
    }
}

export {ItemsController}