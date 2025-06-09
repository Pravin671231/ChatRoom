const express = require("express");
const { getAllUser, newUser } = require("../controllers/userControllers");
const router = express.Router();

router.get("/", getAllUser);
router.post("/", newUser);

module.exports = router;
