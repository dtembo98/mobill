import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import AppText from './AppText';
import { Image } from 'react-native';
import colors from '../config/colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
function ListItem({
	title,
	image,
	ImageComponent,
	subTitle,
	onPress,
	rightActions,
}) {
	return (
		<Swipeable renderRightActions={rightActions}>
			<TouchableHighlight underlayColor={colors.light} onPress={onPress}>
				<View style={styles.container}>
					{ImageComponent}
					{image && <Image style={styles.image} source={image} />}

					<View style={styles.detailsContainer}>
						<AppText style={styles.title}>{title}</AppText>
						{subTitle && (
							<AppText styles={styles.subTitle}>
								{subTitle}
							</AppText>
						)}
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
	detailsContainer: {
		marginLeft: 10,
		justifyContent: 'center',
	},
	image: {
		width: 50,
		height: 50,
		borderRadius: 35,
		marginRight: 10,
	},
	title: {
		fontWeight: '500',
	},
	subTitle: {
		color: colors.medium,
	},
});
export default ListItem;
