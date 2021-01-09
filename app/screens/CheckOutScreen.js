import React,{useEffect,useState} from 'react';
import { View ,StyleSheet,Alert} from 'react-native';
import * as Yup from "yup";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppText from '../components/AppText';
import listingsApi from '../api/listings'
import ActivityIndicator from "../components/ActivityIndicator";
import routes from "../navigation/routes";

const validationSchema = Yup.object().shape({
  mobile_wallet: Yup.string().required().label("phone"),
  quantity:  Yup.number().required().min(1).max(10000).label('Quantity'),
  
});
const minutesTocheckStatus = 100000

function CheckOutScreen({navigation,route}) { 
 const [product,setProduct] = useState()
 const [loop,setLoop] = useState(true)
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
   if(results.data.data.status === "pending")
   {  
 
     setLoop(true)
     setLoading(true)
     let retry = 1

    while(loop)   
    { 
      retry += 1
     
      const transactionStatus = await listingsApi.checkSaleStatus(results.data.data.id)
     
      console.log(` sale status ::: ${transactionStatus.data.status} retry policy == #${retry} on sale entry id of ${results.data.data.id}`)
      if(transactionStatus.data.status === 'processed') {
        
        console.log("processed")
         setLoading(false)
         setLoop(false)

         return Alert.alert('Successful',`Transaction was successful`,
                           [
                               {text:'Make another sale?',
                               onPress:() => {
                                 setLoop(true)
                                 return navigation.navigate(routes.CHECKOUT,{product})
                                }
                              },
                              {text:'Go to sales',
                              onPress:() => {
                                setLoop(false)
                                return navigation.navigate(routes.SALE)
                               }
                             }
                             ],) };
        
      
      if(transactionStatus.data.status === 'pending') {
        if(retry === 200)
        {
          setLoading(false)
          setLoop(false)
         console.log("pending")
          return Alert.alert('Retry',`Session Ended? Retry?`,
          [
              {text:'ok',onPress:() =>{
                setLoop(true)
                 return navigation.navigate(routes.CHECKOUT,{product}) 
                 
              }},
              {text:'Go to sales',
              onPress:() => {
                setLoop(false)
                return navigation.navigate(routes.SALE)
               }
             }
            ]) 
          };
        }
      
    
      if(transactionStatus.data.status === 'failed') 
      {
        console.log(transactionStatus.data.status)
        setLoop(false)
        setLoading(false)
        return Alert.alert('Retry',`Transaction Failed! Retry?`,
        [
            {text:'yes',onPress:() =>{
              setLoop(true)
               return navigation.navigate(routes.CHECKOUT,{product}) 
               
            }},
            {text:'No',
            onPress:() => {
              setLoop(false)
              return navigation.navigate(routes.SALE)
             }
           }
          ]) 
        
      }
    }
  
   
   }
  
 }


 return (
<Screen style={styles.container}>
  {product && <AppText style={{fontSize:30,marginBottom:30}}>Total Amount {product.price }</AppText>}
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