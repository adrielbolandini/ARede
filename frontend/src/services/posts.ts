import api from "./api";
import { getAuthHeader } from "./auth";
import { useState } from "react";
import { Post } from "../model/Post";



async function unlikePostApi(post: Post, profile:string){
    await api.post(`/v1/posts/${post._id}/unlike`, null,getAuthHeader());  
    return unlike(post, profile);  
}

async function likePostApi(post: Post, profile:string){
    await api.post(`/v1/posts/${post._id}/like`, null,getAuthHeader());    
    return like(post, profile);
}

function like(post: Post, profile: string){
    post.likes.push(profile);
    return post;
}

function unlike(post: Post, profile: string){
    const index = post.likes.indexOf(profile);
    post.likes.splice(index,1);
    return post;
}

export {
    likePostApi,
    unlikePostApi
}