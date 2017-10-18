import React, { Component } from 'react';
import {
	AppRegistry,
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	Switch,
	Image,
	Button,
	ScrollView,
} from 'react-native';
const { width, height } = Dimensions.get('window');
import Dimensions from 'Dimensions';
import { DrawerNavigator, DrawerItems, } from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from './Component/Common/util';
/*
 * Drawer
*/
import MyNoteScreen from './Component/My/MyNote/MyNote';
import ResetScreen from './Component/My/Reset/Reset';
import PersonMessageScreen from './Component/My/PersonMessage/PersonMessage';


/*
 * TabBar
*/
import { StackNavigator, TabNavigator } from 'react-navigation';
import Classes from './Component/Classes/Classes';
import Comment from './Component/Comment/Comment';
import Friend from './Component/Friend/Friend';
import News from './Component/News/News';

/*
 * Friend
*/
import AddFriend from './Component/Friend/AddFriend/addFriend';
import CheckFriend from './Component/Friend/FriendChat/CheckFriend';
import DetailMessage from './Component/Friend/AddFriend/detailMessage.js';
import ChatFriendReset from './Component/Friend/FriendChat/chatFriendReset.js';
import FriendChat from './Component/Friend/FriendChat/FriendChat.js';
import MyComponent from './Component/Friend/FriendChat/list.js';
import GoodFriendMessage from './Component/Friend/FriendChat/goodFriendMessage.js';
import ChatReset from './Component/Friend/QunChat/chatReset.js';
import QunChat from './Component/Friend/QunChat/QunChat.js';

/*
 * Classes
*/
import AddNote from './Component/Classes/AddNote/addNote.js';
import CengClass from './Component/Classes/Model/cengClass.js';
import DIYClass from './Component/Classes/Model/DIYClass.js';
import SchoolImport from './Component/Classes/Model/schoolImport.js';
import ClassMessage from './Component/Classes/classMessage.js';

/*
 * Comment
*/
import Detail from './Component/Comment/detail';

/*
 * News
*/
import ExamDaoJiShi from './Component/News/Exam/ExamDaoJiShi.js';
import AddExam from './Component/News/Exam/AddExam.js';
import Upadate from './Component/News/Exam/Upadate.js';
import Note from './Component/News/Note/Note.js';
import CETCheck from './Component/News/CheckExam/CETCheck.js';
import SchoolCheck from './Component/News/CheckExam/SchoolCheck.js';
import CheckExam from './Component/News/CheckExam/CheckExam.js';
import List from './Component/News/List/lists.js';
import Details from './Component/News/List/details.js';
import ReadList from './Component/News/Read/ReadList.js';
import ReadContent from './Component/News/Read/ReadContent.js';
/*
 * My
*/
import EditPerson from './Component/My/PersonMessage/editPerson';

/*
 * tabNavigator
 * 
*/


