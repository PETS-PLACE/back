import { MigrationInterface, QueryRunner } from "typeorm"

export class Agendamentos1704244600474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `
          CREATE TABLE agendamento (
            id INTEGER AUTO_INCREMENT PRIMARY KEY,
            cpf VARCHAR(11) NOT NULL,
            observacoes TEXT,
            clienteId INT NOT NULL,
            petshopId INT NOT NULL,
            servicoId INT NOT NULL,
            animalId  INT NOT NULL,
            FOREIGN KEY ( clienteId ) REFERENCES client( id ),
            FOREIGN KEY ( petshopId ) REFERENCES animais( id ),
            FOREIGN KEY ( servicoId ) REFERENCES petshop( id ),
            FOREIGN KEY ( animalId  ) REFERENCES service( id )
          );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE agendamento;`);
    }

}
