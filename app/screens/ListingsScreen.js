import React,{useState,useEffect} from 'react';
import { FlatList,StyleSheet } from 'react-native';
import {AppButton as Button} from "../components/AppButton";
import Screen from '../components/Screen';
import Card from '../components/Card';
import colors from '../config/colors'
import routes from '../navigation/routes'
import listingsApi from '../api/listings'
import BASE_API from '../config/config'
import ActivityIndicator from '../components/ActivityIndicator';
import AppText from '../components/AppText';
import useApi from '../hooks/useApi';
 
function ListingsScreen({navigation}) {
	
	 const getListingsApi =  useApi(listingsApi.getListings)

	useEffect(() => {
		getListingsApi.request()
			}, [])

	return (
		<>
		  <ActivityIndicator visible={getListingsApi.loading} />
		<Screen style={styles.screen}>
		{getListingsApi.error && 
		<>
			<AppText> Couldn't retrieve the products. </AppText>
			<Button title="Retry" onPress={getListingsApi.request}/>
		</>}
	      
			<FlatList
				data={getListingsApi.data}
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
		</>
	);
}

const styles = StyleSheet.create({
	screen :{
		padding:20,
		backgroundColor:colors.light

	}
})
export default ListingsScreen;
