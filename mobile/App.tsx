import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Loading } from './src/components/Loading';
import {useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black} from '@expo-google-fonts/inter'; 
import {Login} from './src/screens/Login';
import {House, User, UsersThree} from 'phosphor-react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { THEME } from './src/theme';
import { Signup } from './src/screens/Signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './src/screens/Home';
import { Friends } from './src/screens/Friends';
import { Profile } from './src/screens/Profile';
import { useContext } from 'react';
import {
  Provider as AuthProvider,
  Context as AuthContext
} from './context/AuthContext'

const MyTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: THEME.COLORS.BACKGROUND_900
  }
}

function App() {
  const {token} = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  const Stack = createNativeStackNavigator();

  const Tab = createBottomTabNavigator();

    return (
      <SafeAreaProvider>
        {fontsLoaded ? (
          <NavigationContainer theme={MyTheme}>
            {!token ? (
              <Stack.Navigator screenOptions={{
                headerShown: false,
                statusBarStyle:'dark'
              }}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Signup" component={Signup}/>
              </Stack.Navigator>
            ):(
              <Tab.Navigator
                screenOptions={({route})=>({
                  tabBarIcon: ({color,size})=>{
                    switch (route.name){
                      case "Home":
                        return (
                          <House size={size} color={color} />
                        )
                      case "Friends":
                        return (
                          <UsersThree size={size} color={color} />
                        )
                      case "Profile":
                        return (
                          <User size={size} color={color} />
                      )
                    }
                  },
                  headerShown: false,
                  tabBarShowLabel: false,
                  tabBarStyle:{backgroundColor: THEME.COLORS.BACKGROUND_800}
                })}>
                <Tab.Screen name='Home' component={Home} />
                <Tab.Screen name='Friends' component={Friends} />
                <Tab.Screen name='Profile' component={Profile} />
              </Tab.Navigator>
            )} 
            </NavigationContainer>
        ) : (
          <Loading />
          )}
        </SafeAreaProvider>
    );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
