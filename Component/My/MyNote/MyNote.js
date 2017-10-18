import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    Platform,
    ListView,
    TextInput,
    FlatList,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import MyNoteMessage from './myNoteMessage';
import MyNoteUpadate from './myNoteUpadate';
import AddNote from '../../Classes/AddNote/addNote';
import Util from '../../Common/util.js';
const { width, height } = Dimensions.get('window');
import { StackNavigator, TabNavigator } from 'react-navigation';
import { DrawerNavigator, DrawerItems, } from 'react-navigation';
class MyNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            obj: '',
            arr: [],
            Title:''
        }
    }

    _keyExtractor = (item, index) => index;
    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.textWrap}>
                <Text style={styles.textBtn}>{item.Title}</Text>
                <TouchableOpacity style={styles.btn}
                    onPress={() => this.props.navigation.navigate('MyNoteMessage', { Title: item.Title })}>
                    <View>
                        <Icon
                            name='ios-arrow-forward'
                            size={28}
                            style={styles.commentIcon1} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.headerImg} source={require('../../../img/logo.png')} />
                    <Text style={styles.headerText}>
                        我的笔记
                    </Text>
                    <TouchableOpacity style={styles.headerEdit}
                        onPress={() => this.props.navigation.navigate('AddNote', {
                            Title:this.state.Title,
                            onCallBack: (obj) => {
                                let array = [];
                                array.push(obj[0]);
                                let isShow = true;
                                for (var j = 0; j < obj.length; j++) {
                                    for (var i = 0; i < array.length; i++) {
                                        if (obj[j].Title != array[i].Title) {
                                            isShow = true;
                                        } else {
                                            isShow = false;
                                            break;
                                        }
                                    }
                                    if (isShow) {
                                        array.push(obj[j]);
                                    }

                                }
                                this.setState({
                                    obj: array,
                                })
                            }
                        })}
                    >
                        <View>
                            <Icon style={{ color: '#fff' }}
                                name='md-add'
                                size={28} />
                        </View>
                    </TouchableOpacity>
                </View>
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
            </View>
        );
    }
    componentDidMount() {
        this._fetchData();

    }
    _fetchData(callback) {
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=noteData', function (data) {
            if (data.status) {
                let obj = data.data;
                let array = [];
                array.push(obj[0]);
                let isShow = true;
                for (var j = 0; j < obj.length; j++) {
                    for (var i = 0; i < array.length; i++) {
                        if (obj[j].Title != array[i].Title) {
                            isShow = true;
                        } else {
                            isShow = false;
                            break;
                        }
                    }
                    if (isShow) {
                        array.push(obj[j]);
                    }

                }

                self.setState({
                    obj: array,
                    refreshing: false
                });
                // alert(obj[2].Title);
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
const MyNoteScreen = StackNavigator({
    MyNote: {
        screen: MyNote,
        navigationOptions: {

        }
    },
    MyNoteMessage: { screen: MyNoteMessage },
    MyNoteUpadate: { screen: MyNoteUpadate },
    AddNote: { screen: AddNote },

}, {
        initialRouteName: 'MyNote', // 默认显示界面
        navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            header: {  // 导航栏相关设置项

                visible: true,
            },
            drawerLabel: () => (
                <View style={styles.row}><Text style={styles.rowText}>我的笔记</Text></View>
            ),
            drawerIcon: () => (
                <Icon name='ios-stopwatch-outline'
                    style={styles.backIcon}
                />
            ),
        },
        mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        onTransitionStart: () => { console.log('导航栏切换开始'); },  // 回调
        onTransitionEnd: () => { console.log('导航栏切换结束'); }  // 回调
    });
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    backIcon: {
        fontSize: 27,
    },
    backIconB: {
        fontSize: 30,
    },
    row: {
        height: 40,
        justifyContent: 'center',
        // marginBottom:1,
    },
    rowText: {
        // lineHeight:40,
        fontSize: 17,
    },
    container: {
        flex: 1,
        backgroundColor: '#f9f9fb',
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
    backIcon1: {
        color: '#fff',
        fontSize: 28,
        //marginRight:10
    },
    textWrap: {
        paddingLeft: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 1,
    },
    textBtn: {
        fontSize: 18,
        color: 'black',
    },
    commentIcon: {
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 15,
    },
    textName: {
        fontSize: 18,
        color: 'black',
    },
    textMessage: {
        fontSize: 16,
        position: 'absolute',
        right: 15,
    },
    headerEdit: {
        position: 'absolute',
        right: 15,
        top: 12,
    },
    btn: {
        position: 'absolute',
        right: 15,
        width: 20,
        // backgroundColor:'red',
    },
    commentIcon1: {
        textAlign: 'right',
        justifyContent: 'flex-end',
        // position:'absolute',
        // right:15,
    },
});
export default MyNoteScreen;