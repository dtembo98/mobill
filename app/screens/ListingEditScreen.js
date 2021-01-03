import React from 'react';
import { StyleSheet,Text, View } from 'react-native';
import * as Yup from 'yup';
import CategoryPickerItem from '../components/CategoryPickerItem';
import * as Location from 'expo-location'
import {
	AppForm as Form,
	AppFormField as FormField,
	AppFormPicker as Picker,
	SubmitButton,
} from '../components/forms';
import FormImagePicker from '../components/forms/FormImagePicker';
import Screen from '../components/Screen';
import useLocation from '../hooks/useLocation'
import listingsApi from '../api/listings'
import listings from '../api/listings';
import { useState } from 'react/cjs/react.development';
import UploadScreen from './UploadScreen';
import BarCodePicker from '../components/BarCodePicker';
 

const validationSchema = Yup.object().shape({
	title: Yup.string().required().min(1).label('Title'),
	price: Yup.number().required().min(1).max(10000).label('Price'),
	description: Yup.string().label('Description'),
	quantity: Yup.number().required().min(1).max(10000).label('Price'),
	images: Yup.array().min(1, 'Please select at least one image')
});

const categories = [
	{ label: 'Food', value: 1, backgroundColor: 'red', icon: 'food' },
	{ label: 'Gloceries', value: 2, backgroundColor: 'green', icon: 'apps' },
	{ label: 'Spicies', value: 3, backgroundColor: 'blue', icon: 'lock' },
	{
		backgroundColor: '#26de81',
		icon: 'cards',
		label: 'Games',
		value: 4,
	},
	{
		backgroundColor: '#2bcbba',
		icon: 'shoe-heel',
		label: 'Clothing',
		value: 5,
	},
	{
		backgroundColor: '#45aaf2',
		icon: 'basketball',
		label: 'Sports',
		value: 6,
	},
	{
		backgroundColor: '#4b7bec',
		icon: 'headphones',
		label: 'Movies & Music',
		value: 7,
	},
	{
		backgroundColor: '#a55eea',
		icon: 'book-open-variant',
		label: 'Books',
		value: 8,
	},
	{
		backgroundColor: '#778ca3',
		icon: 'application',
		label: 'Other',
		value: 9,
	},
	{
		backgroundColor: '#fc5c65',
		icon: 'floor-lamp',
		label: 'Furniture',
		value: 10,
	},
	{
		backgroundColor: '#fd9644',
		icon: 'car',
		label: 'Cars',
		value: 11,
	},
	{
		backgroundColor: '#fed330',
		icon: 'camera',
		label: 'Cameras',
		value: 12,
	},
];

function ListingEditScreen({navigation,route}) {
	const location = useLocation()
	const [uploadVisible,setUploadVisible] = useState(false)
	const [progress,setProgress] = useState(0)

const handleSubmit = async(listing,{resetForm}) =>
	{      
		console.log("let do this ",listing)

		setProgress(0)
		setUploadVisible(true)
		const result = await listingsApi.addListing({...listing,location},(progress) =>{
			setProgress(progress)
		})
	

		if(!result.ok) {
			setUploadVisible(false)
			return alert('Could not save the product')
		}
		resetForm()
	}
	
	return (
		<Screen style={styles.container}>
			<UploadScreen onDone={() =>	setUploadVisible(false)} progress={progress} visible={uploadVisible}/>
			<Form
				initialValues={{
					title: '',
					price: '',
					quantity: '',
					description: '',
					images: [],
					barcode:''
				}}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}>
				<View style={styles.pickers}>
				<FormImagePicker name='images' /> 
				<BarCodePicker navigation={navigation}/>
				</View>

				<FormField maxLength={255} name='title' placeholder='Title' />
				<FormField
					keyboardType='numeric'
					maxLength={8}
					name='price'
					placeholder='Price'
				/>  
				{/* <Picker
					items={categories}
					name='category'
					placeholder='Category'
					//PickerItemComponent={CategoryPickerItem}
					numberOf
					Columns={3}
				/> */}
					<FormField
					keyboardType='numeric'
					maxLength={8}
					name='quantity'
					placeholder='quantity'
				/>  
				<FormField
					maxLength={255}
					multiline
					name='description'
					numberOfLines={3}
					placeholder='Description'
				/>
				{route.params && <Text>{route.params.barcode}</Text>}
				<SubmitButton title='Add Product' />
			</Form>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
	},
	pickers:{
	
		flexDirection:'row',
		marginLeft:30
		
		
	}
});
export default ListingEditScreen;
 