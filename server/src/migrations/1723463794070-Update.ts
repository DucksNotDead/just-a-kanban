import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1723463794070 implements MigrationInterface {
    name = 'Update1723463794070'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_4ba68e3e65410dfd632913e4373\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`finished\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`responsibleId\` \`responsibleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_4ba68e3e65410dfd632913e4373\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_4ba68e3e65410dfd632913e4373\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`responsibleId\` \`responsibleId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`finished\` varchar(16) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_4ba68e3e65410dfd632913e4373\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
