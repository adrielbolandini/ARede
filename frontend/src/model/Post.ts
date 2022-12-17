export interface Post{
    _id:string;
    title:string;
    description:string;
    profile:{
        name:string;
    };
    comments:[];
    likes: [];
    image: boolean;
}