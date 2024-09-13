import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1726059482274 implements MigrationInterface {
    name = 'Update1726059482274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_4ba68e3e65410dfd632913e4373\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_4ba68e3e65410dfd632913e4373\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_4ba68e3e65410dfd632913e4373\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_4ba68e3e65410dfd632913e4373\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
