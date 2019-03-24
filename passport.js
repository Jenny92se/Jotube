import passport from "passport";
import GithubStrategy from "passport-github";
import user from "./models/User";
import routes from "./routes"
import {
    githubLoginCallback
} from "./controllers/userController";

passport.use(user.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    callbackURL: `http://localhost:8080${routes.githubCallback}`
}, githubLoginCallback))
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());