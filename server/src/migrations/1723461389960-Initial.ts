import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1723461389960 implements MigrationInterface {
    name = 'Initial1723461389960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`board\` (\`id\` int NOT NULL AUTO_INCREMENT, \`slug\` varchar(20) NOT NULL, \`name\` varchar(20) NOT NULL, \`createdById\` int NOT NULL, UNIQUE INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` (\`slug\`), UNIQUE INDEX \`IDX_6b0abd12e5dbe0e49bf4f9d79e\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sprint\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`color\` varchar(21) NOT NULL, \`boardId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`step\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(120) NOT NULL, \`taskId\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(40) NOT NULL, \`todos\` text NOT NULL, \`order\` int NOT NULL, \`created\` varchar(16) NOT NULL, \`updated\` varchar(16) NOT NULL, \`starts\` varchar(16) NULL, \`deadline\` varchar(16) NOT NULL, \`finished\` varchar(16) NULL, \`responsibleId\` int NOT NULL, \`sprintId\` int NOT NULL, \`stepId\` int NOT NULL, \`boardId\` int NOT NULL, UNIQUE INDEX \`IDX_3399e2710196ea4bf734751558\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(40) NOT NULL, \`name\` varchar(40) NOT NULL, \`password\` varchar(255) NOT NULL, \`isAdmin\` tinyint NOT NULL, UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_users_user\` (\`boardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_429493a491957e757423f7ddef\` (\`boardId\`), INDEX \`IDX_523009f956b8194970cd48dc7d\` (\`userId\`), PRIMARY KEY (\`boardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`board_managers_user\` (\`boardId\` int NOT NULL, \`userId\` int NOT NULL, INDEX \`IDX_b337cc6e25b8e2802c37eafb34\` (\`boardId\`), INDEX \`IDX_5a8cd8c69b014fe3580ff94f78\` (\`userId\`), PRIMARY KEY (\`boardId\`, \`userId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`board\` ADD CONSTRAINT \`FK_d958e9af935f058823a58b09cb9\` FOREIGN KEY (\`createdById\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sprint\` ADD CONSTRAINT \`FK_3ebb1d3425a446881d6d3048312\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_9fc19c95c33ef4d97d09b72ee95\` FOREIGN KEY (\`taskId\`) REFERENCES \`task\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_4ba68e3e65410dfd632913e4373\` FOREIGN KEY (\`responsibleId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_5ad8a047b8f023bf36b2a232a42\` FOREIGN KEY (\`sprintId\`) REFERENCES \`sprint\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_c0b0e34ea231717db90095ab6a2\` FOREIGN KEY (\`stepId\`) REFERENCES \`step\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_d88edac9d7990145ff6831a7bb3\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_users_user\` ADD CONSTRAINT \`FK_429493a491957e757423f7ddef7\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`board_users_user\` ADD CONSTRAINT \`FK_523009f956b8194970cd48dc7df\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`board_managers_user\` ADD CONSTRAINT \`FK_b337cc6e25b8e2802c37eafb34e\` FOREIGN KEY (\`boardId\`) REFERENCES \`board\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`board_managers_user\` ADD CONSTRAINT \`FK_5a8cd8c69b014fe3580ff94f785\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`board_managers_user\` DROP FOREIGN KEY \`FK_5a8cd8c69b014fe3580ff94f785\``);
        await queryRunner.query(`ALTER TABLE \`board_managers_user\` DROP FOREIGN KEY \`FK_b337cc6e25b8e2802c37eafb34e\``);
        await queryRunner.query(`ALTER TABLE \`board_users_user\` DROP FOREIGN KEY \`FK_523009f956b8194970cd48dc7df\``);
        await queryRunner.query(`ALTER TABLE \`board_users_user\` DROP FOREIGN KEY \`FK_429493a491957e757423f7ddef7\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_d88edac9d7990145ff6831a7bb3\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_c0b0e34ea231717db90095ab6a2\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_5ad8a047b8f023bf36b2a232a42\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_4ba68e3e65410dfd632913e4373\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_9fc19c95c33ef4d97d09b72ee95\``);
        await queryRunner.query(`ALTER TABLE \`sprint\` DROP FOREIGN KEY \`FK_3ebb1d3425a446881d6d3048312\``);
        await queryRunner.query(`ALTER TABLE \`board\` DROP FOREIGN KEY \`FK_d958e9af935f058823a58b09cb9\``);
        await queryRunner.query(`DROP INDEX \`IDX_5a8cd8c69b014fe3580ff94f78\` ON \`board_managers_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_b337cc6e25b8e2802c37eafb34\` ON \`board_managers_user\``);
        await queryRunner.query(`DROP TABLE \`board_managers_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_523009f956b8194970cd48dc7d\` ON \`board_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_429493a491957e757423f7ddef\` ON \`board_users_user\``);
        await queryRunner.query(`DROP TABLE \`board_users_user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_3399e2710196ea4bf734751558\` ON \`task\``);
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
        await queryRunner.query(`DROP TABLE \`step\``);
        await queryRunner.query(`DROP TABLE \`sprint\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b0abd12e5dbe0e49bf4f9d79e\` ON \`board\``);
        await queryRunner.query(`DROP INDEX \`IDX_ae7bfe48cb8fca88f4f99f1312\` ON \`board\``);
        await queryRunner.query(`DROP TABLE \`board\``);
    }

}
