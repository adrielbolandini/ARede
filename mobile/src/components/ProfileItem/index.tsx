import { Chat, Heart, UserCircle } from "phosphor-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import { styles } from "./style";

const followButtonDisabled = true;

export function ProfileItem(){
    return(
        <View style={styles.post}>
                <TouchableOpacity>
                    {followButtonDisabled ? (
                        <Text>{}</Text>
                    ) : (
                    <Heart size={24} color='white' weight='thin'/>
                    )}
                    <Text style={styles.number}>{post.likes.length}</Text>
                </TouchableOpacity>
        </View>
    )
}    