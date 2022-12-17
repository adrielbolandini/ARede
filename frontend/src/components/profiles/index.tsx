import { UserCircle } from "phosphor-react";
import Text from "../text";
import Heading from "../headers";
import Button from "../button";
import { useState, useEffect } from "react";
import api from "../../services/api";
import AuthForm from "../authform";
import { getAuthHeader } from "../../services/auth";

interface profileProps{
    _id: string;
    name: string;
    followers: string[];
    followButtonDisabled: boolean;
}

function Profiles(){
    const authHeader = getAuthHeader();
    const user = localStorage.getItem('user');
    const[profiles, setProfiles] = useState<profileProps[]>([]);
    const profileId = localStorage.getItem('profile');

    useEffect(()=>{
        const getProfiles = async () => {
            try {
                const response = await api.get("/v1/users", authHeader);
                const profiles = response.data.map(profile=>{
                    return {...profile,
                    followButtonDisabled: profile.followers.includes(profileId)}
                })
                setProfiles(profiles);
            } catch(err) {
                console.error(err);
            }
        }; 

        getProfiles();
    }, []);

    async function handleFollow(profileId:string){
        try{
            await api.post(`v1/profile/follow/${profileId}`, null, authHeader);
            changeButtonStatus(profileId, true);
        } catch(err) {
            console.error(err);
        }
    }

    async function handleUnfollow(profileId:string){
        try{
            await api.post(`v1/profile/follow/${profileId}`, null, authHeader);
            changeButtonStatus(profileId, false);
        } catch(err) {
            console.error(err);
        }
    }

    function changeButtonStatus(profileId: string, buttonDisabled: boolean){
        setProfiles((profiles)=>{
            const newProfiles = profiles.map((profile)=>{
                if (profile._id===profileId){
                    profile.followButtonDisabled = buttonDisabled;
                }
                return profile;
            });
            return [...newProfiles];
        });
    }

    return(
        <div className="basis-5/6 ml-5 my-4 ">
            <Heading className="border-b border-slate-400 mt-4">
                <Text size='lg' className="font-extrabold ml-5">Amigos</Text>
                <div className="flex flex-row items-center ">
                    <UserCircle  size={28} weight='light' className="text-slate-50"/>
                    <Text className="font-extrabold ml-2">{user}</Text>
                </div>
            </Heading>
            {profiles.map((profile) => (
                <li className="ml-5 border-b border-slate-400 mt-4 pl-5" key={profile._id}>
                    <div className="flex flex-row items-center">
                        <UserCircle  size={28} weight='light' className="text-slate-50"/>
                        <Text className="font-extrabold ml-2">{profile.name}</Text>
                    </div>
                    <footer className='mt-4 flex justify-start gap-4 mb-4'>
                        <Button type='submit' className='flex-none w-48' onClick={()=>handleFollow(profile._id)} disabled={profile.followButtonDisabled}>
                            Seguir
                        </Button>
                        <button type='button' className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 focus:ring-2 ring-white' 
                        onClick={()=>handleUnfollow(profile._id)} disabled={!profile.followButtonDisabled}>
                            Parar de seguir
                        </button>
                        
                    </footer>
                </li>
            ))}
        </div>
    )
}

export default Profiles;