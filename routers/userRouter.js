import express from "express";
import routes from "../routes";
import {
    userDetail,
    changePassword,
    editProfile
} from "../controllers/userController";
import {
    onlyPrivate
} from "../middlewares";

const userRouter = express.Router();

//export whole file
userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), onlyPrivate, userDetail);


export default userRouter;