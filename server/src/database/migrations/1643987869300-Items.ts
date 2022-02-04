import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Items1643987869300 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "items",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "text",
                        type: "varchar"
                    },
                    {
                        name: "isDone",
                        type: "boolean",
                        default: false
                    },
                    {
                        name: "idStickyNote",
                        type: "varchar",
                        generationStrategy: "uuid"
                    }
                ],
                foreignKeys:[
                    {
                        name: "idStickyNoteFk",
                        referencedTableName: "stickyNotes",
                        referencedColumnNames: ["id"],
                        columnNames: ["idStickyNote"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
