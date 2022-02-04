import {Entity, Column, PrimaryColumn, OneToMany, JoinColumn} from "typeorm";
import { StickyNote } from "./StickyNote";

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

    @OneToMany(() => StickyNote, (stickyNote) => stickyNote.user,{
        cascade:['insert', 'update', 'remove']
    })
    @JoinColumn({name: 'idUser'})
    stickyNote: StickyNote[]
}

export {User}