const AppTabNav = TabNavigator({

	News: {
		screen: News,
		navigationOptions: ({ navigation }) => ({
			drawerLabel: () => (
				<View style={styles.row1}><Text style={styles.rowText1}>首页</Text></View>
			),
			drawerIcon: () => (
				<Icon name='ios-home-outline'
					style={styles.backIconB}
				/>
			),
			tabBarLabel: '推荐',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='md-star-outline'
					style={[{ color: tintColor }, styles.backIconS]}
				/>
			),
		}),
	},
	Comment: {
		screen: Comment,
		navigationOptions: ({ navigation }) => ({
			drawerLabel: () => (
				<View style={styles.row1}><Text style={styles.rowText1}>首页</Text></View>
			),
			drawerIcon: () => (
				<Icon name='ios-home-outline'
					style={styles.backIconB}
				/>
			),
			tabBarLabel: '树洞',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='ios-brush'
					style={[{ color: tintColor }, styles.backIconS]}
				/>
			),
		}),
	},
	Classes: {
		screen: Classes,
		navigationOptions: ({ navigation }) => ({
			drawerLabel: () => (
				<View style={styles.row1}><Text style={styles.rowText1}>首页</Text></View>
			),
			drawerIcon: () => (
				<Icon name='ios-home-outline'
					style={styles.backIconB}
				/>
			),
			tabBarLabel: '课程表',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='md-grid'
					style={[{ color: tintColor }, styles.backIconS]}
				/>
			),
		}),
	},
	Friend: {
		screen: Friend,
		navigationOptions: ({ navigation }) => ({
			drawerLabel: () => (
				<View style={styles.row1}><Text style={styles.rowText1}>首页</Text></View>
			),
			drawerIcon: () => (
				<Icon name='ios-home-outline'
					style={styles.backIconB}
				/>
			),
			tabBarLabel: '小纸条',
			tabBarIcon: ({ tintColor }) => (
				<Icon name='md-chatboxes'
					style={[{ color: tintColor }, styles.backIconS]}
				/>
			),
		}),
	},
}, {
		initialRouteName: 'News',
		animationEnabled: false, // 切换页面时不显示动画 
		tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的 
		swipeEnabled: true, // 禁止左右滑动 
		backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转 
		tabBarOptions: {
			activeTintColor: '#00b3ca', // 文字和图片选中颜色 
			inactiveTintColor: '#999', // 文字和图片默认颜色 
			showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示 
			indicatorStyle: { height: 0 }, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？ 
			style: {
				backgroundColor: '#fff',
				height: 48, // TabBar 背景色 
				justifyContent: 'center',
			},
			labelStyle: {
				marginTop: -3,
				fontSize: 14, // 文字大小 
			},
		},

	});

const AppStack = StackNavigator({
	AppTabNav: { screen: AppTabNav },
	//Friend
	MyComponent: { screen: MyComponent },
	AddFriend: { screen: AddFriend },
	CheckFriend: { screen: CheckFriend },
	DetailMessage: { screen: DetailMessage },
	ChatFriendReset: { screen: ChatFriendReset },
	FriendChat: { screen: FriendChat },
	GoodFriendMessage: { screen: GoodFriendMessage },
	ChatReset: { screen: ChatReset },
	QunChat: { screen: QunChat },

	//Classes
	AddNote: { screen: AddNote },
	CengClass: { screen: CengClass },
	DIYClass: { screen: DIYClass },
	SchoolImport: { screen: SchoolImport },
	ClassMessage: { screen: ClassMessage },

	//Comment
	Detail: { screen: Detail },

	//News
	ExamDaoJiShi: { screen: ExamDaoJiShi },
	AddExam: { screen: AddExam },
	Upadate: { screen: Upadate },
	Note: { screen: Note },
	CheckExam: { screen: CheckExam },
	CETCheck: { screen: CETCheck },
	SchoolCheck: { screen: SchoolCheck },
	List:{screen:List},
	Details:{screen:Details},
	ReadContent:{ screen: ReadContent },
	ReadList:{ screen: ReadList },
	//My
	EditPerson: { screen: EditPerson },

}, {
		initialRouteName: 'AppTabNav', // 默认显示界面
		navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
			header: {  // 导航栏相关设置项

				visible: true,
			},
			drawerLabel: () => (
				<View style={styles.row1}><Text style={styles.rowText1}>首页</Text></View>
			),
			drawerIcon: () => (
				<Icon name='ios-home-outline'
					style={styles.backIconB}
				/>
			),
		},
		mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
		headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
		onTransitionStart: () => { console.log('导航栏切换开始'); },  // 回调
		onTransitionEnd: () => { console.log('导航栏切换结束'); }  // 回调
	});




class Switchs extends Component {
	state = {
		value: false,
	}
	render() {
		return (
			<View
				style={styles.row}>
				<Icon name='ios-stopwatch-outline'
					style={styles.backIcon}
				/>
				<Text style={styles.rowText}>提醒开关</Text>
				<Switch
					style={styles.btnSwitch}
					value={this.state.value}
					onValueChange={(value) => {
						this.setState({
							value: value,
						});


					}} />
			</View>
		)
	}
}


