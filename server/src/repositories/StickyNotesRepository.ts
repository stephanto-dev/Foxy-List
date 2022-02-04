import { EntityRepository, Repository } from "typeorm";
import { StickyNote } from "../entities/StickyNote";

@EntityRepository(StickyNote)
class StickyNotesRepository extends Repository<StickyNote>{

}

export {StickyNotesRepository}