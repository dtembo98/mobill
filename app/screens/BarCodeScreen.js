import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import routes from '../navigation/routes'
import listingsApi from '../api/listings'

export default function BarCodeScreen({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    const results = await listingsApi.getProduct(data)
    if(!results.ok)
    { 
     return alert(`${results.data.error}`)
    }
    const  product = results.data.data
    Alert.alert('Product',`product with the details found 
    Title: ${product.title}
    Barcode: ${product.barcode}
    Price: ${product.price}
    `,
              [
                  {text:'continue to check out',onPress:() =>navigation.navigate(routes.CHECKOUT,{product})},
                  {text:'No'}
                ])
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
