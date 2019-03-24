import routes from "./routes";
import multer from "multer";

const multerVideo = multer({
    dest: "uploads/videos/"
});

export const localMiddleware = (req, res, next) => {
    res.locals.siteName = "Jotube";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    /* user가 존재하지 않는다면 빈 object를 줌 */
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
}

export const uploadVideo = multerVideo.single("videoFile");