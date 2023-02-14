const express = require("express");
const controllers = require("../controllers");
const router = express.Router();

router.route("/logIn")
    .post(controllers.logIn);

router.route("/signUp")
    .post(controllers.signUp);

router.route('/users')
    .get(controllers.getUsers);

router.route("/users/:id")
    .put(controllers.updateProfile);

router
    .route("/games")
    .get(controllers.getGames)
    .post(controllers.createNewGame);

router
    .route("/games/:id")
    .get(controllers.getGameDetails)
    .delete(controllers.deleteGame);

router
    .route("/invitees")
    .get(controllers.getAllGamesInvitees)
    .post(controllers.inviteToGame)
    .delete(controllers.deleteInvite);

router
    .route('/invitees/:game_id')
    .get(controllers.getGameInvitees);


module.exports = router;