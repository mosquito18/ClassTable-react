import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	Text,
	Image,
	View,
} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../Common/util';
const window = Dimensions.get('window');
export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarSource: null,
			avatar: this.props.navigation.state.params.My.fImg,
			fName: this.props.navigation.state.params.My.fName,
		};
	}

	// static propTypes = {
	// 	onItemSelected: React.PropTypes.func.isRequired,
	// };// 注意这里有分号
	// selectPhotoTapped() {
	// 	const options = {
	// 		quality: 1.0,
	// 		maxWidth: 500,
	// 		maxHeight: 500,
	// 		storageOptions: {
	// 			skipBackup: true
	// 		}
	// 	};

	// 	ImagePicker.showImagePicker(options, (response) => {
	// 		console.log('Response = ', response);

	// 		if (response.didCancel) {
	// 			console.log('User cancelled photo picker');
	// 		}
	// 		else if (response.error) {
	// 			console.log('ImagePicker Error: ', response.error);
	// 		}
	// 		else if (response.customButton) {
	// 			console.log('User tapped custom button: ', response.customButton);
	// 		}
	// 		else {
	// 			let source = { uri: response.uri };

	// 			// You can also display the image using data:
	// 			// let source = { uri: 'data:image/jpeg;base64,' + response.data };

	// 			this.setState({
	// 				avatarSource: source
	// 			});
	// 		}
	// 	});
	// }
	// onPress={this.selectPhotoTapped.bind(this)}
	render() {
		return (

			<View>
				<View style={styles.avatarContainer}>
					<Image style={styles.avatarContainer}
						source={{ uri: this.state.avatar }}
					>
						<TouchableOpacity style={styles.avatarBox}>
							<Image
								style={styles.avatar}
								source={{ uri: this.state.avatar }}
							>
							</Image>
						</TouchableOpacity>
						<Text style={styles.avatarText}>{this.state.fName}</Text>
					</Image>
				</View>
			</View>

		);
	}
	// componentDidMount() {
	// 	this._fetchData();

	// }
	_fetchData(text) {
		var self = this;
		Util.get('http://tree.luoyelusheng.cn/data/read?type=friendData', function (data) {

			if (data.status) {
				let obj = data.data;
				for (var i = 0; i < obj.length; i++) {
					if (obj[i].id == this.props.navigation.state.params.My.id) {
						self.setState = {
							fName: obj[i].fName,
							avatar: obj[i].fImg,
						}
						break;
					}
				}
			}
		}, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待2');
        });

	}

}
const styles = StyleSheet.create({
	avatarContainer: {
		width: window.width * 2 / 3 + 20,
		height: window.width / 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#666',

	},
	avatarText: {
		fontSize: 14,
		fontWeight: '600',
		textAlign: 'center',
		color: '#fff',
		backgroundColor: 'transparent'
	},
	avatar: {
		marginBottom: 10,
		width: window.width * 0.2,
		height: window.width * 0.2,
		borderRadius: window.width * 0.1,
		borderWidth: 1,
		borderColor: 'white',
		resizeMode: 'cover',
	},

	avatarBox: {
		marginTop: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},


});