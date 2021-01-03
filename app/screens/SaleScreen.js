import React from 'react';
import {Text,View ,StyleSheet,Image,ImageBackground} from 'react-native';
import AppButton from '../components/AppButton';
import Screen from '../components/Screen';
import routes from '../navigation/routes'
import BarCode from "./BarCodeScreen";

function SaleScreen({navigation}) { 
   return (
    <Screen>
    <View style={styles.logoContainer}>
        <Image
            style={styles.logo}
            source={require('../assets/MM_logo.jpg')}
        />
        <Text style={styles.tagLine}>
            Accept Mobile Money Payments for your products
        </Text>
    </View>

    <View style={styles.ButtonsContainer}>
        <AppButton title='Sell Product' onPress={() =>navigation.navigate(routes.BARCODE)} />

        <AppButton title='Add Product'  onPress={() =>navigation.navigate(routes.LISTINGS_EDIT)} color='secondary' />
    </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
	

	logo: {
		width: 100,
		height: 100,
	},
	logoContainer: {
	
		top: 20,
		alignItems: 'center',
	},
	ButtonsContainer: {
		padding: 40,
        width: '100%',
		top: 40,
	},
	tagLine: {
		fontSize: 12,
		fontWeight: '600',
		paddingVertical: 20,
	},
});
export default SaleScreen;