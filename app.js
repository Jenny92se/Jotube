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




const app = express();

//this is middleware
const betweenHome = (req, res, next) => {
    console.log("I'm between");
    next();
    // if you don't use "next()", the respond will not be reached.
}
app.use(helmet());
app.set("view engine", "pug");
//정적 파일 라우팅
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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