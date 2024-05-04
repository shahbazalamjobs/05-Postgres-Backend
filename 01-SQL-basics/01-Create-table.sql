CREATE TABLE Country (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    population VARCHAR(20),
    area FLOAT
);

INSERT INTO Country (id, name, population, area) VALUES
(1, 'France', '66,000,000', 640680),
(2, 'Germany', '80,000,000', 350000);
