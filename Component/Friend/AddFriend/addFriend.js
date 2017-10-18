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
export default class AddFriend extends Component {
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
                        添加好友
                    </Text>
                </View>
                <View style={styles.wrap}>
                    <TextInput
                        placeholder='请输入手机号'
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
                    <Text style={styles.btnText}>添加</Text>
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
                    if (obj[i].fPhone == text) {
                        var objs = obj[i].first;
                        var item = obj[i];
                        break;
                    }
                }
                
                if (objs) {
                    Util.get('http://tree.luoyelusheng.cn/data/read?type=peopleData', function (data) {
                        if (data.status) {
                            let objss = data.data;
                            for (var j = 0; j < objss[objs].length; j++) {
                                if (objss[objs][j].fPhone == text) {
                                    var objsss = objss[objs][j];
                                    break;
                                }
                            }
                            if (objsss) {
                                self.props.navigation.navigate('GoodFriendMessage',{item:objsss})
                            }else{
                                self.props.navigation.navigate('DetailMessage',{item:item})
                            }

                        } else {
                            alert('服务异常,正在紧急修复,请耐心等待');
                        }

                    }, function (err) {
                        alert(err);
                        alert('服务异常,正在紧急修复,请耐心等待2');
                    });
                }else{
                    alert("该手机号未注册");
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