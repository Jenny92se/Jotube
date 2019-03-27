import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import user from "./models/User";
import routes from "./routes"
import {
    githubLoginCallback,
    facebookLoginCallback
} from "./controllers/userController";

passport.use(user.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:8080${routes.githubCallback}`
}, githubLoginCallback));

passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: `https://hot-fly-42.localtunnel.me${routes.facebookCallback}`,
    profileFields: ['id', 'displayName', 'photos', 'email'],
    scope: ["public_profile", "email"]
}, facebookLoginCallback));

passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());