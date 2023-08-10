import videoValidator from "../validator/videoValidation";
import {HTTP_STATUSES} from "../index";

let videosDb = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-07-24T11:49:49.897Z",
        publicationDate: "2023-07-24T11:49:49.897Z",
        availableResolutions: [
            "P144"
        ]
    },
    {
        id: 1,
        title: "string",
        author: "string",
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: "2023-07-24T11:49:49.897Z",
        publicationDate: "2023-07-24T11:49:49.897Z",
        availableResolutions: [
            "P144"
        ]
    },
    {
        id: 2,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: "2023-07-24T11:49:49.897Z",
        publicationDate: "2023-07-24T11:49:49.897Z",
        availableResolutions: [
            "P144"
        ]
    }
];

export const videoRepository= {
    findVideo(title: string | null | undefined){
        if(title){
            let foundVideo = videosDb.filter(v => v.title.indexOf(title))
            return foundVideo;
        } else {
            return videosDb;
        }
    },
    findVideoById(id: string | null | undefined){
       let foundVideo = videosDb.find((v: Object) => v.id === id);
       return foundVideo;
    },
    createVideo(newVideo: Object){
        const date = new Date();
        const datePlusOneDay = new Date(date.setDate(date.getDate() + 1));

        const createdNewVideo = {
            id: +(new Date()),
            title: newVideo.title,
            author: newVideo.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: datePlusOneDay.toISOString(),
            availableResolutions: [
                ...newVideo.availableResolutions
            ]}

        videosDb.push(createdNewVideo as any)
        return createdNewVideo;
    },
    updateVideoById(id: string){
        let video= videosDb.find((v: any)  => v.id === id);
        if(!!video){
            video.title = req.body.title;
            video.author = req.body.author;
            video.publicationDate = req.body.publicationDate ? req.body.publicationDate : video.publicationDate;
            video.canBeDownloaded = req.body.canBeDownloaded ? req.body.canBeDownloaded : video.canBeDownloaded;
            video.minAgeRestriction = req.body.minAgeRestriction ? req.body.minAgeRestriction : video.minAgeRestriction ;
            video.availableResolutions = req.body.availableResolutions ? req.body.availableResolutions : video.availableResolutions;
            return video;
        }
    }
}