CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
);

CREATE TABLE purchasers (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    searchcriteria TEXT,
    user_id INT REFERENCES users(id)
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    reference VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postalCode INT NOT NULL,
    user_id INT REFERENCES users(id),
    purchaser_id INT REFERENCES purchasers(id)
);

CREATE TABLE propertycharacteristics (
    id SERIAL PRIMARY KEY,
    property_id INT REFERENCES properties(id),
    surface INT,
    rooms INT
);

insert into properties(reference, price, address, city, postalCode) values ('rcz72', '100000', '21 jump street', 'New York', '75000');


-- {
--     "reference" : "1",
--     "price" : "100",
--     "address" : "21 jump street",
--     "city" : "Dubaï",
--     "postalCode" : "44800"
-- }