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
    ToastAndroid,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../../Common/util.js';
const { width, height } = Dimensions.get('window');
// import DetailMessage from './detailMessage.js';
export default class CheckFriend extends Component {
    // static navigationOptions = {
    //     navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
    // 		header: {  // 导航栏相关设置项
    // 			visible: true,
    // 		},
    // 	},
    // };
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            obj: ''
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
                        查找好友
                    </Text>
                </View>
                <View style={styles.wrap}>
                    <TextInput
                        placeholder='搜索'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content1}
                        onChangeText={(text) => {
                            this.setState({
                                phoneNumber: text
                            });
                        }}
                    >{this.state.phoneNumber}</TextInput>
                </View>

                <TouchableOpacity style={styles.btn}
                    onPress={() => this._fetchData(this.state.phoneNumber)}>
                    <Text style={styles.btnText}>查找</Text>
                </TouchableOpacity>

            </View>
        );
    }
    _fetchData(text) {
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=friendData', function (data) {
            if (data.status) {
                let obj = data.data;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].fName == text) {
                        var objs = obj[i].first;
                        break;
                    }
                }
                if (objs) {
                    Util.get('http://tree.luoyelusheng.cn/data/read?type=peopleData', function (data) {
                        if (data.status) {
                            let objss = data.data;
                            for (var j = 0; j < objss[objs].length; j++) {
                                if (objss[objs][j].fName == text) {
                                    var objsss = objss[objs][j];
                                    break;
                                }
                            }
                            if (objsss) {
                                self.props.navigation.navigate('GoodFriendMessage',{item:objsss})
                            }else{
                                alert("找不到该好友");
                            }

                        } else {
                            alert('服务异常,正在紧急修复,请耐心等待');
                        }

                    }, function (err) {
                        alert(err);
                        alert('服务异常,正在紧急修复,请耐心等待2');
                    });
                }
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
        marginBottom: 20,
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
    btn: {
        marginTop: 20,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#00b3cb',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00b3cb',
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    content1: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: '#333',
        fontSize: 16,
        height: 40,
    },
    wrap: {
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});