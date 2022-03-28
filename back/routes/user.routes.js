const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userProfile = require("../controllers/userProfile.controller");

//! authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.post("/logout", authController.logout);

//! user display
router.post("/profile", userProfile.getAllQuizz);
router.post("/profile/user", userProfile.getUserInfo);
router.post("/profile/user/update", userProfile.updateUserInfo);
router.post("/profile/user/stats", userProfile.getStats);
router.post("/profile/create", userProfile.create);
router.post("/profile/id_quizz", userProfile.getQuestionsByQuizz);
router.post("/profile/id_quizz/update", userProfile.updateQuizz);
router.post("/profile/endGame", userProfile.updateStats);

module.exports = router;
