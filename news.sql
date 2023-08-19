CREATE TABLE news (id SERIAL PRIMARY KEY, journal VARCHAR);

INSERT INTO news (journal)
VALUES ('https://www.lebledparle.com/'); 

INSERT INTO news (journal)
VALUES ('https://www.newsducamer.com/'); 

SELECT * from news  

CREATE TABLE data (
    id SERIAL PRIMARY KEY, 
    text_xml VARCHAR
);

