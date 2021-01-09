import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import { Image} from 'react-native-expo-image-cache'
import ListItem from '../components/ListItem';
function Card({ title, subTitle, imageUrl,onPress }) {
	console.log(imageUrl)
	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<View style={styles.card}>
			<Image style={styles.image} uri={imageUrl} />
			<View>
				<AppText style={styles.title}>{title}</AppText>
				<AppText style={styles.subTitle}>{subTitle}</AppText>
			</View>
			
		</View>
		</TouchableWithoutFeedback>
	);
}
const styles = StyleSheet.create({
	card: {
		borderRadius: 15,
		backgroundColor: colors.white,
		marginBottom: 20,
		overflow: 'hidden',
	},
	detailsContainer: {
		padding: 20,
	},
	image: {
		width: '100%',
		height: 200,
	},
	subTitle: {
		color: colors.secondary,
		fontWeight: 'bold',
	},
	title: {
		marginBottom: 7,
	},
});
export default Card;
