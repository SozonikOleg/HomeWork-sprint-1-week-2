import {Request, Response, Router} from "express";
import videoValidator from "../validator/videoValidation";
import { HTTP_STATUSES} from "../index";
import {videoRepository} from "../repositories/video-repository";

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

export const videoRoutes = Router({});

videoRoutes.get('/', (req: Request, res: Response) => {
    // @ts-ignore
    const title  = req.query.title?.toString();
    const foundVideos = videoRepository.findVideo(title);

    res.status(HTTP_STATUSES.OK_200).send(foundVideos)
    return;
});

videoRoutes.post('/', (req: Request, res: Response) => {
    const newVideo = videoRepository.createVideo(req.body);

    const { title, author, availableResolutions } = req.body;
    const errs = videoValidator.check({ title, author, availableResolutions });
    if (errs.length > 0) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: errs
        });
        return;
    }
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo)
    return;
});

videoRoutes.get('/:id', (req: Request<{id: string},{},{},{}>, res: any) => {
    let foundVideos = videoRepository.findVideoById(req.body?.id);

    if(foundVideos){
        res.status(HTTP_STATUSES.OK_200).send(foundVideos)
        return;
    } else {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }
});

videoRoutes.put('/:id', (req: Request, res: Response ) => {
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    const errs = videoValidator.check({ title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate });
    if (!req.params.id) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send({
            errorsMessages: errs
        });
        return;
    }

    if (errs.length > 0 ) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: errs
        });
        return;
    }


    const updatedVideo = videoRepository.updateVideoById(req.params.id?.toString());
    if(!!updatedVideo){
        res.send(HTTP_STATUSES.NO_CONTENT_204)
    }

    if(!updatedVideo){
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }
});

videoRoutes.delete('/:id', (req: Request<{id: string},{},{},{}>, res: Response) => {
    let videos = videosDb.find((v: any)  => v.id === +req.params.id);

    if (!req.params.id) {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }

    if(videos){
        for(let i = 0; i < videosDb.length; i++){
            if(videosDb[i].id === +req.params.id){
                videosDb.splice(i, 1);
                res.status(HTTP_STATUSES.NO_CONTENT_204).send(HTTP_STATUSES.NO_CONTENT_204);
                return;
            }
        }
    } else {
        res.status(HTTP_STATUSES.NOT_FOUND_404).send(HTTP_STATUSES.NOT_FOUND_404)
        return;
    }
});
videoRoutes.delete('/testing/all-data', (req, res) => {
    videosDb = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
    return;
})