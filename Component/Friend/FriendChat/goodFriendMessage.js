import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    findNodeHandle,
    Button,
    ScrollView,
    ActivityIndicator,
    Platform,
    ListView,
    TextInput,
} from 'react-native';
import Util from '../../Common/util.js';
import { BlurView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { DrawerNavigator, DrawerItems, } from 'react-navigation';
const { width, height } = Dimensions.get('window');
export default class GoodFriendMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewRef: 0,
            number: [],
        };
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
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
                        详细资料
                    </Text>
                </View>
                <ScrollView>

                    <View style={styles.container1}>
                        <Image
                            ref={(img) => { this.backgroundImage = img; }}
                            source={{ uri: this.props.navigation.state.params.item.fImg }}
                            style={styles.imgBig}
                            onLoadEnd={this.imageLoaded.bind(this)}
                        >
                        </Image>
                        <BlurView
                            style={styles.absolute}
                            viewRef={this.state.viewRef}
                            blurType="light"
                            blurAmount={10}
                        />
                        <Image
                            style={styles.avatar}
                            source={{ uri: this.props.navigation.state.params.item.fImg }}
                        ></Image>
                    </View>

                    <View style={styles.textWrap}>
                        <Text style={styles.textName}>昵称：</Text>
                        <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fJianame}</Text>
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textName}>姓名：</Text>
                        <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fName}</Text>
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textName}>年龄：</Text>
                        <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fAge}</Text>
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textName}>性别：</Text>
                        <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fSex}</Text>
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textName}>学校：</Text>
                        <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fSchool}</Text>
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textName}>学院：</Text>
                        <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fXueyuan}</Text>
                    </View>
                    <View style={styles.textWrap}>
                        <Text style={styles.textName}>入学时间：</Text>
                        <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fCometime}年</Text>
                    </View>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => this._fetchAddData()}>
                        <Text style={styles.btnText}>发消息</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

    _fetchAddData() {
        var isLeap = true;
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=qunnews', function (data) {
            if (data.status) {
                let obj = data.data;
                for (var i = 0; i < obj.length; i++) {
                    if (self.props.navigation.state.params.item.fName == obj[i].fName) {
                        isLeap = false;
                        break;
                    }
                }
                if (isLeap) {
                    url = 'http://tree.luoyelusheng.cn/data/qunnews?type=qunnews&fName=' + self.props.navigation.state.params.item.fName+'&newstype=friend&id='+self.props.navigation.state.params.item.id+'&fImg='+self.props.navigation.state.params.item.fImg;
                    Util.get(url, function (data) {
                        if (data.status) {
                            // var obj = data.info;
                            // for (var i = 0; i < obj.length; i++) {
                            //     if (obj[i].fName == self.props.navigation.state.params.item.fclassName) {
                            //         self.setState({
                            //             item: obj[i],
                            //         });
                            //     }
                            // }
                            // self.setState({
                            //     obj: obj,
                            // });
                            // self.props.navigation.navigate('QunChat', { item: self.state.item
                            // })
                        } else {
                            alert('服务异常,正在紧急修复,请耐心等待1');
                        }

                    }, function (err) {
                        alert(err);
                        alert('服务异常,正在紧急修复,请耐心等待2');
                    });
                }
                self.props.navigation.navigate('QunChat', { item: self.props.navigation.state.params.item, MyID: self.props.navigation.state.params.MyID })
            } else {
                alert('服务异常,正在紧急修复,请耐心等待3');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待4');
        });




    }

}
const styles = StyleSheet.create({
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBig: {
        width: width,
        height: width * 0.4,
        marginBottom: width * 0.17
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    avatar: {
        position: 'absolute',
        top: width * 0.4 - width * 0.15,
        width: width * 0.3,
        height: width * 0.3,
        borderWidth: 2,
        borderColor: 'white',
        resizeMode: 'cover',

    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        height: 40,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 1,
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
    userImg: {
        width: width,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headImg: {
        width: 80,
        height: 80,
    },
    btn: {
        marginTop: 30,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#00b3cb',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00b3cb',
        marginBottom: 30
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
});