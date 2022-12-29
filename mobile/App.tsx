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

import { Friends } from './src/screens/Friends';
import { Profile } from './src/screens/Profile';
import { useContext, useEffect } from 'react';
import {
  Provider as AuthProvider,
  Context as AuthContext
} from './context/AuthContext';
import {
  Provider as PostProvider,
  Context as PostContext
} from './context/PostContext'
import { HomeNavigationSreen } from './src/screens/HomeNavigationScreen';
import { navigationRef } from './src/screens/RootNavigation';

const MyTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    background: THEME.COLORS.BACKGROUND_900
  }
}

function App() {
  const {token, tryLocalLogin} = useContext(AuthContext);

  useEffect(()=>{
    tryLocalLogin && tryLocalLogin(); 
  }, [])

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
          <NavigationContainer theme={MyTheme} ref={navigationRef}>
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
                      case "HomeNavigation":
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
                  tabBarStyle:{backgroundColor: THEME.COLORS.BACKGROUND_800},
                  
                })}>
                <Tab.Screen name='HomeNavigation' component={HomeNavigationSreen} />
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
      <PostProvider>
        <App />
      </PostProvider>
    </AuthProvider>
  )
}
