import React,{useState,useEffect} from 'react';
import {Text, View ,StyleSheet, TouchableWithoutFeedback} from 'react-native';
import colors from '../config/colors';
import { AntDesign } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import routes from "../navigation/routes";

import { createStackNavigator } from "@react-navigation/stack"
function BarCodePicker({navigation}) { 

   
    const [showScanner,setShowScanner] = useState(false)

    useEffect(() => {
        (async () => {
          const { status } = await BarCodeScanner.requestPermissionsAsync();
          setHasPermission(status === 'granted');
        })();
      }, []);


const handlePress = () =>
{
    navigation.navigate(routes.SCANNER)
}


   return (
<TouchableWithoutFeedback  onPress ={handlePress}>
        <View style={styles.container}>

             <AntDesign name="qrcode" color={colors.medium} size={40} />
    
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
     height:100,
     width:100,
     marginLeft:20
 }
})
export default BarCodePicker;