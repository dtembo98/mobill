import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import ViewImageScreen from './app/screens/ViewImageScreen';
import AppText from './app/components/AppText';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppButton from './app/components/AppButton';
import Card from './app/components/Card';
import ListingDetailsScreen from './app/screens/ListingDetailsScreen';
import MessageScreen from './app/screens/MessageScreen';

export default function App() {
	return (
		<View
		// style={}
		>
			<MessageScreen />
		</View>
	);
}

const styles = StyleSheet.create({
	//styles for welcome screen
	container: {
		flex: 1,
		backgroundColor: '#f8f4f4',
		alignItems: 'center',
		justifyContent: 'center',
	},
	//styles for viewimagescreen

	ViewImageContainer: {
		flex: 1,
		backgroundColor: '#f8f4f4',
		padding: 0,
		paddingTop: 0,
	},
});
