import {
    videos
} from "../db"

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
export const upload = (req, res) => {
    res.render("upload", {
        pageTitle: "upload2"

    });
}

export const videoDetail = (req, res) => res.render("videoDetail", {
    pageTitle: "video Detail"
});

export const editVideo = (req, res) => res.render("editVideo", {
    pageTitle: "edit video"
});
export const deleteVideo = (req, res) => res.render("deleteVideo", {
    pageTitle: "delete video"
});