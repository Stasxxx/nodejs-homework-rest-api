const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../middlwares/validateBody");

const { schemas } = require("../../models/user")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

module.exports = router;