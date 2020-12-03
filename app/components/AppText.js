import React, { Children } from 'react';
import { Text, view, StyleSheet, Platform } from 'react-native';
import colors from '../config/colors';
function AppText({ children, style }) {
	return <Text style={[styles.text, style]}>{children}</Text>;
}
Platform.select({
	ios: { fontSize: 18, fontFamily: 'Avenir' },
	android: { fontSize: 20, fontFamily: 'Roboto' },
});
const styles = StyleSheet.create({
	text: {
		color: colors.black,
		...Platform.select({
			ios: { fontSize: 18, fontFamily: 'Avenir' },
			android: { fontSize: 20, fontFamily: 'Roboto' },
		}),
	},
});
export default AppText;
