import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import AuthNavigator from './app/navigation/AuthNavigator';
import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from './app/navigation/navigationTheme';
import AuthContext from './app/auth/context';
import authStorage from './app/auth/storage';
import {AppLoading} from 'expo'



export default function App() {

const [user,setUser] = useState()
const [isReady,setIsReady] = useState()
const restoreUser =async () =>
{
   const user = await authStorage.getUser()
   if(user)  setUser(user)
  
}
if(!isReady) 
{ return <AppLoading startAsync={restoreUser} onFinish={() => setIsReady(true)}/>
}
		  
	
	return <AuthContext.Provider value = {{user,setUser}}>
		<NavigationContainer theme={navigationTheme}>
	{user ? <AppNavigator/> :<AuthNavigator/> }
	</NavigationContainer>
	
	</AuthContext.Provider>

}  

