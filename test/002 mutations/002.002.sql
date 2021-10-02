PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE `Teams` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME);
INSERT INTO Teams VALUES(1,'2021-10-01 21:06:50.426 +00:00','2021-10-01 21:06:50.426 +00:00',NULL);
CREATE TABLE `Users` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `email` VARCHAR(255) NOT NULL UNIQUE, `password` VARCHAR(255) NOT NULL, `passwordResetToken` VARCHAR(255), `passwordResetExpires` DATETIME, `username` VARCHAR(255) NOT NULL, `basicGrant` TINYINT(1) DEFAULT 1, `adminGrant` TINYINT(1) DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME, `TeamId` INTEGER REFERENCES `Teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);
INSERT INTO Users VALUES(1,'test@email.com','$2b$10$22L8eV/IF46fi2Gcczqrl.y86CtNqUdsTr/e/IhF2Peh1zrZBF2hW',NULL,NULL,'test',1,0,'2021-10-01 21:06:50.451 +00:00','2021-10-01 21:06:50.451 +00:00',NULL,1);
CREATE TABLE `Logs` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `level` VARCHAR(255) NOT NULL, `message` VARCHAR(255) NOT NULL, `meta` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME);
CREATE TABLE `Tags` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `archived` TINYINT(1) DEFAULT 0, `tagName` VARCHAR(255) NOT NULL, `TeamId` INTEGER NOT NULL REFERENCES `Teams` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME, UNIQUE (`tagName`, `TeamId`));
CREATE TABLE `Projects` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `projectName` VARCHAR(255) NOT NULL, `archived` TINYINT(1) DEFAULT 0, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `TeamId` INTEGER REFERENCES `Teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);
CREATE TABLE `Entries` (`id` INTEGER PRIMARY KEY AUTOINCREMENT, `date` DATETIME NOT NULL, `description` VARCHAR(255) NOT NULL, `duration` INTEGER, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `deletedAt` DATETIME, `TeamId` INTEGER REFERENCES `Teams` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `ProjectId` INTEGER REFERENCES `Projects` (`id`) ON DELETE SET NULL ON UPDATE CASCADE, `UserId` INTEGER REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE);
CREATE TABLE `EntryTags` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `TagId` INTEGER NOT NULL REFERENCES `Tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, `EntryId` INTEGER NOT NULL REFERENCES `Entries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY (`TagId`, `EntryId`));
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('Teams',1);
INSERT INTO sqlite_sequence VALUES('Users',1);
COMMIT;
