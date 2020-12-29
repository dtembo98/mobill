import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
function ListingDetailsScreen({route}) {
	const listing = route.params
	return (
		<View>
			<Image
				style={styles.image}
				source={listing.image}
			/>
			<View style={styles.detailsContainer}>
				<AppText style={styles.title}>{listing.title}</AppText>
				<AppText style={styles.price}>K{listing.price}</AppText>
				<View style={styles.userContainer}>
					<ListItem
						image={require('../assets/profile.png')}
						title='David Tembo'
						subTitle='5 listings'
					/>
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 300,
	},
	detailsContainer: {
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: '400',
	},
	userContainer: {
		marginVertical: 40,
	},
	price: {
		color: colors.secondary,
		fontSize: 18,
		marginVertical: 10,
	},
});
export default ListingDetailsScreen;
