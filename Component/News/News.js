import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	TouchableOpacity,
	ActivityIndicator,
	Text,
	FlatList,
	Platform,
	ListView,
	ScrollView,
	TextInput,
	Image,
	View
} from 'react-native';
import moment from 'moment';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import FlatListDemo from './FlatListDemo.js';
import NewNoteDemo from './Note/newNoteDemo.js';
import Util from '../Common/util.js';
import Swipers from './Swiper';
const colors = ['#b9d4ff', '#ecd1fe', '#d4ffe1'];
export default class News extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			refreshing: false, //初始化不刷新
			text: '',//跳转的行
			day: moment().format('YYYY-MM-DD'),
			weekend: null,
			weekDay: null,
			recommendTopic: null,
			hotTopic: [],
			English: null,
			classData: null,
			isShow: false,
			objs: '',
		};
		this._fetchClassData();

	}
	//此函数用于为给定的item生成一个不重复的key
	//若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标index。
	_keyExtractor = (item, index) => index;
	_renderItem = ({ item, index }) => {
		item.fRestTime = (moment(item.finalTime).diff(this.state.day) / 86400000);
		if (item.fweek === this.state.weekDay) {
			return (
				<View style={[styles.wrap, { backgroundColor: colors[index % 3] }]}>
					<Text style={styles.content1} numberOfLines={1}>{item.fclassName}</Text>
					<Text style={styles.content2}>第{item.fClasstime}节</Text>
				</View>
			);
		}

	}

	render() {
		// alert(this.props.navigation.state.params.MyID);
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Image style={styles.headerImg} source={require('../../img/logo.png')} />
					<Text style={styles.headerText}>
						推荐
          </Text>
				</View>
				<ScrollView>
					<View>
						<Swipers />
						<View style={styles.shareAllWrap} >
							<View style={styles.shareWrap}>
								<TouchableOpacity style={styles.shareBtn} onPress={() => this.props.navigation.navigate('ReadList')}>
									<Image style={styles.shareImg} source={require('../../img/meirihaowu.png')} />
								</TouchableOpacity>
								<Text style={styles.shareText}>每日好文</Text>
							</View>
							<View style={styles.shareWrap}>
								<TouchableOpacity style={styles.shareBtn} onPress={() => this.props.navigation.navigate('CheckExam')}>
									<Image style={styles.shareImg} source={require('../../img/chengjichaxun.png')} />
								</TouchableOpacity>
								<Text style={styles.shareText}>成绩查询</Text>
							</View>
							<View style={styles.shareWrap}>
								<TouchableOpacity style={styles.shareBtn} onPress={() => this.props.navigation.navigate('List')}>
									<Image style={styles.shareImg} source={require('../../img/bijifenxiang.png')} />
								</TouchableOpacity>
								<Text style={styles.shareText}>视频推荐</Text>
							</View>
						</View>
					</View>


					<View style={styles.NewsWrap}>
						{
							this.state.isShow ?
								(
									<View>
										<View style={styles.NewsTitle}>
											<Text style={styles.NewsTip}>今日课程提醒（{this.state.weekend}）</Text>
											{/*<TouchableOpacity style={styles.NewsIcon}>
												<Icon
													name='md-settings'
													size={24}
													style={styles.commentIcon} />
												</TouchableOpacity>*/}
										</View>
										<FlatList
											data={this.state.classData}
											//使用 ref 可以获取到相应的组件
											ref={(flatList) => this._flatList = flatList}
											keyExtractor={this._keyExtractor}
											//是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
											//如果你的行高是固定的，getItemLayout用起来就既高效又简单.
											//注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
											getItemLayout={(data, index) => ({ length: 44, offset: (44 + 1) * index, index })}
											renderItem={this._renderItem}
										/>
									</View>
								) : (null)
						}
						<View>
							<View style={styles.NewsTitle}>
								<Text style={styles.NewsTip}>考试倒计时</Text>
								<TouchableOpacity style={styles.NewsIcon}
									onPress={() => this.props.navigation.navigate('ExamDaoJiShi', {
										onCallBacks: (objs, deleteobj) => {
											if (deleteobj == '') {
												this.setState({
													objs: objs
												})
											} else {
												this.setState({
													objs: deleteobj
												})
											}
										}
									})}>
									<Icon
										name='md-settings'
										size={24}
										style={styles.commentIcon} />
								</TouchableOpacity>
							</View>

							<FlatListDemo obj={this.state.objs} />
						</View>
						<View>
							<View style={styles.NewsTitle}>
								<Text style={styles.NewsTip}>最新分享笔记</Text>
								<TouchableOpacity style={styles.NewsIcon}>
									<Icon
										name='md-refresh'
										size={24}
										style={styles.commentIcon} />
								</TouchableOpacity>
							</View>
							<NewNoteDemo  {...this.props} data={this.state.recommendTopic} />
						</View>
						<View>
							<View style={styles.NewsTitle}>
								<Text style={styles.NewsTip}>每日学英语</Text>
								<TouchableOpacity style={styles.NewsIcon}>
									<Icon
										name='md-refresh'
										size={24}
										style={styles.commentIcon} />
								</TouchableOpacity>
							</View>
							<View style={[styles.wrap1, { borderColor: '#eee', borderWidth: 1, }]}>
								<Text style={styles.content5}>{this.state.English}</Text>
								<Text style={styles.content5}>{this.state.China}</Text>
							</View>
						</View>
					</View>
				</ScrollView>

			</View>
		);
	}

	componentDidMount() {
		this._fetchData();

	}

	async  _fetchClassData() {
		var self = this;
		Util.get('http://tree.luoyelusheng.cn/data/read?type=classData', function (data) {
			if (data.status) {
				let obj = data.data;
				let week = moment(new Date()).day();
				switch (week) {
					case 0: self.setState({ weekend: '周日', weekDay: '日' }); break;
					case 1: self.setState({ weekend: '周一', weekDay: '一' }); break;
					case 2: self.setState({ weekend: '周二', weekDay: '二' }); break;
					case 3: self.setState({ weekend: '周三', weekDay: '三' }); break;
					case 4: self.setState({ weekend: '周四', weekDay: '四' }); break;
					case 5: self.setState({ weekend: '周五', weekDay: '五' }); break;
					case 6: self.setState({ weekend: '周六', weekDay: '六' }); break;
				}
				self.setState({ isShow: false });
				for (var i = 0; i < obj.length; i++) {
					if (self.state.weekDay == obj[i].fweek) {
						self.setState({ isShow: true });
					}
				}
				self.setState({
					classData: obj,
				});
				// alert(self.state.classData[7].fweek);
			} else {
				alert('服务异常,正在紧急修复,请耐心等待');
			}

		}, function (err) {
			alert(err);
			alert('服务异常,正在紧急修复,请耐心等待1');
		});

	}

	async _fetchData() {
		var self = this;
		Util.get('http://tree.luoyelusheng.cn/data/read?type=config', function (data) {
			if (data.status) {
				let obj = data.data;
				self.setState({
					recommendTopic: obj.recommendTopic,
					hotTopic: obj.hotTopic,
					English: obj.hotTopic[0].English,
					China: obj.hotTopic[0].China,
					refreshing: false
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

	_onRefresh() {
		var self = this;
		this.setState({ refreshing: true });
		this._fetchData();
	}

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
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
	headerImg: {
		width: 24,
		height: 18,
		marginTop:5,
	},
	headerText: {
		fontSize: 20,
		fontWeight: '600',
		color: '#fff',
		paddingLeft: 10,
	},
	NewsWrap: {
		width: width * 0.9,
		marginLeft: width * 0.05,
	},
	NewsTitle: {
		flexDirection: 'row',
		height: 40,
		paddingTop: 8,
		paddingBottom: 8,
		alignItems: 'center',
	},
	NewsTip: {
		borderColor: '#01cf6b',
		borderLeftWidth: 5,
		paddingLeft: 10,
		fontSize: 18,
	},
	NewsIcon: {
		position: 'absolute',
		right: 0,
	},
	content1: {
		width: width * 0.6,
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
	content4: {
		marginTop: 5,
		fontSize: 18,
		// textAlign: 'center',
	},
	content5: {
		marginTop: 5,
		fontSize: 16,
		textAlign: 'center',
	},
	wrap: {
		height: 40,
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 10,
	},
	wrap1: {
		height: 90,
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 10,
		paddingTop: 5,
		marginBottom: 10,
	},
	shareAllWrap: {
		flexDirection: 'row',
		width: width - 30,
		marginLeft: 15,
		paddingBottom:10,
		paddingTop:10,
		borderColor:'#f9f9fb',
		borderBottomWidth:1,
		marginBottom:5,
	},
	shareWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		width: (width - 30) / 3,

		// backgroundColor:'red',
	},
	shareBtn: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 50,
		height: 60,
	},
	shareImg: {
		width:50,
		height:50,
	},
	shareText: {
		marginTop:3,
		fontSize: 16,
	},
});