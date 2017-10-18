import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    Platform,
    ListView,
    Alert,
    TextInput,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import Util from '../../Common/util.js';
import GoodFriendMessage from './goodFriendMessage.js'
export default class ChatFriendReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: '',
            item:'',
        }

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
                        聊天设置
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('GoodFriendMessage', { item: this.state.item })}>


                    <View style={styles.tipWrap}>
                        <Image style={styles.headImg} source={{ uri: this.state.item.fImg }} />
                        <Text style={styles.textBtn}>{this.state.item.fName}</Text>
                        <Icon
                            name='ios-arrow-forward'
                            size={28}
                            style={styles.commentIcon} />
                    </View>
                </TouchableOpacity>
                <View style={styles.textWrap}>
                    <Text style={styles.textBtn}>聊天记录</Text>
                    <Icon
                        name='ios-arrow-forward'
                        size={28}
                        style={styles.commentIcon} />
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textBtn}>聊天背景</Text>
                    <Icon
                        name='ios-arrow-forward'
                        size={28}
                        style={styles.commentIcon} />
                </View>
                <TouchableOpacity style={styles.exitWrap} onPress={() => Alert.alert('温馨提醒', '确定删除该好友?', [
                    {
                        text: '确定', onPress: () => this._fetchDeleteData(this.state.item.id, this.state.item.first),
                    },
                    { text: '取消', onPress: () => ToastAndroid.show('取消~', ToastAndroid.SHORT) }
                ])}>
                    <Text style={styles.exitText}>删除好友</Text>
                </TouchableOpacity>


            </View>
        );
    }
    componentDidMount() {
        this._fetchData();

    }
    _fetchData() {
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=friendData', function (data) {
            if (data.status) {
                let obj = data.data;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id == self.props.navigation.state.params.item.id) {
                        
                        self.setState({
                            item: obj[i],
                        });
                        break;
                    }
                }
            } else {
                alert('服务异常,正在紧急修复,请耐心等待');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待2');
        });

    }
    _fetchDeleteData(id, first) {
        var self = this;
        url = 'http://tree.luoyelusheng.cn/data/delete_peopleData?id=' + id + '&first=' + first;
        Util.get(url, function (data) {
            if (data.status) {
                let obj = data.info;
                self.setState({
                    obj: obj,
                });
                self.props.navigation.navigate('MyComponent')
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
    tipWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    tip: {
        fontSize: 18,
    },
    headImg: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    exitWrap: {
        backgroundColor: '#e85858',
        flexDirection: 'row',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: width * 0.9,
        marginLeft: width * 0.05,
        borderRadius: 5,

    },
    exitText: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 5,
    },

});