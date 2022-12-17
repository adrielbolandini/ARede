import { Chat, Heart, UserCircle } from "phosphor-react";
import Heading from "../headers";
import Text from "../text";
import { Post } from "../../model/Post";

interface postItemProps{
    post: Post;
    handleLike: (postId: string)=>void;
}

function PostItem({post, handleLike}: postItemProps){
    return(
        <div className="border-b border-slate-400" key={post._id}>
        <div className="flex flex-row items-center ml-5 my-4">
            <UserCircle  size={28} weight='light' className="text-slate-50"/>
            <Text className="font-extrabold ml-2">{post.profile.name}</Text>
        </div>
        <div className="ml-16 flex flex-col gap-2">
            <Heading size='sm'>{post.title}</Heading>
            {post.image? (
                <img src={post.description} alt="Foto" className="max-w-lg rounded-lg" />
            ): (
                <Text asChild>
                    <p>
                        {post.description}
                    </p>
                </Text>
            )}
            
        </div>
        
        <div className="flex items-center ml-16 my-4 space-x-2">
            <Chat size={24} className="text-slate-50" />
            <Text size='sm'>{post.comments.length}</Text>

            <div className="hover:bg-red-600 rounded-full p-1" onClick={()=>handleLike(post._id)}>
                <Heart size={24} className="text-slate-50" />
            </div>
            <Text size='sm'>{post.likes.length}</Text>
        </div>
        </div>
    )
}

export default PostItem;