const router = require("express").Router();
const inscription = require("../controllers/inscription.controllers");
const login = require("../controllers/login.controllers");
const authController = require("../controllers/auth.controller");

router.post("/inscription", inscription.createUser);
router.post("/register", authController.signUp);
router.post("/login", login.checkAndLoggin);

module.exports = router;
