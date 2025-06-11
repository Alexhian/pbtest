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
    price DECIMAL(10, 2) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postalcode VARCHAR(20) NOT NULL,
    user_id INT REFERENCES users(id),
    purchaser_id INT REFERENCES purchasers(id)
);

CREATE TABLE propertycharacteristics (
    id SERIAL PRIMARY KEY,
    property_id INT REFERENCES properties(id),
    surface DECIMAL(10, 2),
    rooms INT
);


-- {
--     "reference" : "1",
--     "price" : "100",
--     "addess" : "21 jump street",
--     "city" : "Dubaï",
--     "postalcode" : "44800"
-- }