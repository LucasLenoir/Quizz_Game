const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const userProfile = require("../controllers/userProfile.controller");
const multer = require('../middleware/multer');
//! authentification
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.post("/logout", authController.logout);

//! user display
router.post("/profile", userProfile.getAllQuizz);
router.post("/profile/list", userProfile.GetAdminQuizzToDisplay);
router.post("/profile/user", userProfile.getUserInfo);
router.post("/profile/infos/update", multer, userProfile.updateUserInfo);
router.post("/profile/user/stats", userProfile.getStats);
router.post("/profile/user/id_quizz", userProfile.getQuestionsByQuizz);
router.post("/profile/id_quizz", userProfile.getQuizzById);
router.post("/profile/endGame", userProfile.updateStats);
//CRUD QUIZZ
router.post("profile/user/create", userProfile.createQuizz);
router.post("/profile/user/id_quizz/edit", userProfile.getEditQuizzById);
router.post("/profile/user/id_quizz/update", userProfile.updateQuizz);
router.delete("/profile/user/id_quizz/delete", userProfile.deleteQuizz);

module.exports = router;
