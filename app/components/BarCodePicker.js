import React,{useState,useEffect} from 'react';
import {Text, View ,StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import routes from "../navigation/routes";

import { createStackNavigator } from "@react-navigation/stack"
function BarCodePicker({navigation}) { 

   
    


const handlePress = () =>
{
    navigation.navigate(routes.SCANNER)
}


   return (
<TouchableWithoutFeedback  onPress ={handlePress}>
        <View style={styles.wrapper}>
            <View style={styles.container}>
                  <AntDesign name="qrcode" color={colors.medium} size={200} />
            </View>
            <Text>Scan A Product Barcode To be Added</Text>
        </View>
     
</TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
 container:{
     backgroundColor:colors.light,
     borderRadius:15,
     justifyContent:"center",
     alignItems:"center",
     height:200,
     width:200,
     marginBottom:40

 },
 wrapper:{
   flex:1,
   
   justifyContent:"center",
   alignItems:'center'
 }
})
export default BarCodePicker;