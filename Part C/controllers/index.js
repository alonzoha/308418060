const { conn } = require("../services/db");

exports.logIn = (req, res) => {
    const { email, password } = req.body;
    conn.query(
        "SELECT * FROM `web`.`users` WHERE `email` = '" +
            email +
            "' AND `password` = '" +
            password +
            "' LIMIT 1",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({
                    data,
                    status: "success",
                    length: data?.length,
                });
            }
        }
    );
};

exports.signUp = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        conn.query(
            `INSERT INTO \`web\`.\`users\`(\`first_name\`,\`last_name\`, \`email\`, \`phone\`, \`password\`) 
            VALUES ('${req.body.first_name}','${req.body.last_name}', '${req.body.email}', '${req.body.phone}', '${req.body.psw}')`,
            function (err, mysqlres) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json(req.body);
                }
            }
        );
    }
};

exports.getUsers = (req, res) => {
    conn.query(
        `SELECT u.*, concat(u.first_name, ' ', u.last_name) as fullname FROM web.users as u`,
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.updateProfile = (req, res, next) => {
    if (!req.params.id) {
        res.status(404).json({ error: "No id found" });
    } else {
        conn.query(
            `UPDATE \`web\`.\`users\` SET \`first_name\`='${req.body.first_name}',\`last_name\`='${req.body.last_name}',\`password\`='${req.body.password}',\`email\`='${req.body.email}' WHERE \`id\`='${req.params.id}'`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json(req.body);
                }
            }
        );
    }
};

exports.createNewGame = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        const sql = `INSERT INTO \`web\`.\`games\`(\`organizer_id\`, \`date\`, \`court\`, \`phone\`) 
            VALUES ('${req.body.organizer_id}','${req.body.date}', '${req.body.court}', '${req.body.phone}')`;

        conn.query(sql, function (err, mysqlres) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json(req.body);
            }
        });
    }
};

exports.getGames = (req, res) => {
    conn.query(
        `SELECT g.*, concat(u.first_name, ' ', u.last_name) as organizer FROM web.games as g JOIN users as u ON u.id = g.id`,
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.getGameDetails = (req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: "No id found" });
    } else {
        conn.query(
            `SELECT g.*, concat(u.first_name, ' ', u.last_name) as organizer FROM web.games as g JOIN users as u ON u.id = g.id WHERE g.id = ${req.params.id}`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json({ data });
                }
            }
        );
    }
};

exports.deleteGame = (req, res, next) => {
    if (!req.params.id) {
        res.status(404).json({ error: "No id found" });
    } else {
        conn.query(
            "DELETE FROM `web`.`games` WHERE `id`='" + req.params.id + "'",
            function (err, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(200).json();
                }
            }
        );
    }
};

exports.inviteToGame = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        const sql = `INSERT INTO \`web\`.\`invites\`(\`game_id\`, \`user_id\`) 
            VALUES ('${req.body.game_id}','${req.body.user_id}')`;

        conn.query(sql, function (err, mysqlres) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(201).json(req.body);
            }
        });
    }
};

exports.getAllGamesInvitees = (req, res) => {
    conn.query(
        `SELECT g.*, invu.id as invited_user_id, concat(org.first_name, ' ', org.last_name) as organizer_fullname 
        FROM web.invites as inv 
        JOIN users as invu ON invu.id = inv.user_id 
        JOIN games as g ON g.id = inv.game_id 
        JOIN users as org ON org.id = g.organizer_id`,
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({
                    invitees: JSON.parse(JSON.stringify(data)),
                });
            }
        }
    );
};

exports.getGameInvitees = (req, res) => {
    conn.query(
        `SELECT u.id as user_id, concat(u.first_name, ' ', u.last_name) as fullname FROM web.invites as inv JOIN users as u ON u.id = inv.user_id JOIN games as g ON g.id = inv.game_id WHERE inv.game_id = ${req.params.game_id}`,
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({
                    invitees: JSON.parse(JSON.stringify(data)),
                });
            }
        }
    );
};

exports.deleteInvite = (req, res, next) => {
    conn.query(
        "DELETE FROM `web`.`invites` WHERE `user_id`='" +
            req.body.user_id +
            "' AND `game_id`='" +
            req.body.game_id +
            "'",
        function (err, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json();
            }
        }
    );
};
