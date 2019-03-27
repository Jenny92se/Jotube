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

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    /* 필요없는 변수는 _ 로 처리할수도 있음
     export const githubLoginCallback = async (_, _, profile, cb) => { */
    console.log(profile);
    const {
        _json: {
            id,
            avatar_url,
            name,
            email
        }
    } = profile;
    try {
        const user = await User.findOne({
            email
        });
        console.log("hello origin");
        console.log(user);

        if (user) {
            user.githubId = id;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name: name,
            email: email,
            avatarUrl: avatar_url,
            githubId: id
        });
        console.log("hello new");
        return cb(null, newUser);

    } catch (error) {
        console.log("error");
        return cb(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate("facebook");

export const facebookLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    const {
        _json: {
            id,
            name,
            email
        }
    } = profile;

    try {
        const user = await User.findOne({
            email
        });
        console.log("hello origin");
        console.log(user);

        if (user) {
            user.facebookId = id;
            user.avatarUrl = `http://graph.facebook.com/${id}/picture?type=large`;
            user.save();
            return cb(null, user);
        }
        const newUser = await User.create({
            name: name,
            email: email,
            avatarUrl: `http://graph.facebook.com/${id}/picture?type=large`,
            facebookId: id
        });
        console.log("hello new");
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    /* passport를 사용해서 이렇게만 해도 로그아웃이 가능 */
    res.redirect(routes.home);
};

export const getMe = (req, res) => {
    res.render("userDetail", {
        pageTitle: "user detail",
        user: req.user
    });
};

export const userDetail = async (req, res) => {

    const {
        params: {
            id
        }
    } = req;
    try {
        const user = await User.findById(id);
        res.render("userDetail", {
            pageTitle: "user detail",
            user
        });
    } catch (error) {
        res.redirect(routes.home);
    }

};

export const editProfile = (req, res) => res.render("editProfile", {
    pageTitle: "edit profile"
});

export const changePassword = (req, res) => res.render("changePassword", {
    pageTitle: "change password"
});