const usersCtrl = {};

// Models
const User = require('../models/User');

// Modules
const passport = require("passport");

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.singup = async(req, res) => {
    let errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: "La contraseña de ingresaste es incorrect" });
    }
    if (password.length < 4) {
        errors.push({ text: "La contraseña debe tener al menos 4 caracteres." });
    }
    if (errors.length > 0) {
        res.render("users/signup", {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        // Buscar coincidencia de correo electrónico
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash("error_msg", "Ese nombre de usuario ya está en uso");
            res.redirect("/users/signup");
        } else {
            // Guardar un usuario nuevo
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "Sea registrado.");
            res.redirect("/users/signin");
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render("users/signin");
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash("success_msg", "Desconectado.");
    res.redirect("/users/signin");
};

module.exports = usersCtrl;