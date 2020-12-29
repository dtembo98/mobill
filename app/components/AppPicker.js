import { Picker } from '@react-native-picker/picker'
import React,{useState} from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TextInput, StyleSheet, Platform, View, TouchableWithoutFeedback, Modal, Button, FlatList } from 'react-native';
import colors from '../config/colors'
import defaultStyles from '../config/styles'
import AppText from './AppText';
import Screen from './Screen'
import PickerItem from './PickerItem';
import CategoryPickerItem from './CategoryPickerItem';


function AppPicker({ icon,items, placeholder,onSelectItem,selectedItem,width="100%" ,numberOfColumns =1,PickerItemComponent = PickerItem}) {
    const [modalVisible,setModalVisible] = useState(false)
    return (
        <>
        
        <TouchableWithoutFeedback onPress={() =>setModalVisible(true)}>
        <View style={[styles.container,{width}]}>
            {icon && <MaterialCommunityIcons
             name={icon} 
             size={20} 
             color={defaultStyles.colors.medium} 
             style={styles.icon} />} 
             {selectedItem? <AppText style={styles.text}>{selectedItem.label}</AppText>:<AppText style={styles.placeholder}>{placeholder}</AppText>}
           
            <MaterialCommunityIcons 
            name="chevron-down" size={20} 
            color={defaultStyles.colors.medium} 
            style={styles.icon} />
        </View>
        </TouchableWithoutFeedback>
        <Modal visible ={modalVisible} animationType="slide">
         
         <Button title="Close" onPress={() =>setModalVisible(false)}/>
         <FlatList
         data={items} 
         numColumns={numberOfColumns}
         keyExtractor={item =>item.value.toString() }
         renderItem={({item}) =><PickerItemComponent 
         item={item}
         label={item.label} 
         onPress={() =>{
             console.log("hello")
            setModalVisible(false)
            onSelectItem(item)
            console.log(item)
         }}/>}/>
         
        </Modal>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: defaultStyles.colors.light,
        borderRadius: 25,
        flexDirection: "row",
        padding: 15,
        marginVertical: 10
    },
    icon: {
        marginRight: 10
    },
    placeholder:{
        color:defaultStyles.colors.medium,
        flex:1
    },
    text:{
        flex:1
    }
})
export default AppPicker;