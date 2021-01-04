import React,{useState,useEffect} from 'react';
import { FlatList,StyleSheet } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors'
import routes from '../navigation/routes'
import listingsApi from '../api/listings'
import BASE_API from '../config/config'
import ActivityIndicator from '../components/ActivityIndicator';
// const listings = [
// 	{
// 		id: 1,
// 		title: 'water',
// 		price: 100,
// 		image: require('../assets/prod_3.jpg'),
// 	},
// 	{
// 		id: 2,
// 		title: 'Beer',
// 		price: 10,
// 		image: require('../assets/prod_4.jpg'),
// 	},
// 	{
// 		id: 3,
// 		title: 'suger',
// 		price: 200,
// 		image: require('../assets/prod_5.jpg'),
// 	},
// ];
function ListingsScreen({navigation}) {

	const [listings,setListings] = useState()
	const [loading,setLoading] = useState(false)

	useEffect(() => {
		loadListings()
		console.log(listings)
		}, [])
const loadListings =async() =>
{
	setLoading(true)
	const response = await listingsApi.getListings()
	setLoading(false)

	// console.log(response.data)
	setListings(response.data.data);
}

	return (
		<Screen style={styles.screen}>
			<ActivityIndicator visible={ loading}/>
			<FlatList
				data={listings}
				keyExtractor={(listing) => listing.id.toString()}
				renderItem={({ item }) => (
					<Card
						title={item.title}
						subTitle={'K' + item.price}
						imageUrl={`${BASE_API.BASE_API}${item.image}`}
						onPress={()=>navigation.navigate(routes.LISTING_DETAILS,item)}
					/>
				)}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen :{
		padding:20,
		backgroundColor:colors.light

	}
})
export default ListingsScreen;
