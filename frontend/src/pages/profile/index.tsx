import Menu from "../../components/menu";
import Profile from "../../components/profile";

function ProfilePage(){
    return (
        <div className='w-screen h-screen flex'>
            <Menu/>
            <Profile />
        </div>
    )
}

export default ProfilePage;