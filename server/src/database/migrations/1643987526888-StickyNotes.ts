import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class StickyNotes1643987526888 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "stickyNotes",
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        generationStrategy: "uuid"
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "idUser",
                        type: "varchar",
                        generationStrategy: "uuid"
                    }
                ],
                foreignKeys:[{
                    name: "idUserFk",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["idUser"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("stickyNotes");
    }

}
