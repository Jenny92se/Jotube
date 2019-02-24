import express from "express";
import routes from "../routes";
import {
    videoDetail,
    editVideo,
    deleteVideo,
    postUpload,
    getUpload,
    getEditVideo,
    postEditVideo
} from "../controllers/videoController";
import {
    uploadVideo
} from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, (req, res) => res.send("videos"));
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// video detail
videoRouter.get(routes.videoDetail(), videoDetail);

//edit video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);


videoRouter.get(routes.deleteVideo(), deleteVideo);

//export whole file
export default videoRouter;