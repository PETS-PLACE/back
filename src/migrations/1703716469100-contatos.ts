import { MigrationInterface, QueryRunner } from "typeorm"

/** Cria tabela contatos com Foreign key à petshop */
export class Contatos1703716469100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE contatos (
          id INTEGER AUTO_INCREMENT,
          info VARCHAR(255) NOT NULL,
          petshopId INTEGER NOT NULL,
          created_at DATETIME DEFAULT now() NOT NULL,
          updated_at DATETIME DEFAULT now() NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (petshopId) REFERENCES petshop(id)
            ON DELETE CASCADE ON UPDATE CASCADE
        )
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        DROP TABLE contatos;
      `)
    }

}
