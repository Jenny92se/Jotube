import routes from "../routes";
import Video from "../models/Video"

//export const home = (req, res) => res.send("Home");
export const home = async (req, res) => {
    //if attach <async> keword, the function excuting procedual
    //await is only valid in async function

    //sort({_id:-1})  _id를 기준으로 역순정렬
    try {
        const videos = await Video.find({}).sort({
            _id: -1
        });

        console.log(videos[0].fileUrl);
        res.render("home", {
            pageTitle: "home",
            videos
        });
    } catch (error) {
        res.render("home", {
            pageTitle: "Home",
            videos: []
        });
    }
};

export const search = async (req, res) => {

    const {
        query: {
            term: searchingBy
        }
    } = req;
    let videos = [];
    try {
        videos = await Video.find({
            title: {
                $regex: searchingBy,
                $options: "i"
            }
        });
    } catch (error) {
        console.log(error);
    }

    //same wigh conset searchingBy=req.query.term;
    res.render("search", {
        pageTitle: "Search",
        searchingBy,
        videos
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
export const postUpload = async (req, res) => {

    const {
        body: {
            title,
            description
        },
        file: {
            path
        }
    } = req;
    // console.log(body);

    const newVideo = await Video.create({
        fileUrl: path,
        title,
        description
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};


export const videoDetail = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;
    try {
        const video = await Video.findById(id);
        console.log(video);
        res.render("videoDetail", {
            pageTitle: video.title,
            video
        });
    } catch (error) {
        console.log(error);
        res.redirect(routes.home);
    }
}

export const getEditVideo = async (req, res) => {

    const {
        params: {
            id
        }
    } = req;

    try {
        const video = await Video.findById(id);
        console.log(video);
        res.render("editVideo", {
            pageTitle: `Edit ${video.title}`,
            video
        });
    } catch (error) {
        res.redirect(routes.home);
    }
}

export const postEditVideo = async (req, res) => {

    const {
        params: {
            id
        },
        body: {
            title,
            description
        }
    } = req;

    try {
        //title is same as title:title
        await Video.findOneAndUpdate({
            _id: id
        }, {
            title,
            description
        });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }

};

export const deleteVideo = async (req, res) => {
    const {
        params: {
            id
        }
    } = req;

    try {
        await Video.findOneAndRemove({
            _id: id
        });
    } catch (error) {
        console.log(error);
    }
    res.redirect(routes.home);
};