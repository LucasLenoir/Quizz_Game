const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userProfile = require("../controllers/userProfile.controller");
router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.post("/stats");
router.post("/profile", userProfile.getAllQuizz);
router.post("/profile/create", userProfile.create);
router.post("/profile/update", userProfile.getQuestionsByQuizz);

module.exports = router;
