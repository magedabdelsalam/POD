USE pods_db;

INSERT INTO Users (first, last, email, password, role) values ('John', 'Ahmed', "john@pod.com", "123","parent");
INSERT INTO Users (first, last, email, password, role) values ('Menna', 'Essam', "menna@pod.com", "123","parent");
INSERT INTO Users (first, last, email, password, role) values ('Alexa', 'Smith', "alexa@pod.com", "123","parent");

INSERT INTO Pods (name, date, time, zip, contact) values ('Minasan Philly', '2020-11-20', '04:32 AM', '91304', '230402031');