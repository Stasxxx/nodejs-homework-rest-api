const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../middlwares/validateBody");

const { authenticate } = require("../../middlwares");

const { schemas } = require("../../models/user")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users",authenticate,validateBody(schemas.subscriptionShema), ctrl.changeSubscription)

module.exports = router;