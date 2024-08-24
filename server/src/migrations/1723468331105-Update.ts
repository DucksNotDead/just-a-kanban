import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1723468331105 implements MigrationInterface {
    name = 'Update1723468331105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_a5f3f3a97784c5239a53c63c8d\` ON \`task\``);
        await queryRunner.query(`CREATE TABLE \`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`label\` varchar(20) NOT NULL, \`checked\` tinyint NOT NULL DEFAULT 0, \`taskId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`todos\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_681a7f7ce5bbf0990f8d51f4e0d\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_681a7f7ce5bbf0990f8d51f4e0d\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`todos\` text NOT NULL`);
        await queryRunner.query(`DROP TABLE \`todo\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_a5f3f3a97784c5239a53c63c8d\` ON \`task\` (\`reviewerId\`)`);
    }

}
