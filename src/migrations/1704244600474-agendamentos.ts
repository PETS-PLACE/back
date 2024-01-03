import { MigrationInterface, QueryRunner } from "typeorm"

export class Agendamentos1704244600474 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `
          CREATE TABLE agendamento (
            id INTEGER AUTO_INCREMENT,
            cpf VARCHAR(11) NOT NULL,
            observacoes TEXT,
            cliente INT NOT NULL,
            petshop INT NOT NULL,
            servico INT NOT NULL,
            animal  INT NOT NULL,
            FOREIGN KEY ( cliente ) REFERENCES client(),
            FOREIGN KEY ( petshop ) REFERENCES animais(),
            FOREIGN KEY ( servico ) REFERENCES petshop(),
            FOREIGN KEY ( animal  ) REFERENCES service()
          );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE agendamento;`);
    }

}
