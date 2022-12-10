import * as Dialog from '@radix-ui/react-dialog'
import { FormEvent } from 'react';
import Button from '../button';
import { TextInput } from '../textInput';
import api from '../../services/api';


interface createPropsDialogProps{
    closeDialog: ()=>void;
}

function CreatePostDialog({closeDialog}: createPropsDialogProps){

    const token = localStorage.getItem('accessToken')

    async function handleSubmit(event: FormEvent){
        
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const newPost = {
            title : form.elements.title.value,
            description : form.elements.description.value
        };

        try{
            
            await api.post('/v1/posts', newPost,{
                headers:{
                    Authorization: `${token}`
                }
            })
            closeDialog()
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
                <form className='mt-8 flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='title' className='font-semibold'>Título do post</label>
                        <TextInput.Input id='title' 
                        placeholder='Sobre o que você quer falar?'/>

                        <label htmlFor='description' className='font-semibold'>Compartilhe suas ideias com seus amigos</label>
                        <TextInput.Input id='description' 
                        placeholder='Diga o que você está pensando'/>
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