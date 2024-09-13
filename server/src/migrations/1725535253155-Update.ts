import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1725535253155 implements MigrationInterface {
    name = 'Update1725535253155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`slice\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`slice\` ADD \`name\` varchar(24) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` ON \`board\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`slug\` varchar(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD UNIQUE INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` (\`slug\`)`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`name\` varchar(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`label\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`label\` varchar(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`created\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`created\` varchar(18) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`updated\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`updated\` varchar(18) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`starts\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`starts\` varchar(18) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`deadline\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`deadline\` varchar(18) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`step\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`step\` ADD \`name\` varchar(24) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`step\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`step\` ADD \`name\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`deadline\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`deadline\` varchar(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`starts\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`starts\` varchar(16) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`updated\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`updated\` varchar(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`created\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`created\` varchar(16) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`label\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`label\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`name\` varchar(20) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`slug\` varchar(20) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` ON \`board\` (\`slug\`)`);
        await queryRunner.query(`ALTER TABLE \`slice\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`slice\` ADD \`name\` varchar(20) NOT NULL`);
    }

}
