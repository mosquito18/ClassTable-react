import { GiftedChat } from 'react-native-gifted-chat';
import React, { Component } from 'react';
export default class Example extends Component {
	constructor(props) {
		super(props);
		this.state = {
			messages: [],
		};
	}


	componentWillMount() {
		if (this.props.navigation.state.params.item.fName) {
			this.setState({
				messages: [
					{
						_id: 1,
						text: 'Hello~',
						createdAt: new Date(),
						user: {
							_id: this.props.navigation.state.params.item.id,
							name: this.props.navigation.state.params.item.fName,
							avatar: this.props.navigation.state.params.item.fImg,
						},
					},
				],
			});
		} else {
			this.setState({
				messages: [
					{
						_id: 1,
						text: 'Hello~',
						createdAt: new Date(),
						user: {
							_id: this.props.navigation.state.params.item.id,
							name: this.props.navigation.state.params.item.title,
							avatar: this.props.navigation.state.params.item.img,
						},
					},
				],
			});
		}

	}

	onSend(messages = []) {
		this.props.callbackParent(messages[0].text);
		this.setState((previousState) => ({
			messages: GiftedChat.append(previousState.messages, messages),
		}));
		console.log(this.state.messages);
	}

	render() {
		return (
			<GiftedChat
				messages={this.state.messages}
				onSend={(messages) => this.onSend(messages)}
				user={{
					_id: 1,
				}}
			/>
		);
	}

}