import Qiniu, { Auth, ImgOps, Conf, Rs, Rpc } from 'react-native-qiniu';
let pickPhotoOptions = {
	title: '选择头像',
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照',
	chooseFromLibraryButtonTitle: '从相册...',
	quality: 0.8,
	allowsEditing: true,
	noData: false,
	storageOptions: {
		skipBackup: true,
		path: 'images'
	}
};
class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarSource: null,
			info: '',
			uri: '',
			obj:'',
			fImg:this.props.navigation.state.params.My.fImg,
			fName: this.props.navigation.state.params.My.fName,
			id: this.props.navigation.state.params.My.id,
		};
	}
	// static propTypes = {
	// 	onItemSelected: React.PropTypes.func.isRequired,
	// };// 注意这里有分号
	selectPhotoTapped() {
		const options = {
			quality: 1.0,
			maxWidth: 500,
			maxHeight: 500,
			storageOptions: {
				skipBackup: true
			}
		};

		ImagePicker.showImagePicker(pickPhotoOptions, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled photo picker');
			}
			else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				let source = { uri: response.uri };

				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };
				// let uri='data:image/jpeg;base64,' + response.data;
				let uri = response.uri;
				this.setState({
					avatarSource: source,
					uri: uri
				});
				var key = uri;
				// var key = new Date();
				Conf.ACCESS_KEY = 'BSi8Sd386VY3LO5itsbvm8geehWkLcGIpK7RxEeU';
				Conf.SECRET_KEY = 'ghSlX7iNRrThCXv9kVz_8BogOb4JT-lyXEYFqSeg';
				// var putPolicy = new Auth.PutPolicy2(
				//     { scope: "myavatar:" + key }
				// );
				// var uptoken = putPolicy.token();
				var avatar = this.state.fImg;
				var uptoken = 'BSi8Sd386VY3LO5itsbvm8geehWkLcGIpK7RxEeU:-Fh0goh8xCbVyJnxF8GvSBDGabY=:eyJzY29wZSI6Im15YXZhdGFyIiwiZGVhZGxpbmUiOjE4MDM3MTgxNTl9';
				let formInput = {
					key: key,
				}
				Rpc.uploadFile(uri, uptoken, formInput, function (resp) {
					//   alert("上传成功");
					avatar = 'http://ov6od9t69.bkt.clouddn.com/' + key;
					console.log(JSON.stringify(resp));
				}).then((e) => {
					// alert("成功")
					console.log(e)
				}).catch((e) => {
					//   alert("失败")
					console.log(e)
				});
				
					avatar = 'http://ov6od9t69.bkt.clouddn.com/' + key;
				this._fetchData(avatar);


			}
		});
	}

    // componentDidMount() {
    //     var self = this;
	// 	var i=0;
    //     this.timer = setTimeout(function () {
    //         self._fetchObjData();
    //     }, 200);

    // }

    // componentWillUnmount() {
    //     // 请注意Un"m"ount的m是小写

    //     // 如果存在this.timer，则使用clearTimeout清空。
    //     // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
    //     this.timer && clearTimeout(this.timer);
    // }





    // _fetchObjData() {
    //     var self = this;
    //     Util.get('http://192.168.1.110:3000/data/read?type=friendData', function (data) {
    //         if (data.status) {
    //             let obj = data.data;
    //             for (var i = 0; i < obj.length; i++) {
    //                 if (obj[i].id == self.props.navigation.state.params.My.id) {
    //                     self.setState({
    //                         obj: obj[i],
    //                     });
    //                     break;
    //                 }
    //             }

    //         } else {
    //             alert('服务异常,正在紧急修复,请耐心等待');
    //         }

    //     }, function (err) {
    //         alert(err);
    //         alert('服务异常,正在紧急修复,请耐心等待2');
    //     });

    // }
	_fetchData(avatar) {
		
		var self = this;
		// alert(avatar);
		url = 'http://192.168.1.110:3000/data/update_My_friendData?id=' + self.state.id + '&fImg=' + avatar,
			Util.get(url, function (data) {

			}, function (err) {
				alert(err);
				alert('服务异常,正在紧急修复,请耐心等待5');
			});

	}


	render() {
		// alert(this.props.navigation.state.params.My.id);
		return (
			<View>
				{this.state.avatarSource === null ?
					<View style={styles.avatarContainer}>

						<Image style={styles.avatarContainer}
							source={{ uri: this.state.fImg }}
						>
							<TouchableOpacity style={styles.avatarBox}
								onPress={this.selectPhotoTapped.bind(this)}>
								<Image
									style={styles.avatar}
									source={{ uri: this.state.fImg }}
								>
								</Image>
							</TouchableOpacity>
							<Text style={styles.avatarText}>{this.state.fName}</Text>
						</Image>
					</View>
					:
					<View style={styles.avatarContainer}>
						<Image style={styles.avatarContainer}
							source={this.state.avatarSource}
						>
							<TouchableOpacity style={styles.avatarBox}
								onPress={this.selectPhotoTapped.bind(this)}>
								<Image
									style={styles.avatar}
									source={this.state.avatarSource}
								>
								</Image>
							</TouchableOpacity>
							<Text style={styles.avatarText}>{this.state.fName}</Text>
						</Image>
					</View>
				}
			</View>

		);
	}

}


