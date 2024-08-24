import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724328717809 implements MigrationInterface {
    name = 'Update1724328717809'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_9fc19c95c33ef4d97d09b72ee95\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_681a7f7ce5bbf0990f8d51f4e0d\``);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_9fc19c95c33ef4d97d09b72ee95\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_681a7f7ce5bbf0990f8d51f4e0d\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_681a7f7ce5bbf0990f8d51f4e0d\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_9fc19c95c33ef4d97d09b72ee95\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_681a7f7ce5bbf0990f8d51f4e0d\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_9fc19c95c33ef4d97d09b72ee95\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
