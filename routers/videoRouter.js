import express from "express";
import routes from "../routes";
import {
    videoDetail,
    deleteVideo,
    postUpload,
    getUpload,
    getEditVideo,
    postEditVideo
} from "../controllers/videoController";
import {
    uploadVideo,
    onlyPrivate
} from "../middlewares";

const videoRouter = express.Router();

//videoRouter.get(routes.videos, (req, res) => res.send("videos"));
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// video detail
videoRouter.get(routes.videoDetail(), videoDetail);

//edit video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);


videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

//export whole file
export default videoRouter;