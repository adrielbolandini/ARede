import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 12
    },
    textName:{
        color: THEME.COLORS.CAPTION_300
    },
    button:{
        marginTop: 6,
        minWidth: 24,
        justifyContent: "center"
    },
    icon:{
        flex:1,
        flexDirection: 'row',
        padding: 3,
    }
});