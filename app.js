import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes"

const app = express();

//this is middleware
const betweenHome = (req, res, next) => {
    console.log("I'm between");
    next();
    // if you don't use "next()", the respond will not be reached.
}

app.use(morgan("dev"));
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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