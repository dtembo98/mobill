import React,{useState,useEffect} from 'react';
import { StyleSheet,Text, View } from 'react-native';
import * as Yup from 'yup';
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
import UploadScreen from './UploadScreen';
import BarCodePicker from '../components/BarCodePicker';
import ImageInput from '../components/ImageInput';



const validationSchema = Yup.object().shape({
	title: Yup.string().required().min(1).label('Title'),
	price: Yup.number().required().min(1).max(10000).label('Price'),
	description: Yup.string().label('Description'),
	quantity: Yup.number().required().min(1).max(10000).label('Price'),
	images: Yup.array().min(1, 'Please select at least one image'),

	
});



function ListingEditScreen({navigation,route}) {
	
	const [barcode,setBarcode] = useState()
	const [uploadVisible,setUploadVisible] = useState(false)
	const [progress,setProgress] = useState(0)

	useEffect(() => {
		console.log("cool")
		if(route.params)
		{
			setBarcode(route.params.barcode)

			console.log(barcode)
		}
		console.log("this is set ",route.params)
	}, [])

const handleSubmit = async(listing,{resetForm}) =>
	{    
		setBarcode(route.params.barcode)  
		console.log("let do this ",listing)
		
		

		setProgress(0)
		setUploadVisible(true)
		const result = await listingsApi.addListing({...listing,barcode},(progress) =>{
			setProgress(progress)
		})
	

		if(!result.ok) {
			setUploadVisible(false)
			console.log(result)
			return alert('Could not save the product')
		}
		resetForm()
	}
	
	return (
		<Screen style={styles.container}>

			{ !barcode ? 	<BarCodePicker navigation={navigation}/>:<>
			
			<UploadScreen onDone={() =>	setUploadVisible(false)} progress={progress} visible={uploadVisible}/>
			<Form
				initialValues={{
					title: '',
					price: '',
					quantity: '',
					description: '',
					images: [],				
				}}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}>
				<View style={styles.pickers}>
				<FormImagePicker name='images' 	/> 
	
				</View>

				<FormField maxLength={255} name='title' placeholder='Title' />
				<FormField
					keyboardType='numeric'
					maxLength={8}
					name='price'
					placeholder='Price'
				
				/>  
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
					
				>
					
				</FormField>

				<FormField
					maxLength={255}
					multiline
				     placeholder={barcode ? barcode :""}
				/>
				<SubmitButton  title='Add Product' />
			</Form></>}
			
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
 