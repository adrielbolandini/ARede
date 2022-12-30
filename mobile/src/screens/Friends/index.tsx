import React, {useEffect, useState } from 'react';
import { Button, FlatList, FlatListProps, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import api from '../../services/api';
import * as SecureStore from 'expo-secure-store';

import { styles } from './styles';
import { getAuthHeader } from '../../services/auth';
import { Spacer } from '../../components/Spacer';
import { UserCircle } from 'phosphor-react-native';

interface IProfile extends FlatListProps<any>{
    _id: string,
    followButtonDisabled: boolean,
    followers: [],
    following: [],
    name: string,
    user: string,
}


export function Friends(){
    const[profiles, setProfiles] = useState<IProfile>();

    async function getProfiles(){
        
        const profileId = await SecureStore.getItemAsync('profile');
        
        try{
            const authHeader = await getAuthHeader();
            const response = await api.get("/v1/users", authHeader);
            const profiles = response.data.map(profile =>{
                return {...profile,
                followButtonDisabled: profile.followers.includes(profileId)}
            })
            setProfiles(profiles);
        } catch(err){
            console.error(err)
        }
    }

    async function handleFollow(profileId:string){
        try{
            const authHeader = await getAuthHeader();
            await api.post(`v1/profile/follow/${profileId}`, null, authHeader);
            getProfiles();
        } catch (err){
            console.error(err)
        }
    }

    useEffect(()=>{
        getProfiles && getProfiles();
    }, []);

    return(
        <SafeAreaView >
            <View >
                {profiles &&
                <FlatList
                data={profiles}
                keyExtractor={({_id})=>_id}
                renderItem={({item})=>(
                    <View style={styles.container}>
                        {(item.followButtonDisabled) ? (
                            <View >
                                <Spacer>
                                    <View style={styles.icon}>
                                        <UserCircle color='white' />
                                        <Text style={styles.textName}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity style={styles.button}>
                                        <Button onPress={()=>handleFollow(item._id)} title='Seguir' disabled={item.followButtonDisabled}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button}>
                                        <Button onPress={()=>handleFollow(item._id)} title='Deixar de seguir' disabled={!item.followButtonDisabled}/>
                                    </TouchableOpacity>
                                </Spacer>
                            </View>
                        ) : (
                            <View >
                            <Spacer>
                                <View style={styles.icon}>
                                    <UserCircle color='white'/>
                                    <Text style={styles.textName}>{item.name}</Text>
                                </View>
                                <TouchableOpacity style={styles.button}>
                                    <Button onPress={()=>handleFollow(item._id)} title='Seguir' disabled={item.followButtonDisabled} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button}>
                                    <Button onPress={()=>handleFollow(item._id)} title='Deixar de seguir' disabled={!item.followButtonDisabled}/>
                                </TouchableOpacity>
                            </Spacer>
                        </View>
                        )}
                    </View>
                )}    
                />

            }
            </View>
            
        </SafeAreaView>
    );
}