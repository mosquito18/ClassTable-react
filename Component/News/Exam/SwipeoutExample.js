import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	Text,
	Platform,
	FlatList,
	ListView,
	TextInput,
	Image,
	View
} from 'react-native';
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');
import moment from 'moment';
import Swipeout from 'react-native-swipeout';
import Upadate from './Upadate.js';
import Util from '../../Common/util.js';
const colors = ['#b9d4ff', '#ecd1fe', '#d4ffe1'];
export default class SwipeoutExample extends Component {
	constructor(props) {
		super(props);
		var self = this;
		this.state = {
			data: [],
			index: null,
			contents: '',
			times: '',
			refreshing: false, //初始化不刷新
			text: '',//跳转的行
			day: moment().format('YYYY-MM-DD'),
			time: moment([2017, 8, 29]),
			obj: this.props.obj,
			isProps: true,
			rightBtn: [
				{
					text: '修改',
					onPress: self._loadPage.bind(self),
					type: 'secondary',
				},
				{
					text: '删除',
					onPress: self._fetchDeleteData.bind(self),
					type: 'delete',
				}
			]
		};
	}
	_loadPage() {
		//解构 与 模式匹配
		let self = this;
		this.props.navigation.navigate('Upadate', {
			times: this.state.times,
			contents: this.state.contents,
			index: this.state.index,
			onCallBack: (obj) => {
				this.setState({
					obj: obj,
					isProps: false,
				})
				self.props.callbackParent(self.state.obj);
			}
		})
		// let { navigator } = this.props;
		// if (navigator) {
		//   navigator.push({
		//     name: 'update',
		//     component: Upadate,
		//     params: {
		//       times: this.state.times,
		//       contents:this.state.contents,
		//       index:this.state.index,
		//       onCallBack:(obj)=>{
		//           this.setState({
		//               obj:obj,
		//               isProps:false,
		//           })
		//           self.props.callbackParent(self.state.obj);
		//       }
		//     }
		//   })
		// }
	}
	//此函数用于为给定的item生成一个不重复的key
	//若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
	_keyExtractor = (item, index) => index;
	_renderItem = ({ item, index }) => {
		// alert(item.fID);
		item.fRestTime = (moment(item.finalTime).diff(this.state.day) / 86400000);
		return (
			<Swipeout
				close={!(this.state.index === item.id)}
				right={this.state.rightBtn}
				style={styles.listview}
				onOpen={(index) => {
					this.setState({
						index: item.id,
						contents: item.fexamName,
						times: item.finalTime,
					})
				}}
			>
				<View style={[styles.wrap, { backgroundColor: colors[index % 3] }]}>
					<Text style={styles.content1}>{item.fexamName}</Text>
					<Text style={styles.content2}>{item.fRestTime}天</Text>
				</View>
			</Swipeout>
		);
	}

	componentWillMount() {
		this._fetchData();
	}

	render() {
		// alert(this.props.obj);
		return (
			<View style={styles.container}>
				{
					this.props.obj != '' && this.state.isProps ? <FlatList
						data={this.props.obj}
						//使用 ref 可以获取到相应的组件
						ref={(flatList) => this._flatList = flatList}
						keyExtractor={this._keyExtractor}
						//是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
						//如果你的行高是固定的，getItemLayout用起来就既高效又简单.
						//注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
						getItemLayout={(data, index) => ({ length: 44, offset: (44 + 1) * index, index })}
						renderItem={this._renderItem}
					/> :
						<FlatList
							data={this.state.obj}
							//使用 ref 可以获取到相应的组件
							ref={(flatList) => this._flatList = flatList}
							keyExtractor={this._keyExtractor}
							//是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
							//如果你的行高是固定的，getItemLayout用起来就既高效又简单.
							//注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
							getItemLayout={(data, index) => ({ length: 44, offset: (44 + 1) * index, index })}
							renderItem={this._renderItem}
						/>
				}
			</View>
		);
	}
	componentDidMount() {
		this._fetchData();
	}

	_fetchDeleteData() {
		var self = this;
		url = 'http://tree.luoyelusheng.cn/data/delete_examData?id=' + this.state.index;
		Util.get(url, function (data) {
			if (data.status) {
				let obj = data.info;
				self.setState({
					obj: obj,
					isProps: false,
				});
				self.props.callbackParent(self.state.obj);
			}

		}, function (err) {
			alert(err);
			alert('服务异常,正在紧急修复,请耐心等待4');
		});

	}

	_fetchData(callback) {
		var self = this;
		Util.get('http://tree.luoyelusheng.cn/data/read?type=examData', function (data) {
			if (data.status) {
				let obj = data.data;
				self.setState({
					obj: obj,
				});
				// alert(obj[0].fexamName);
			} else {
				alert('服务异常,正在紧急修复,请耐心等待');
			}

		}, function (err) {
			alert(err);
			alert('服务异常,正在紧急修复,请耐心等待3');
		});

	}


}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// height:50,
		backgroundColor: '#fff',
	},
	content1: {
		paddingLeft: 10,
		color: '#333',
		fontSize: 18,
	},
	content2: {
		// textAlign:'right',
		position: 'absolute',
		right: 10,
		color: '#333',
		fontSize: 16,
	},
	wrap: {
		height: 40,
		alignItems: 'center',
		flexDirection: 'row',
		// marginTop: 10,
		width: width * 0.9,
		// marginLeft: width * 0.05,
		backgroundColor: '#eee',
	},
	listview: {
		marginTop: 10,
		marginLeft: width * 0.05,
		height: 40,
		width: width * 0.9,
		flex: 1,
	},
	li: {
		backgroundColor: '#fff',
		borderBottomColor: '#eee',
		borderColor: 'transparent',
		borderWidth: 1,
		paddingLeft: 16,
		paddingTop: 14,
		paddingBottom: 16,
	},
	liContainer: {
		flex: 2,
	},
	liText: {
		color: '#333',
		fontSize: 16,
	},
	navbar: {
		alignItems: 'center',
		backgroundColor: '#fff',
		borderBottomColor: '#eee',
		borderColor: 'transparent',
		borderWidth: 1,
		justifyContent: 'center',
		// height: 44,
		height: 40,
	},
	navbarTitle: {
		color: '#444',
		fontSize: 16,
		fontWeight: "500",
	},
});