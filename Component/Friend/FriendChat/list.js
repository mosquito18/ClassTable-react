import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
	FlatList,
	Image,
	Button,
	View,
	Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../../Common/util.js';
import AlphabetListView from 'react-native-alphabetlistview';
// import FriendChat from './FriendChat.js';
class SectionHeader extends Component {
	render() {
		// inline styles used for brevity, use a stylesheet when possible
		var textStyle = {
			textAlign: 'left',
			color: '#000',
			fontWeight: '700',
			fontSize: 16,
			paddingLeft: 15,
		};

		var viewStyle = {
			backgroundColor: '#fff'
		};
		return (
			<View style={viewStyle}>
				<Text style={textStyle}>{this.props.title}</Text>
			</View>
		);
	}
}

class SectionItem extends Component {
	render() {
		return (
			<Text style={{ color: '#000'}}>{this.props.title}</Text>
		);
	}
}

export default class MyComponent extends Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			datas: [],
		};
	}
	_renderItem = ({ item }) => {
		return (
			<TouchableOpacity
				onPress={() => this.props.navigation.navigate('GoodFriendMessage', { item: item})}>
				<View style={styles.itemView}>
					<Image style={{ width: 30, height: 30 }} source={{ uri: item.fImg }} />
					<Text style={{ marginLeft: 30, fontSize: 16, color: '#333' }}>
						{item.fName}
					</Text>
				</View>
			</TouchableOpacity>
		);
	}
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity
						style={styles.backBox}
						onPress={() => { this.props.navigation.goBack() }}
					>
						<Icon name='ios-arrow-back'
							style={styles.backIcon}
						/>
					</TouchableOpacity>
					<Text style={styles.headerText}>
						联系人
                    </Text>
					<TouchableOpacity style={styles.headerEdit}
						onPress={() => this.props.navigation.navigate('CheckFriend')}>
						<Icon name='md-search'
							size={28}
							style={{ color: '#fff' }}
						/>
					</TouchableOpacity>
				</View>
				<AlphabetListView
					data={this.state.datas}
					cell={this._renderItem}
					cellHeight={51}
					sectionListItem={SectionItem}
					sectionHeader={SectionHeader}
					sectionHeaderHeight={22.5}
					enableEmptySections={true}

				/>
			</View>

		);
	}
	componentDidMount() {
		this._fetchData();

	}
	_fetchData() {
		var self = this;
		Util.get('http://tree.luoyelusheng.cn/data/read?type=peopleData', function (data) {
			if (data.status) {
				let obj = data.data;
				self.setState({
					datas: obj,
				});
				// alert(self.state.hotTopic[0].English);
			} else {
				alert('服务异常,正在紧急修复,请耐心等待');
			}

		}, function (err) {
			alert(err);
			alert('服务异常,正在紧急修复,请耐心等待2');
		});

	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#dedfe1',
	},
	header: {
		marginTop: Platform.OS === 'ios' ? 20 : 0,
		paddingTop: 12,
		paddingBottom: 12,
		height: 48,
		backgroundColor: '#00b3ca',
		flexDirection: 'row',
		paddingLeft: 10,
	},
	headerEdit: {
		position: 'absolute',
		right: 15,
		top: 12,
	},
	itemView: {
		backgroundColor: '#fff',
		flexDirection: 'row',
		padding: 12,
		alignItems: 'center',
		marginBottom: 1,
		height: 50,
	},
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        position: 'absolute',
        left: 40,
        top: 12,
    },
    backBox: {
        position: 'absolute',
        left: 0,
        top: 12,
        width:40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor:'yellow',
    },
	backIcon: {
		color: '#fff',
		fontSize: 28,
		//marginRight:10
	},
});