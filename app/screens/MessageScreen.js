import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import Screen from '../components/Screen';
import ListItem from '../components/ListItem';
import ListItemSeparator from '../components/ListItemSeparator';
import ListItemDeleteAction from '../components/ListItemDeleteAction';

const initialMessages = [
	{
		id: 1,
		title: 'Alcohol',
		description: 'D1',
		image: require('../assets/prod_5.jpg'),
	},
	{
		id: 2,
		title: 'water',
		description: 'D2',
		image: require('../assets/prod_3.jpg'),
	},
];

function MessageScreen(props) {
	const [messages, setMessages] = useState(initialMessages);
	const [refreshing, setRefreshing] = useState(false);
	const handleDelete = (message) => {
		setMessages(messages.filter((m) => m.id !== message.id));
	};

	return (
		<Screen>
			<FlatList
				data={messages}
				keyExtractor={(message) => message.id.toString()}
				renderItem={({ item }) => (
					<ListItem
						title={item.title}
						subTitle={item.description}
						image={item.image}
						onPress={() => console.log('hi')}
						rightActions={() => (
							<ListItemDeleteAction
								onPress={() => handleDelete(item)}
							/>
						)}
					/>
				)}
				ItemSeparatorComponent={() => <ListItemSeparator />}
				refreshing={refreshing}
				onRefresh={() =>
					setMessages([
						{
							id: 3,
							title: 'beer',
							description: 'D2',
							image: require('../assets/prod_3.jpg'),
						},
					])
				}
			/>
		</Screen>
	);
}

const styles = StyleSheet.create({});
export default MessageScreen;
