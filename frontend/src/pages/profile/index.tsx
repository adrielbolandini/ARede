import { useState } from "react";
import Menu from "../../components/menu";
import Profile from "../../components/profile";
import { Post } from "../../model/Post";
import api from "../../services/api";
import { getAuthHeader } from "../../services/auth";

function ProfilePage(){
    const authHeader = getAuthHeader()
    const [posts, setPosts] = useState<Post[]>([]);

    async function newPostCreated(post: Post){
        try {
            const profile = localStorage.getItem('profile');
            const response = await api.get(`/v1/posts/${post._id}`, authHeader);
            const newPost = response.data;
            setPosts((posts)=>[newPost, profile, ...posts]);
        } catch(err){console.error(err);}      
    }
    return (
        <div className='w-screen h-screen flex'>
            <Menu newPostCreated={newPostCreated}/>
            <Profile />
        </div>
    )
}

export default ProfilePage;