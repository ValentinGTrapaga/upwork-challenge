CREATE TABLE `books`(
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Title` VARCHAR(255),
    `Author` VARCHAR(255),
    `Description` VARCHAR(255),
    PRIMARY KEY (`ID`)
);

INSERT INTO books VALUES(1, 'The Great Gatsby', 'F. Scott Fitzgerald', 'The story primarily concerns the young and mysterious millionaire Jay Gatsby and his quixotic passion and obsession for the beautiful former debutante Daisy Buchanan.');
