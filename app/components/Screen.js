import React, { Children } from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, View } from 'react-native';
function Screen({ children }) {
	return (
		<SafeAreaView style={styles.Screen}>
			<View>{children}</View>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	Screen: {
		paddingTop: Constants.statusBarHeight,
		flex: 1,
	},
});

export default Screen;
