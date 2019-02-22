import {
    videos
} from "../db"
import routes from "../routes";

//export const home = (req, res) => res.send("Home");
export const home = (req, res) => res.render("home", {
    pageTitle: "home",
    videos
});

export const search = (req, res) => {

    const {
        query: {
            term: searchingBy
        }
    } = req;

    //same wigh conset searchingBy=req.query.term;
    res.render("search", {
        searchingBy
    });
};

/*
export const videos = (req, res) => res.render("videos", {
    pageTitle: "videos"
});
*/

export const getUpload = (req, res) => {
    res.render("upload", {
        pageTitle: "Upload"
    });
};

//after uploading video, return generated id-value and load an uploaded video
export const postUpload = (req, res) => {

    const {
        body: {
            file,
            title,
            description
        }
    } = req;
    console.log("here");
    res.redirect(routes.videoDetail(324393));
};


export const videoDetail = (req, res) => res.render("videoDetail", {
    pageTitle: "video Detail"
});

export const editVideo = (req, res) => res.render("editVideo", {
    pageTitle: "edit video"
});
export const deleteVideo = (req, res) => res.render("deleteVideo", {
    pageTitle: "delete video"
});