import { MigrationInterface, QueryRunner } from "typeorm"

export class Petshop1702586333819 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE petshop (
                id INTEGER AUTO_INCREMENT,
                nome VARCHAR(255) NOT NULL,
                cnpj VARCHAR(14) NOT NULL,
                rua VARCHAR(128) NOT NULL,
                numero INT NOT NULL,
                bairro VARCHAR(255) NOT NULL,
                cidade VARCHAR(255) NOT NULL,
                estado VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT now() NOT NULL,
                updated_at DATETIME DEFAULT now() NOT NULL,
                PRIMARY KEY(id)
            );
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "petshop";`
        )
    }

}
