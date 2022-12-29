export interface Post{
    _id: string,
    title: string,
    description: string,
    profile:{
        name: string
    };
    likes: string[],
    comments: [],
    image: boolean
}