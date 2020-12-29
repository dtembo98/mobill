import React from 'react';
import { View ,StyleSheet, TouchableOpacity} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../config/colors';
import { MaterialCommunityIcons } from "@expo/vector-icons";
function NewListingButton({onPress}) { 
   return (
<TouchableOpacity onPress={onPress}>
    <View style={styles.container}>
        <MaterialCommunityIcons name="plus-circle" color={Colors.white}size={30} />
    </View>
</TouchableOpacity>
  );
}

const styles = StyleSheet.create({
 container:{
     alignItems:"center",
     backgroundColor:colors.primary,
     borderRadius:40,
     borderColor:Colors.white,
     borderWidth:10,
     height:80,
     width:80,
     bottom:25,
     justifyContent:"center"
 }
})
export default NewListingButton;