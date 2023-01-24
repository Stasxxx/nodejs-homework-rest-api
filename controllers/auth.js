const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require('jimp');
const { nanoid } = require('nanoid');

const { User } = require("../models/user");

const { HttpError, ctrlWrapper, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    };

    const hashPassword = await bcrypt.hash(password, 10)

    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
    }

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
    });
};

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
        throw HttpError(404)
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });

    res.json({
        message: 'Verification successful'
    })
};

const verifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(400, "Missing required field email");
    };

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed")
    };

    const verificationToken = nanoid();

    await User.findByIdAndUpdate(user._id, { verificationToken: verificationToken});

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
    }

    await sendEmail(verifyEmail);

    res.status(200).json({
        message: "Verification email sent"
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password invalid");
    };

    if (!user.verify) {
        throw HttpError(401, "Email or password invalid");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password invalid");
    };

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        email: user.email,
        subscription: user.subscription,
    })
};

const getCurrent = (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription })
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json()
}

const changeSubscription = async(req, res) => {
    const { _id } = req.user;
    // const { subscription } = req.params;
    const result = await User.findByIdAndUpdate(_id, req.body, {new: true});
    if (!result) {
        throw HttpError(404)
    };
    res.json({subscription: result.subscription});
}

const avatarsDir = path.join(__dirname, "../", "public", "avatars")
const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, filename } = req.file;
    const avatar = await Jimp.read(tempUpload);
    await avatar.resize(250, 250);
    await avatar.write(tempUpload);
   
    const newFileName = `${_id}_${filename}`
    const resultUpload = path.join(avatarsDir, newFileName);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, { avatarURL });

    res.json({
        avatarURL,
    })
}


module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    login: ctrlWrapper(login),
    verifyEmail: ctrlWrapper(verifyEmail),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    changeSubscription: ctrlWrapper(changeSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};