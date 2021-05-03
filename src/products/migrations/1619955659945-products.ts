import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class products1619955659945 implements MigrationInterface
{

    public async up( queryRunner: QueryRunner ): Promise<void>
    {
        await queryRunner.createTable(
            new Table( {
                name: "products",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "price",
                        type: "int",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            } ),
            true
        );
    }

    public async down( queryRunner: QueryRunner ): Promise<void>
    {
        await queryRunner.dropTable("products");
    }

}
