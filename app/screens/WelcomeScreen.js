import React from 'react';
import { Image, ImageBackground, StyleSheet, View, Text } from 'react-native';
import AppButton from '../components/AppButton';

function WelcomeScreen(props) {
	return (
		<ImageBackground
			style={styles.background}
			source={require('../assets/image_4.jpg')}>
			<View style={styles.logoContainer}>
				<Image
					style={styles.logo}
					source={require('../assets/checkout.png')}
				/>
				<Text style={styles.tagLine}>
					Accept Mobile Money Payments for your products
				</Text>
			</View>

			<View style={styles.ButtonsContainer}>
				<AppButton title='Login' />

				<AppButton title='Register' color='secondary' />
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	background: {
		flex: 1,
		width: 400,
		height: 400,
		marginTop: 0,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},

	logo: {
		width: 100,
		height: 100,
	},
	logoContainer: {
		position: 'absolute',
		bottom: 150,
		alignItems: 'center',
	},
	ButtonsContainer: {
		padding: 20,
		width: '100%',
	},
	tagLine: {
		fontSize: 12,
		fontWeight: '600',
		paddingVertical: 20,
	},
});
export default WelcomeScreen;
