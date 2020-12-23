import React from 'react';
import { FlatList } from 'react-native';
import Screen from '../components/Screen';
import Card from '../components/Card';
const listings = [
	{
		id: 1,
		title: 'water',
		price: 100,
		image: require('../assets/prod_3.jpg'),
	},
	{
		id: 2,
		title: 'Beer',
		price: 10,
		image: require('../assets/prod_4.jpg'),
	},
	{
		id: 3,
		title: 'suger',
		price: 200,
		image: require('../assets/prod_5.jpg'),
	},
];
function ListingsScreen(props) {
	return (
		<Screen>
			<FlatList
				data={listings}
				keyExtractor={(listing) => listing.id.toString()}
				renderItem={({ item }) => (
					<Card
						title={item.title}
						subTitle={'K' + item.price}
						image={item.image}
					/>
				)}
			/>
		</Screen>
	);
}

export default ListingsScreen;
