import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { StickyNote } from './StickyNote';

@Entity("items")
class Item{

    @Column()
    id: string;

    @Column()
    text: string;

    @Column()
    isDone: boolean;

    @Column()
    idStickyNote: string;

    @ManyToOne(()=>StickyNote, (stickyNote) => stickyNote.item)
    @JoinColumn({name: 'idStickyNote'})
    stickyNote: StickyNote
}

export {Item}