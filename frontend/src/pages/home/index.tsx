import Menu from '../../components/menu';
import Feed from '../../components/feed';

function Home(){
    

    return (
        <div className='w-screen h-screen flex'>
            <Menu/>
            <Feed />
        </div>
    )
}

export default Home;