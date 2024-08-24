import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724328477513 implements MigrationInterface {
    name = 'Update1724328477513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_d88edac9d7990145ff6831a7bb3\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b0abd12e5dbe0e49bf4f9d79e\` ON \`board\``);
        await queryRunner.query(`ALTER TABLE \`sprint\` DROP FOREIGN KEY \`FK_3ebb1d3425a446881d6d3048312\``);
        await queryRunner.query(`ALTER TABLE \`sprint\` CHANGE \`boardId\` \`boardId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`boardId\` \`boardId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`sprint\` ADD CONSTRAINT \`FK_3ebb1d3425a446881d6d3048312\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_d88edac9d7990145ff6831a7bb3\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_d88edac9d7990145ff6831a7bb3\``);
        await queryRunner.query(`ALTER TABLE \`sprint\` DROP FOREIGN KEY \`FK_3ebb1d3425a446881d6d3048312\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`boardId\` \`boardId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sprint\` CHANGE \`boardId\` \`boardId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`sprint\` ADD CONSTRAINT \`FK_3ebb1d3425a446881d6d3048312\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_6b0abd12e5dbe0e49bf4f9d79e\` ON \`board\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_d88edac9d7990145ff6831a7bb3\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
