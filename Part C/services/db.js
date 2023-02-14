const config = require('./db.config');
const mysql = require("mysql");

const conn = mysql.createConnection(config);

conn.connect();

initDb = () => {
    conn.query(
        `CREATE DATABASE IF NOT EXISTS web;`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    status: "success",
                    message: "database web created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.users (
            id INT NOT NULL AUTO_INCREMENT,
            first_name VARCHAR(25) NOT NULL ,
            last_name VARCHAR(25) NOT NULL ,
            phone VARCHAR(25) NOT NULL ,
            email VARCHAR(50) NOT NULL ,
            password VARCHAR(25) NOT NULL ,
            PRIMARY KEY (id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    status: "success",
                    message: "users table created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.games (
            id INT NOT NULL AUTO_INCREMENT,
            organizer_id INT NOT NULL ,
            date datetime NOT NULL ,
            court VARCHAR(25) NOT NULL ,
            phone VARCHAR(25) NOT NULL ,
            PRIMARY KEY (id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    status: "success",
                    message: "games table created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.invites (
            game_id INT NOT NULL ,
            user_id INT NOT NULL ,
            PRIMARY KEY (game_id, user_id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    status: "success",
                    message: "invites table created!",
                });
            }
        }
    );

    conn.query(`SELECT COUNT(*) as count FROM web.users`, function (err, data, fields) {
        if (err) {
            throw new Error(err.message);
        } else {
            results = JSON.parse(JSON.stringify(data));
            if (results[0].count === 0) {
                for (let i = 1; i < 10; i++) {
                    conn.query(
                        `INSERT INTO web.users (id, first_name, last_name, email, phone, password)
                        VALUES (${i}, 'user', '${i}', 'user${i}@gmail.com', '054-189-019${i}', 'BGUBall${i}')`,
                        function (err, data, fields) {
                            if (err) {
                                throw new Error(err.message);
                            } else {
                                console.log({
                                    status: "success",
                                    message: `user${i} created!`,
                                });
                            }
                        }
                    );
                }
            }
        }
    });

    conn.query(`SELECT COUNT(*) as count FROM web.games`, function (err, data, fields) {
        if (err) {
            throw new Error(err.message);
        } else {
            results = JSON.parse(JSON.stringify(data));
            if (results[0].count === 0) {
                for (let i = 1; i < 10; i++) {
                    conn.query(
                        `INSERT INTO web.games (id, organizer_id, date, court, phone)
                        VALUES (${i}, ${i}, now(), '${['Haviva', 'Sport center'][getRandomInt(2)]}', '054-189-019${i}')`,
                        function (err, data, fields) {
                            if (err) {
                                throw new Error(err.message);
                            } else {
                                console.log({
                                    status: "success",
                                    message: `game${i} created!`,
                                });
                            }
                        }
                    );
                }
            }
        }
    });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = { conn, initDb };