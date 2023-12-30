import { MigrationInterface, QueryRunner } from "typeorm"

/** Cria a tabela animais com Foreign key à animais */
export class Animais1703712492765 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE animais (
          id INTEGER AUTO_INCREMENT,
          nome VARCHAR(255) NOT NULL,
          especie VARCHAR(32) NOT NULL,
          idade INTEGER NOT NULL,
          peso FLOAT NOT NULL,
          clienteId INTEGER NOT NULL,
          created_at DATETIME DEFAULT now() NOT NULL,
          updated_at DATETIME DEFAULT now() NOT NULL,
          PRIMARY KEY (id),
          FOREIGN KEY (clienteId) REFERENCES client(id)
            ON DELETE CASCADE ON UPDATE CASCADE
        );
      `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        DROP TABLE animais;
      `)
    }

}
