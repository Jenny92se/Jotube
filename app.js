import express from "express"
import morgan from "morgan"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import {
    userRouter
} from "./router"

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

app.use("/user", userRouter);

export default app;