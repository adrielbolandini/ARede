import { UserCircle } from "phosphor-react-native";
import React, {useContext, useState} from "react";
import { Button, Text, View } from "react-native";
import { Input } from "../../components/Input";
import { Spacer } from "../../components/Spacer";
import { THEME } from "../../theme";

import { styles } from "./styles";
import { Context as AuthContext } from "../../../context/AuthContext";
import { Context as PostContext } from "../../../context/PostContext";

export function CreatePost(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const {user} = useContext(AuthContext);
    const {createPost} = useContext(PostContext);

    return(
        <View>
            <View style={styles.heading}>
                <UserCircle color='white' size={48} weight='thin'/>
                <Text style={styles.userNametext}>{user}</Text>
            </View>
            <Spacer>
                <Input.Root>
                    <Input.Input
                    value={title}
                    onChangeText={setTitle}
                    placeholder='Digite o título do post'
                    placeholderTextColor={THEME.COLORS.INPUT}
                    autoCorrect
                    >
                    </Input.Input>
                </Input.Root>
            </Spacer>
            <Spacer>
                <Input.Root>
                    <Input.Input
                    value={description}
                    onChangeText={setDescription}
                    placeholder='Digite a descrição do post'
                    placeholderTextColor={THEME.COLORS.INPUT}
                    autoCorrect
                    >
                    </Input.Input>
                </Input.Root>
            </Spacer>
            <Spacer>
                <Button
                    title='Postar'
                    onPress={()=>{
                        createPost && createPost({title,description})
                    }}
                />
            </Spacer>
        </View>
    )
}