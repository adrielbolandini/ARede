import {useParams} from 'react-router-dom';
import { useState, useEffect, FormEvent } from 'react';
import { Post } from '../../model/Post';
import api from '../../services/api';
import { getAuthHeader } from '../../services/auth';
import Menu from '../../components/menu';
import PostItem from '../../components/postItem';
import { likePostApi, unlikePostApi } from '../../services/posts';
import Text from '../../components/text';
import { TextInput } from '../../components/textInput';
import Button from '../../components/button';
import { UserCircle } from 'phosphor-react';

interface CommentFormElements extends HTMLFormControlsCollection{
    description: HTMLInputElement;
}

interface CommentFormElements extends HTMLFormElement{
    readonly elements: CommentFormElements;
}

function PostDetail(){
    const {postId} = useParams();
    const [PostDetail, setPostDetail] = useState<Post>();
    const [comments, setComments] = useState([]);
    const profile = localStorage.getItem('profile');  
    const user = localStorage.getItem('user') as string;

    useEffect(()=>{
        async function fetchPostDetail(){
            try{
                const response = await api.get(`v1/posts/${postId}`, getAuthHeader());
                console.log(response.data)
                setPostDetail(response.data);
                setComments(response.data.comments);
                
            } catch(err) {
                console.error(err);
            }
        }
        fetchPostDetail();
    }, []);

    async function handleLike(postId: string){
        try{
            if (PostDetail?.likes.includes(profile)){
                const newPost = await unlikePostApi(PostDetail, profile);
                newPost && setPostDetail({...newPost});
            } else {
                const newPost = PostDetail && await likePostApi(PostDetail, profile);
                newPost && setPostDetail({...newPost});
            }
            
        } catch (err){
            console.error(err);
        }
        
    }

    async function handleAddComment(event: FormEvent<CommentFormElements>){
        event.preventDefault();
        const form = event.currentTarget;
        const data = {
            description: form.elements.description.value
        }
    
        try{
            const response = await api.post(`/v1/posts/${postId}/comments`, data ,getAuthHeader());
            const comment = {
                ...response.data,
                profile: {_id:profile}
            }
            setComments([comment, ...comments]);
            setPostDetail((post) => {
                post?.comments.push(post);
                return {...post}; 
            })
        } catch (err){
            console.error(err);
        }
    }

    return(
        <div className='w-screen h-screen flex'>
            <Menu />
            <div className='flex flex-col w-full overflow-y-auto scroll-smooth'>
                {PostDetail && (
                    <PostItem post={PostDetail} handleLike={handleLike}/>
                )}
                <section className='ml-5    '>  
                    <form action='' onSubmit={handleAddComment} className='mx-8 my-8 flex flex-col gap-4'>
                        <Text>Insira seu comentário</Text>
                            <TextInput.Root>
                                <TextInput.Input id='description' 
                                placeholder='Comente sobre este post!'/>
                            </TextInput.Root>
                            <Button type="submit" className='mt-4'>Incluir comentário</Button>
                    </form>
                    <div className='border-t border-slate-400 w-full'>
                        <div className='my-8 mx-8'>
                            <Text size='lg' className=''>Comentários:</Text>
                            <ul>
                                {comments && comments.map((comment)=>(
                                    <li key={comment._id} className='my-8 border rounded-lg'>
                                        <div className='flex flex-row items-center gap-3'>
                                            <UserCircle size={32} weight='light' className='text-slate-50'/>
                                            <Text size="sm">{comment.profile}</Text>
                                        </div>
                                        <Text size='md'>{comment.description}</Text>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default PostDetail;