import Menu from '../../components/menu';
import Feed from '../../components/feed';
import { getAuthHeader } from '../../services/auth';
import { useEffect, useState } from 'react';
import { Post } from '../../model/Post';
import api from '../../services/api';
import { likePostApi, unlikePostApi } from '../../services/posts';

function Home(){
    const authHeader = getAuthHeader()
    const [posts, setPosts] = useState<Post[]>([]);
    const profile = localStorage.getItem('profile');   
    
    
    const user = localStorage.getItem('user') as string;

    useEffect(()=> {
        async function getPosts(){
            const response = await api.get('v1/feed', authHeader);

            setPosts(response.data);
        }
        getPosts();
    }, []);
    useEffect(()=> {
        async function getProfile(){
            const profile = localStorage.getItem('profile') as string;
            return profile;
        }
        getProfile();
    }, []);



    async function handleLike(postId: String){
        const [post, ...rest] = posts.filter(post => post._id===postId)
            try{
                if (post && !post.likes.includes(profile)){
                    const newPost = await likePostApi(post,profile);
                    changePostItem(newPost);
                } else {
                    const newPost = await unlikePostApi(post,profile);
                    changePostItem(newPost);
                }
            } catch (err){
                console.error(err);
            }
            
        } 

        
    function changePostItem(newPost :Post){
        setPosts(posts =>{
            const post = newPost;
            const index = posts.indexOf(post);
            posts[index] = post;
            return [...posts];
        })};
    

    async function newPostCreated(post: Post){
        try {
            const response = await api.get(`/v1/posts/${post._id}`, authHeader);
            const newPost = response.data;
            setPosts((posts)=>[newPost, ...posts]);
        } catch(err){console.error(err);}      
    }

    return (
        
        <div className='w-screen h-screen flex'>
            <Menu newPostCreated={newPostCreated}/>
            <Feed posts={posts} handleLike={handleLike} />
        </div>
    )
}

export default Home;