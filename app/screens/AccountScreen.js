import React from 'react';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import { StyleSheet, View, FlatList } from 'react-native';
import Icon from "../components/Icon";
import colors from '../config/colors';
const menuItems = [
	{
		title: 'My Listings',
		icon: {
			name: 'format-list-bulleted',
			backgroundColor: colors.primary,
		},
	},
	{
		title: 'My Messages',
		icon: {
			name: 'format-list-bulleted',
			backgroundColor: colors.secondary,
		},
	},
];
function AccountScreen(props) {
	return (
		<Screen>
			<View style={styles.container}>
				<ListItem
					title='David Tembo'
					subTitle='davidtembo51@gmail.com'
					image={require('../assets/image_3.png')}
				/>
			</View>
			<View style={styles.container}>
				<FlatList 
				data={menuItems}
				keyExtractor = {menuitem => menuitem.title}
				renderItem = {({item}) =>
			<ListItem
			title = {item.title}
			ImageComponent = {
				<Icon name={item.icon.name} backgroundColor={item.icon.backgroundColor} />
			}
			/>}
				 />
			</View>
		</Screen>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 20,
	},
});
export default AccountScreen;
