import React from 'react';
import { View ,StyleSheet} from 'react-native';
import colors from '../config/colors';
import AppText from './AppText';
import Constants from 'expo-constants'
import { useNetInfo } from '@react-native-community/netinfo'


function OfflineNotice() { 

    const netInfo = useNetInfo()
    console.log(netInfo)
    
    if(netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    {
        return (
            <View style={styles.container}>
                <AppText style={styles.text}>
                    No internet Connection.
                </AppText>
            </View>
              );
    }
    return null
 
}

const styles = StyleSheet.create({
 container:{
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:colors.primary,
     height:50,
     position:'absolute',
     width:"100%",
     top:Constants.statusBarHeight,
     zIndex:1
    },
    text:{
        color:colors.white
    }
})
export default OfflineNotice;