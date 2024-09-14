import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1726299578273 implements MigrationInterface {
    name = 'Update1726299578273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`slice\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`slice\` ADD \`name\` varchar(60) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(60) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` ON \`board\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`slug\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD UNIQUE INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` (\`slug\`)`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`name\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`step\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`step\` ADD \`name\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`label\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`label\` varchar(60) NOT NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_3399e2710196ea4bf734751558\` ON \`task\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`title\` varchar(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD UNIQUE INDEX \`IDX_3399e2710196ea4bf734751558\` (\`title\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP INDEX \`IDX_3399e2710196ea4bf734751558\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`title\``);
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`title\` varchar(40) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_3399e2710196ea4bf734751558\` ON \`task\` (\`title\`)`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP COLUMN \`label\``);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD \`label\` varchar(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`step\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`step\` ADD \`name\` varchar(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`name\` varchar(24) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`board\` DROP INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP COLUMN \`slug\``);
        await queryRunner.query(`ALTER TABLE \`board\` ADD \`slug\` varchar(24) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` ON \`board\` (\`slug\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`name\` varchar(40) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`username\` varchar(40) NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\` (\`username\`)`);
        await queryRunner.query(`ALTER TABLE \`slice\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`slice\` ADD \`name\` varchar(24) NOT NULL`);
    }

}
