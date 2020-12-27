import React,{useState,useEffect} from 'react';
import { Button, Image, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import AppText from './app/components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from './app/components/AppButton';
import Card from './app/components/Card';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import MessageScreen from './app/screens/MessageScreen';
import Screen from './app/components/Screen';
import Icon from './app/components/Icon';
import ListItemDeleteAction from './app/components/ListItemDeleteAction';
import ListItem from './app/components/ListItem';
import AccountScreen from './app/screens/AccountScreen';
import ListingsScreen from './app/screens/ListingsScreen';
import AppTextInput from './app/components/AppTextInput';
import { Switch } from 'react-native-gesture-handler';
import AppPicker from './app/components/AppPicker';
import LoginScreen from './app/screens/LoginScreen';
import ListingEditScreen from './app/screens/ListingEditScreen';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default function App() {


	const [imageUri,setImageUri] = useState()
	const requestPermission = async () =>
	{   
		
		const {granted} = await ImagePicker.requestCameraRollPermissionsAsync()
		if(!granted)
		{
			alert('you need to enable permission to access the library')
		}
	}
	useEffect( ()=>{
             requestPermission() 
	},[])
	

	  const selectImage = async () =>
	  {
	     try {
			const result = await ImagePicker.launchImageLibraryAsync()
			if(!result.cancelled) setImageUri(result.uri)
		 } catch (error) {
			 console.log(error)
		 }
	  }
	  
	


	
	return <Screen>
     <Button title="Select Image" onPress={selectImage} />
	 <Image source={{uri:imageUri}} style={{width:200,height:200}} />
	</Screen>


}


