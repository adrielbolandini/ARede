import * as Dialog from '@radix-ui/react-dialog'
import { TextInput } from '../textInput';

function CreatePostDialog(){
    return(
        <Dialog.Portal>
            <Dialog.DialogOverlay className='bg-black/60 inset-0 fixed'/>
            <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
                <Dialog.Title className='text-2xl font-black'>Novo Post</Dialog.Title>
                <form className='flex flex-col gap-2'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='description' className='font-semibold'>Compartilhe suas ideias com seus amigos</label>
                    </div>
                    <TextInput.Input id='description' 
                    placeholder='Diga o que você está pensando'/>
                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default CreatePostDialog;