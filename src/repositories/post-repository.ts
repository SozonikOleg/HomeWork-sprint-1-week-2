let postsDb = [
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
        canBeDownloaded: true,
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
]


export const postRepository = {
findPosts(title: string | null ){
    if(title){
        let searchString = req.query.title.toString();
        res.send(postsDb.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(postsDb)
    }
}
}