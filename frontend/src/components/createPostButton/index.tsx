import * as Dialog from '@radix-ui/react-dialog'

function CreatePostButton(){
    return(
        <Dialog.Trigger className='mt-6 py-3 px-10 bg-sky-500 transition-colors hover:bg-cyan-300 rounded-full font-semibold'>
            Novo Post
        </Dialog.Trigger>
    )
}

export default CreatePostButton;