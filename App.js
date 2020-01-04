/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import codePush from 'react-native-code-push';

import Crashes, { UserConfirmation, ErrorAttachmentLog } from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
	android:
		'Double tap R on your keyboard to reload,\n' +
		'Shake or press menu button for dev menu',
});

class App extends Component {
	onPressTouch() {
		Crashes.setListener({
			getErrorAttachments(report) {
				return (async () => {
					const textContent = await readTextFileAsync(); // use your async function to read text file
					const binaryContent = await readBinaryFileAsync(); // use your async function to read binary file
					const textAttachment = ErrorAttachmentLog.attachmentWithText(textContent, 'hello.txt');
					const binaryAttachment = ErrorAttachmentLog.attachmentWithBinary(binaryContent, 'logo.png', 'image/png');
					return [textAttachment, binaryAttachment];
				})();
			}
		});
		Crashes.notifyUserConfirmation(UserConfirmation.ALWAYS_SEND);
		Crashes.setListener({
			getErrorAttachments(report) {
				const textAttachment = ErrorAttachmentLog.attachmentWithText('Hello text attachment!', 'hello.txt');
				const binaryAttachment = ErrorAttachmentLog.attachmentWithBinary(`${imageAsBase64string}`, 'logo.png', 'image/png');
				return [textAttachment, binaryAttachment];
			}
		});

		throw new Error('This is a test javascript crash!');
	}

	onPressAnalytics() {
		Analytics.trackEvent('Analytics clicked');
	}

	onPressCrash() {
		Crashes.generateTestCrash();
		Crashes.notifyUserConfirmation(UserConfirmation.ALWAYS_SEND);
		Crashes.setListener({
			getErrorAttachments(report) {
				const textAttachment = ErrorAttachmentLog.attachmentWithText('Hello text attachment!', 'hello.txt');
				const binaryAttachment = ErrorAttachmentLog.attachmentWithBinary(`${imageAsBase64string}`, 'logo.png', 'image/png');
				return [textAttachment, binaryAttachment];
			}
		});
	}

	onPressCrash1(number){
		this.setState({ number: number + 1 });
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Welcome to React Native 0.58.6!</Text>
				<Text style={styles.instructions}>To get started, edit App.js</Text>
				<Text style={styles.instructions}>{instructions}</Text>
				<TouchableOpacity onPress={() => this.onPressTouch()}>
					<Text>Error</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.onPressAnalytics()}>
					<Text>Analytics</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.onPressCrash()}>
					<Text>Crashes</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.onPressCrash1()}>
					<Text>Crashes 1</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const MainView = codePush({
	installMode: codePush.InstallMode.IMMEDIATE,
	updateDialog: {
		optionalUpdateMessage: "Sửa lỗi và cải thiện hiệu năng!",
		optionalInstallButtonLabel: "Cập nhật ngay",
		optionalIgnoreButtonLabel: "Để sau",
		title: "Vui lòng tải bản cập nhật mới!"
	}
})(App);

export default MainView;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
