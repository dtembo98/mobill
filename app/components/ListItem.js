import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import AppText from './AppText';
import { Image } from 'react-native';
import colors from '../config/colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
function ListItem({ title, image, subTitle, onPress, rightActions }) {
	return (
		<Swipeable renderRightActions={rightActions}>
			<TouchableHighlight underlayColor={colors.light} onPress={onPress}>
				<View style={styles.container}>
					<Image style={styles.image} source={image} />
					<View>
						<AppText style={styles.title}>{title}</AppText>
						<AppText styles={styles.subTitle}>{subTitle}</AppText>
					</View>
				</View>
			</TouchableHighlight>
		</Swipeable>
	);
}
const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		padding: 20,
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 35,
		marginRight: 10,
	},
	title: {
		fontWeight: '400',
	},
	subTitle: {
		color: colors.medium,
	},
});
export default ListItem;
