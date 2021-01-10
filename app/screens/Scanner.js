import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, Modal} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import routes from '../navigation/routes'
export default function Scanner({navigation}) { 
 
        const [visible, setVisible] = useState(true) 
        const [hasPermission, setHasPermission] = useState(null);
        const [scanned, setScanned] = useState(false);
      
        useEffect(() => {
          (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
          })();
        }, []);
      
        const handleBarCodeScanned = ({ type, data }) => {
          setScanned(true);
          Alert.alert('Product',`Bar code with type ${type} and data ${data} has been scanned!`,
          [
              {text:'proceed to adding a product',onPress:() =>navigation.navigate(routes.LISTINGS_EDIT,{barcode:data})},
              {text:'Go back',onPress:() =>navigation.navigate(routes.SALE)}
            ])
          setVisible(false)
        
        
        };
      
        if (hasPermission === null) {
          return <Text>Requesting for camera permission</Text>;
        }
        if (hasPermission === false) {
          return <Text>No access to camera</Text>;
        }
      
        return (
        <Modal visible={visible}>
             <View style={styles.container}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
          </View>
        </Modal>
        );
      }
      
      const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        },
      });
      