import { MigrationInterface, QueryRunner } from "typeorm"

export class PetshopService1702726194648 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
            CREATE TABLE petshop_services_service (
                id INTEGER AUTO_INCREMENT PRIMARY KEY,
                petshopId INTEGER NOT NULL,
                serviceId INTEGER NOT NULL,
                Foreign Key (petshopId) REFERENCES petshop (id)
                    ON DELETE CASCADE ON UPDATE CASCADE,
                Foreign Key (serviceId) REFERENCES service (id)
                    ON DELETE CASCADE ON UPDATE CASCADE,
                created_at DATETIME DEFAULT now() NOT NULL,
                updated_at DATETIME DEFAULT now() NOT NULL
            );
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `
            DROP TABLE petshop_services_service
            `
        )
    }

}
