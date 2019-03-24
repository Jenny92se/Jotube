import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import globalRouter from "./routers/globalRouter";
import helmet from "helmet";
import {
    localMiddleware
} from "./middlewares";
import morgan from "morgan";
import routes from "./routes"
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import passport from "passport";
import "./passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

const app = express();

const cookieStore = MongoStore(session);

//this is middleware
app.use(helmet());
app.set("view engine", "pug");
//정적 파일 라우팅
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
/* 현재는 메모리에 세션을 저장해서.. 재기동시 세선이 날라가버림
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false
}));
*/

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new cookieStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(localMiddleware);

// except for "/user", "/video" routing, it will be affected by this global(default) routing
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

/*
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);
*/

//export whole file
export default app;