class Exit extends Component {
	render() {
		return (
			<TouchableOpacity style={styles.exitWrap}>
				<Text style={styles.exitText}>退出登陆</Text>
			</TouchableOpacity>
		)
	}
}
const Index = DrawerNavigator(
	{
		AppStack: {
			screen: AppStack,
		},
		PersonMessageScreen: {
			screen: PersonMessageScreen,
		},
		MyNoteScreen: {
			screen: MyNoteScreen,
		},
		ResetScreen: {
			screen: ResetScreen,
		},

	}, {
		drawerWidth: width * 2 / 3, // 抽屉宽
		drawerPosition: 'left', // 抽屉在左边还是右边
		// contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
		contentOptions: {
			initialRouteName: 'AppStack', // 默认页面组件
			activeItemKey: 'AppStack',
			labelStyle: {//标签样式
				// color : 'red',
				fontSize: 17,
				//  height : 30,
			},
			activeTintColor: 'white',  // 选中文字颜色
			activeBackgroundColor: '#00b3ca', // 选中背景颜色
			// inactiveTintColor: '#666',  // 未选中文字颜色
			inactiveBackgroundColor: '#fff', // 未选中背景颜色
			style: {  // 样式
				marginVertical: 0,
				backgroundColor: '#f9f9fb'
			},
			//没有作用
			onItemPress: (route) => {
				console.log('-------->' + JSON.stringify(route))
			},

		},

		contentComponent: props => {
			return (
				<ScrollView>
					<View>
						<Menu {...props}/>
						<DrawerItems {...props} />
						<Switchs />
						<Exit />
					</View>
				</ScrollView>

			)
		},
	});

const styles = StyleSheet.create({
	backIcon: {
		fontSize: 27,
	},
	backIconB: {
		fontSize: 30,
	},
	backIconS: {
		marginTop: -3,
		// padding:0,
		fontSize: 25,
	},
	row1: {
		height: 40,
		justifyContent: 'center',
		// marginBottom:1,
	},
	rowText1: {
		fontSize: 17,
	},
	icon: {
		width: 24,
		height: 24,
	},
	row: {
		height: 40,
		paddingLeft: 18,
		flexDirection: 'row',
		alignItems: 'center',

	},
	rowText: {
		fontSize: 17,
		marginLeft: 20,
	},
	btnSwitch: {
		position: 'absolute',
		right: 15,
	},
	exitWrap: {
		width: width / 2,
		borderRadius: 15,
		backgroundColor: '#00b3ca',
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: (width * 2 / 3 - width / 2) / 2,
		marginTop: height / 5,
	},
	exitText: {
		color: '#fff',
		fontSize: 16,
	},
		avatarContainer: {
		width: width * 2 / 3 + 20,
		height: width / 2,
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
		width: width * 0.2,
		height: width * 0.2,
		borderRadius: width * 0.1,
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

export default Index;