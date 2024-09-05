import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1724572943158 implements MigrationInterface {
    name = 'Update1724572943158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_5ad8a047b8f023bf36b2a232a42\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`sprintId\` \`sliceId\` int NOT NULL`);
        await queryRunner.query(`CREATE TABLE \`slice\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`color\` varchar(21) NOT NULL, \`boardId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`slice\` ADD CONSTRAINT \`FK_56dda485945c83cc178bd556ed1\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_3eab5fd901a98f82f44b7560fa4\` FOREIGN KEY (\`sliceId\`) REFERENCES \`slice\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_3eab5fd901a98f82f44b7560fa4\``);
        await queryRunner.query(`ALTER TABLE \`slice\` DROP FOREIGN KEY \`FK_56dda485945c83cc178bd556ed1\``);
        await queryRunner.query(`DROP TABLE \`slice\``);
        await queryRunner.query(`ALTER TABLE \`task\` CHANGE \`sliceId\` \`sprintId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_5ad8a047b8f023bf36b2a232a42\` FOREIGN KEY (\`sprintId\`) REFERENCES \`sprint\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
