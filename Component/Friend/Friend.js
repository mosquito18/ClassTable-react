import React, { Component } from 'react';
import {
    Alert,
    ToastAndroid,
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
    FlatList,
    ScrollView,
    TextInput,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatReset from './QunChat/chatReset.js';
import Util from '../Common/util.js';
import moment from 'moment';


import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
const { width, height } = Dimensions.get('window');
import { StackNavigator, TabNavigator } from 'react-navigation';
export default class Friend extends Component {
    // async getCityInfos() {
    //     let QunNewsData = await require('../../json/qunnews.json');
    //     this.setState({ data: QunNewsData })
    // }
    constructor(props) {
        super(props);
        this.state = {
            fqunName: '',
            data: [],
            refreshing: false, //初始化不刷新
            text: '',//跳转的行
            obj: '',
        };
    }
    _keyExtractor = (item, index) => index;
    _renderItem = ({ item, index }) => {
        let time = moment(item.time).format('HH:mm');
        return (
           
            <TouchableOpacity style={styles.card}
                onPress={() => this.props.navigation.navigate('QunChat', { item: item,MyID:this.props.navigation.state.params.MyID})}
                onLongPress={() => Alert.alert('温馨提醒', '确定删除该联系人?', [
                    { text: '确定', onPress: () => this._fetchDeleteData(item.id) },
                    { text: '取消', onPress: () => ToastAndroid.show('取消~', ToastAndroid.SHORT) }
                ])}>
                <View style={styles.itemView}>
                    <Image style={styles.itemImg} source={{uri:item.fImg}} />
                    <View style={styles.itmeText}>
                        <Text style={styles.itmeTitle} numberOfLines={1}>{item.fName}</Text>
                        <Text style={styles.itmeContent}>{item.content}</Text>
                    </View>
                    <Text style={styles.itmeTime}>{time}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        //  alert( this.props.navigation.state.params.MyID);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.headerImg} source={require('../../img/logo.png')} />
                    <Text style={styles.headerText}>
                        小纸条
                    </Text>
                    <TouchableOpacity style={styles.headerPeople}
                        onPress={() => this.props.navigation.navigate('MyComponent',{MyID:this.props.navigation.state.params.MyID})}
                    >
                        <Icon name='ios-person'
                            size={30}
                            style={{ color: '#fff' }}

                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerEdit}
                        onPress={() => this.props.navigation.navigate('AddFriend')}>
                        <Icon name='md-add'
                            size={28}
                            style={{ color: '#fff' }}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView tabLabel="消息">
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
                </ScrollView>
            </View>
        );
    }
    componentDidMount() {
        this._fetchData();

    }
    _fetchData() {
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=qunnews', function (data) {
            if (data.status) {
                let obj = data.data;
                self.setState({
                    obj: obj,
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
    _fetchDeleteData(id) {
        var self = this;
        url = 'http://tree.luoyelusheng.cn/data/delete_qunnews?id=' +id;
        Util.get(url, function (data) {
            if (data.status) {
                let obj = data.info;
                self.setState({
                    obj: obj,
                });
                // self.props.callbackParent(self.state.obj);
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待4');
        });

    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9fb',
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
        // marginBottom:15,
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
    itemView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height: 60,
    },
    itemImg: {
        borderRadius:20,
        width: 40,
        height: 40
    },
    itmeText: {
        marginLeft: 10,
    },
    itmeTitle: {
        width:width/2,
        paddingBottom: 3,
        fontSize: 16,
        color: '#333'
    },
    itmeContent: {
    },
    itmeTime: {
        position: 'absolute',
        right: 20,
    },

    headerEdit: {
        position: 'absolute',
        right: 15,
        top: 12,
    },
    headerDelete: {
        position: 'absolute',
        right: 85,
        top: 13,
    },
    headerPeople: {
        position: 'absolute',
        right: 50,
        top: 10,
    },
    card: {
        // marginBottom:1,
        borderBottomWidth: 1,
        borderColor: '#f9f9fb',
    }
});






