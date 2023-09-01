DROP TABLE IF EXISTS `books`;

CREATE TABLE `books`(
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(255),
    `Status` ENUM('to-read', 'in-progress', 'completed') DEFAULT 'to-read',
    PRIMARY KEY (`ID`)
);
