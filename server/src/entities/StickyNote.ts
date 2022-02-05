import {Entity, Column, PrimaryColumn,CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Item } from "./Item";
import { User } from "./User";

import {v4 as uuid} from "uuid";

@Entity("stickyNotes")
class StickyNote{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    idUser: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

    @ManyToOne(() => User, user=> user.stickyNote)
    @JoinColumn({name: 'idUser'})
    user: User;

    @OneToMany(() => Item, item => item.stickyNote)
    @JoinColumn({name: 'idStickyNote'})
    item: Item[]
}

export {StickyNote}