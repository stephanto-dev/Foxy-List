import {Entity, Column, PrimaryColumn, OneToMany, JoinColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import { StickyNote } from "./StickyNote";

import {v4 as uuid} from "uuid";

import bcrypt from "bcrypt";

@Entity("users")
class User{

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor(){
        if(!this.id){
            this.id = uuid();
        }
    }

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password,8);
    }

    @OneToMany(() => StickyNote, (stickyNote) => stickyNote.user,{
        cascade:['insert', 'update', 'remove']
    })
    @JoinColumn({name: 'idUser'})
    stickyNote: StickyNote[]
}

export {User}