import React,{useEffect,useState} from 'react';
import { View ,StyleSheet,Alert} from 'react-native';
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from '../components/AppText';
import listingsApi from '../api/listings'
import ActivityIndicator from "../components/ActivityIndicator";
const validationSchema = Yup.object().shape({
  mobile_wallet: Yup.string().required().label("phone"),
  quantity:  Yup.number().required().min(1).max(10000).label('Quantity'),
  
});
const minutesTocheckStatus = 100000

function CheckOutScreen({navigation,route}) { 
 const [product,setProduct] = useState()
 const [loop,setLoop] = useState(false)
 const [loading,setLoading] = useState(false)
 
 

 useEffect(() => {
  if(route.params)
  {
    setProduct(route.params.product)
  }
 }, [])
 
  const handleChange = (e) =>
  {
    console.log(e)
  }
 const handleSubmit = async(listing) =>
 {    
    const results = await listingsApi.buyProduct(product.barcode,listing)
    if(!results.ok) {
		
			return alert(`Failed to sell product: ${result.data.error}`)
    } 
   if(results.data.data.status ==="pending")
   {  
     alert(`Transaction awaiting approval from customer`)
    
       setLoading(true)
       setInterval(async() => {
        const transactionStatus = await listingsApi.checkSaleStatus(results.data.data._id)
          if(transactionStatus.data.status === 'processed') {
           
            console.log(transactionStatus.data.status)
            setLoading(false)
           return Alert.alert('Successful',`Transaction was successful`,
                      [
                          {text:'scan another product',onPress:() =>navigation.navigate(routes.CHECKOUT,{product})},
                          {text:'No'}
                        ]) };
            
          if(transactionStatus.data.status === 'pending') 
          {
            console.log("pending")
          }
          if(transactionStatus.data.status === 'failed') 
          {
            Alert.alert('Failed',`Transaction failed`,
            [
                {text:'Retry'},
                {text:'No'}
              ]) }
            console.log(transactionStatus.data.status)
            setLoading(false)
            
          
       }, 1000);

    //  setLoop(true)
    //  setLoading(true)
    // while(loop)   
    // {
    //   const transactionStatus = await listingsApi.checkSaleStatus(results.data.data._id)
    //   if(transactionStatus.data.status === 'processed') {
       
    //     console.log(transactionStatus.data.status)
    //     setLoading(false)
    //      setLoop(false)
    //      alert('trasaction was successfull')}
    //   if(transactionStatus.data.status === 'pending') 
    //   {console.log(transactionStatus.data.status)}
    //   if(transactionStatus.data.status === 'failed') 
    //   {
    //     console.log(transactionStatus.data.status)
    //     setLoop(false)
    //     setLoading(false)
        
    //   }
    // }
  
   
   }
  
 }


 return (
<Screen style={styles.container}>
  {product && <AppText style={{fontSize:30,marginBottom:30}}>Total Amount {product.price}</AppText>}
    {product && 
    <View style={styles.product}> 
      <AppText>Title         {product.title}</AppText>
      <AppText> Price         K{product.price}</AppText> 
      <AppText> Barcode     {product.barcode}</AppText>
    </View>}
   
     {loading?  <ActivityIndicator visible = {loading}  />
     : <AppForm
       initialValues={{ quantity: '1', mobile_wallet: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
     
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="calculator"
          keyboardType="numeric"
          name="quantity"
          placeholder="quantity"
       
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          name="mobile_wallet"
          placeholder="customer mobile number"
          keyboardType="numeric"
        
        />
        <SubmitButton title="Checkout" />
      </AppForm>}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop:20
  },
  product:{
    padding:10,
    marginBottom:50
  }
});

export default CheckOutScreen;