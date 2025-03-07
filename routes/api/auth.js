const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody } = require("../../middlwares/validateBody");

const { authenticate, upload } = require("../../middlwares");

const { schemas } = require("../../models/user")

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verify);

router.post("/verify", validateBody(schemas.verifyShema), ctrl.verifyEmail)

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/users", authenticate, validateBody(schemas.subscriptionShema), ctrl.changeSubscription)

router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

module.exports = router;