import { MigrationInterface, QueryRunner } from "typeorm"

export class InsertService1802583932920 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            INSERT INTO service (name, description, cost, created_at, updated_at)
            VALUES
              ('Banho e Tosa', 'Inclui banho e tosa higiênica para animais de estimação.', 50.55, NOW(), NOW()),
              ('Cuidados com a Pele e Pelagem', 'Tratamentos para a pele, hidratação e escovação.', 40.80, NOW(), NOW()),
              ('Corte de Unhas', 'Corte seguro das unhas do animal de estimação.', 20.25, NOW(), NOW()),
              ('Consulta Veterinária', 'Consultas com veterinários e serviços de vacinação.', 80.40, NOW(), NOW()),
              ('Serviços de Emergência', 'Atendimento emergencial para casos de saúde.', 120.00, NOW(), NOW()),
              ('Venda de Produtos para Animais', 'Alimentos, brinquedos e acessórios para animais.', 25.50, NOW(), NOW()),
              ('Serviços de Hospedagem', 'Hospedagem temporária para animais.', 60.00, NOW(), NOW()),
              ('Creche para Animais de Estimação', 'Cuidados diurnos para animais de estimação.', 40.00, NOW(), NOW()),
              ('Treinamento de Obediência', 'Aulas de treinamento para animais de estimação.', 60.00, NOW(), NOW()),
              ('Grooming Específico para Raças', 'Serviços de grooming adaptados a raças específicas.', 70.00, NOW(), NOW()),
              ('Serviços de Adestramento', 'Treinamento comportamental para animais.', 50.00, NOW(), NOW()),
              ('Serviços de Exames Diagnósticos', 'Exames laboratoriais e de imagem para animais.', 100.00, NOW(), NOW()),
              ('Cuidados com os Dentes', 'Escovação dental e limpeza dental profissional.', 30.00, NOW(), NOW()),
              ('Serviços de Estética Animal', 'Pintura de unhas e tintura para pelagem.', 25.00, NOW(), NOW()),
              ('Acessórios Personalizados', 'Venda de acessórios personalizados para animais de estimação.', 29.90, NOW(), NOW());
            
            `
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DELETE FROM service;
            `
        )
    }

}
