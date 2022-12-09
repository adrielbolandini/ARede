import {Diamond} from 'phosphor-react';
import Menu from '../../components/menu';
import Text from '../../components/text';
import * as Dialog from '@radix-ui/react-dialog';
import CreatePostButton from '../../components/createPostButton';
import CreatePostDialog from '../../components/createPostDialog';

function Home(){
return (
    <div className='w-screen h-screen flex'>
        <div className='basis-1/6 border-r border-slate-400 ml-4 pt-4'>
            <div className='flex items-center ml-4'>
                <Diamond color="#e3e3e3" weight='fill'/>
                <Text className='font-extrabold ml-4'>ARede</Text>
            </div>
            <Menu />
            <Dialog.Root>
                <CreatePostButton />
                <CreatePostDialog />
            </Dialog.Root>
        </div>
        <div className='basis-5/6'>

        </div>
    </div>
)
}

export default Home;