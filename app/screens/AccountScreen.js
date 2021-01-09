import React from 'react';
import ListItem from '../components/ListItem';
import Screen from '../components/Screen';
import { StyleSheet, View, FlatList } from 'react-native';
import Icon from '../components/Icon';
import colors from '../config/colors';
import ListItemSeparator from '../components/ListItemSeparator';
import useAuth from '../auth/useAuth';

const menuItems = [
	{
		title: 'My Products',
		icon: {
			name: 'format-list-bulleted',
			backgroundColor: colors.primary,
		},
		targetScreen:"Messages"
	}
];
function AccountScreen({navigation}) {
	
  const {user,logOut} = useAuth()


	return (
		<Screen style={styles.screen}>
			<View style={styles.container}>
				<ListItem
					title={user.name}
					subTitle={user.phone}
					image={require('../assets/image_3.png')}
				/>
			</View>
			<View style={styles.container}>
				<FlatList
					data={menuItems}
					keyExtractor={(menuitem) => menuitem.title}
					ItemSeparatorComponent={ListItemSeparator}
					renderItem={({ item }) => (
						<ListItem
							title={item.title}
							IconComponent={
								<Icon
									name={item.icon.name}
									backgroundColor={item.icon.backgroundColor}
								/>
							}
							onPress={() =>navigation.navigate(item.targetScreen)}
						/>
					)}
				/>
			</View>
			<ListItem
				title='Log Out'
				onPress={() =>logOut()} 
				IconComponent={<Icon name='logout' backgroundColor='#ffe66d'
				/>}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({
	screen: { backgroundColor: colors.light },
	container: {
		marginVertical: 20,
	},
});
export default AccountScreen;
