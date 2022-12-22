import MenuItem from "../menuItem";
import {House, User, UsersThree,Diamond} from 'phosphor-react';
import Text from '../../components/text';
import * as Dialog from '@radix-ui/react-dialog';
import CreatePostButton from '../../components/createPostButton';
import CreatePostDialog from '../../components/createPostDialog';
import { useState } from "react";
import { Post } from "../../model/Post";

interface menuProps{
    newPostCreated?: (post: Post) => void;
}

function Menu(props: menuProps){
    const[open, setOpen] = useState(false);

    function postCreated(post: Post){
        setOpen(false);
        props.newPostCreated && props.newPostCreated(post);
    }
    
    return(
        <div className='basis-1/6 border-r border-slate-400 ml-4 pt-4 py-2'>
                <div className='flex items-center ml-4'>
                    <Diamond color="#e3e3e3" weight='fill'/>
                    <Text className='font-extrabold ml-4'>ARede</Text>
                </div>
                <ul className="pr-2">
                    <MenuItem menuTitle="Pagina Inicial" route="/home"><House size={28} weight='fill'/></MenuItem>
                    <MenuItem menuTitle="Perfil" route="/profile"><User size={28} weight='fill'/></MenuItem>
                    <MenuItem menuTitle="Amigos" route="/friends"><UsersThree size={28} weight='fill'/></MenuItem>
                 </ul>
                <div className='flex flex-col items-center'>
                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <CreatePostButton />

                        <CreatePostDialog postCreated={postCreated} />
                    </Dialog.Root>
                </div>
            </div>
        
    )
}

export default Menu;