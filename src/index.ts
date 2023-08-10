import express, {NextFunction} from 'express';
import bodyParser from 'body-parser';
import {videoRoutes} from "./routes/video-router";

export const app = express();
const port = 3000;

type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null,
    createdAt: Date,
    publicationDate: string,
    availableResolutions: string[]
}

export const HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
}


const authGuardMiddleware = (req: any, res: any, next:NextFunction) => {
    if(req.query.token === '123'){
        next();
    } else {
        res.send(401);
    }
}


// MIDDLEWARE
const parserMiddleware = bodyParser();
app.use(parserMiddleware);
app.use(authGuardMiddleware);
app.use('/videos', videoRoutes);

app.listen(port, () => {
    console.log(`Example app listen on port ${port}`)
})
