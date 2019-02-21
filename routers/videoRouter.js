import express from "express";
import routes from "../routes";
import {
    upload,
    videoDetail,
    editVideo,
    deleteVideo
} from "../controllers/videoController";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, (req, res) => res.send("videos"));
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail(), videoDetail);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

//export whole file
export default videoRouter;