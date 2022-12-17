import Menu from '../../components/menu';
import Feed from '../../components/feed';
import { getAuthHeader } from '../../services/auth';
import { useEffect, useState } from 'react';
import { Post } from '../../model/Post';
import api from '../../services/api';

function Home(){
    const authHeader = getAuthHeader()
    const [posts, setPosts] = useState<Post[]>([]);
    
    const profile = localStorage.getItem('profile') as string;
    const user = localStorage.getItem('user') as string;

    useEffect(()=> {
        async function getPosts(){
            const response = await api.get('v1/feed', authHeader);
            setPosts(response.data);
        }
        getPosts();
    }, []);

    async function handleLike(postId: string){
        try{
            await api.post(`/v1/posts/${postId}/like`, null,authHeader);
            const newPost = posts
            .filter((post)=>post._id === postId)
            .map((post) => {
                post.likes.push(profile);
                return post;
            });
                
            
            setPosts(posts =>{
                const post = newPost[0]
                const index = posts.indexOf(post);
                posts[index] = post;
                return [...posts];
            });
        }catch (err){
            console.error(err);
        }
    }

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