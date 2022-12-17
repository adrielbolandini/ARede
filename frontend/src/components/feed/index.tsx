import Heading from "../headers";
import Text from "../text";
import {UserCircle, Chat, Heart} from 'phosphor-react';
import { useState, useEffect } from "react";
import PostItem from "../postItem";
import { Post } from "../../model/Post";

interface feedProps{
    posts: Post[];
    handleLike: (postId: string)=>void;
}

function Feed({posts,handleLike}: feedProps){
    const user = localStorage.getItem('user');

    return(
        <div className='basis-5/6 overflow-y-auto scroll-smooth'>
            <Heading className="border-b border-slate-400 mt-4">
                <Text size='lg' className='font-extrabold ml-5'>Pagina Inicial</Text>
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle  size={28} weight='light' className="text-slate-50"/>
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <section>
                {posts &&
                posts.map((post) =>(
                   <PostItem post={post} handleLike={handleLike} />
                ))}
                
            </section>
        </div>
    )
}

export default Feed;