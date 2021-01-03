import React from 'react'
import { createStackNavigator } from "@react-navigation/stack"
import ListingsScreen from '../screens/ListingsScreen'
import ListingDetailsScreen from '../screens/ListingDetailsScreen'
import SaleScreen from '../screens/SaleScreen'
import BarCodeScreen from "../screens/BarCodeScreen";
import CheckOutScreen from "../screens/CheckOutScreen";
import Scanner from '../screens/Scanner'



const Stack = createStackNavigator()
const FeedNavigator = () =>
(
    <Stack.Navigator mode="modal" screenOptions={{headerShown:false}}>
        <Stack.Screen name="Listings" component={ListingsScreen}/>
        <Stack.Screen name="ListingDetails" component={ListingDetailsScreen}/>
        <Stack.Screen name="Sale" component={SaleScreen}/>
        <Stack.Screen name="Barcode" component={BarCodeScreen}/>
        <Stack.Screen name="Checkout" component={CheckOutScreen}/>
        <Stack.Screen name="Scanner" component={Scanner}/>
    </Stack.Navigator>
)
export default FeedNavigator