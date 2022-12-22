import * as Dialog from '@radix-ui/react-dialog'
import { FormEvent } from 'react';
import Button from '../button';
import { TextInput } from '../textInput';
import api from '../../services/api';
import Dropzone from '../dropzone';
import { useState } from 'react';
import { getAuthHeader } from "../../services/auth";
import { Post } from '../../model/Post';
import * as FormData from 'form-data';

interface createPropsDialogProps{
    postCreated: (post: Post)=>void;
}

interface PostFormElements extends HTMLFormControlsCollection{
    title: HTMLInputElement;
    description: HTMLInputElement;
}

interface PostFormElement extends HTMLFormElement{
    readonly elements: PostFormElements;
}

function CreatePostDialog({postCreated}: createPropsDialogProps){
    const authHeader = getAuthHeader();
    const token = localStorage.getItem('accessToken');
    const [selectedFile, setSelectedFile] = useState<File>();

    async function handleSubmit(event: FormEvent<PostFormElement>){
        
        event.preventDefault();
        const form = event.currentTarget; 
        const data = new FormData();
        data.append('title', form.elements.title.value);
        data.append('description', form.elements.description.value);
        
        if (selectedFile){
            data.append('file',selectedFile);
        }

        try{
            const response = await api.post('/v1/posts', data, {headers: {
                Authorization: token,
            }});
            postCreated(response.data);
        } catch(err){
            console.log(err);
            alert("Erro ao criar o POST");
        }
    }

    return(
        <Dialog.Portal>
            <Dialog.DialogOverlay className='bg-black/60 inset-0 fixed'/>
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-2xl font-black'>Novo Post</Dialog.Title>
                <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit} encType="multipart/form-data" method='post'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='title' className='font-semibold'>Título do post</label>
                        <TextInput.Input id='title' 
                        placeholder='Sobre o que você quer falar?'/>

                        <label htmlFor='description' className='font-semibold'>Compartilhe suas ideias com seus amigos</label>
                        <TextInput.Input id='description' 
                        placeholder='Diga o que você está pensando'/>
                        <Dropzone onFileUploaded={setSelectedFile}/>
                    </div>
                    <footer className='mt-4 flex justify-end gap-4'>
                        <Button type='submit' className='flex-none w-48'>
                            Postar
                        </Button>
                        <Dialog.Close type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>
                            Fechar
                        </Dialog.Close>
                        
                    </footer>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default CreatePostDialog;