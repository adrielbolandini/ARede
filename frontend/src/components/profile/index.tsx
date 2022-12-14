import Heading from "../headers";
import Text from "../text";
import {UserCircle} from 'phosphor-react';
import Button from "../button";
import { useNavigate } from "react-router-dom";

function Profile(){
    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    function handleLogout(){
        localStorage.clear();
        navigate('/');
    }

    return(
        <div className="basis-5/6">
            <Heading className="border-b border-slate-400 mt-4">
                <div className="flex flex-row items-center ml-5 my-4">
                    <UserCircle  size={28} weight='light' className="text-slate-50"/>
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            <div className="mt-4 w-full flex flex-col items-stretch">
                <Button className="ml-4 max-w-sm" onClick={()=> handleLogout()}>Sair</Button>
            </div>

        </div>
    )
}

export default Profile;