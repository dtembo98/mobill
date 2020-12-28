import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import AppText from './AppText';
import { Image } from 'react-native';
import colors from '../config/colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from "@expo/vector-icons";
function ListItem({
	title,
	image,
	IconComponent,
	subTitle,
	onPress,
	rightActions,
}) {
	return (
		<Swipeable renderRightActions={rightActions}>
			<TouchableHighlight underlayColor={colors.light} onPress={onPress}>
				<View style={styles.container}>
					{IconComponent}
					{image && <Image style={styles.image} source={image} />}

					<View style={styles.detailsContainer}>
						<AppText numberOfLines={1} style={styles.title}>{title}</AppText>
						{subTitle && (
							<AppText styles={styles.subTitle} numberOfLines={2}>
								{subTitle}
							</AppText>
						)}
					</View>
					<MaterialCommunityIcons color={colors.medium} name="chevron-right" size={25}/>
				</View>
			</TouchableHighlight>
		</Swipeable>
	);
}
const styles = StyleSheet.create({
	container: {
		alignItems:'center',
		flexDirection: 'row',
		padding: 20,
		backgroundColor: colors.white,
	},
	detailsContainer: {
		
		flex:1,
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
