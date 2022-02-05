import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { StickyNote } from './StickyNote';

import {v4 as uuid} from "uuid";

@Entity("items")
class Item{

    @PrimaryColumn()
    id: string;

    @Column()
    text: string;

    @Column()
    isDone: boolean;

    @Column()
    idStickyNote: string;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

    @ManyToOne(()=>StickyNote, (stickyNote) => stickyNote.item)
    @JoinColumn({name: 'idStickyNote'})
    stickyNote: StickyNote
}

export {Item}