import routes from "../routes";
import User from "../models/User";
import passport from "passport";
import {
    runInNewContext
} from "vm";

export const getJoin = (req, res) => res.render("join", {
    pageTitle: "join"
});

export const postJoin = async (req, res, next) => {
    //console.log(req.body);
    const {
        body: {
            name,
            email,
            password,
            password2
        }

    } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", {
            pageTitle: "Join"
        });
    } else {
        try {
            const user = await User({
                name,
                email
            });

            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.join);
        }
    }

};


export const getLogin = (req, res) => res.render("login", {
    pageTitle: "login"
});

export const postLogin = passport.authenticate(`local`, {
    failureRedirect: routes.login,
    successRedirect: routes.home
});

export const logout = (req, res) => {
    res.redirect(routes.home);
};

export const userDetail = (req, res) => res.render("userDetail", {
    pageTitle: "user detail"
});

export const editProfile = (req, res) => res.render("editProfile", {
    pageTitle: "edit profile"
});

export const changePassword = (req, res) => res.render("changePassword", {
    pageTitle: "change password"
});