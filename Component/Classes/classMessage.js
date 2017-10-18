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
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../Common/util.js';
const { width, height } = Dimensions.get('window');
export default class ClassMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            item:'',
        };
    }
    render() {
        // alert(this.props.navigation.state.params.MyID);
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
                        课程详情
                    </Text>
                </View>

                <Text style={styles.title}>课程信息</Text>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>课程名称：</Text>
                    <Text style={styles.textMessage} numberOfLines={1}>{this.props.navigation.state.params.item.fclassName}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>上课地点：</Text>
                    <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fPlace}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>上课教师：</Text>
                    <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fTeachar}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>周期：</Text>
                    <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fzhouqi}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>星期：</Text>
                    <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fweek}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>课时：</Text>
                    <Text style={styles.textMessage}>{this.props.navigation.state.params.item.fClasstime}</Text>
                </View>
                <Text style={styles.title}>同课同学</Text>
                <View style={styles.ImgGroup}>
                    <Image style={styles.headImg} source={require('../../img/head3.jpg')} />
                    <Image style={styles.headImg} source={require('../../img/head4.jpg')} />
                    <Image style={styles.headImg} source={require('../../img/head5.jpg')} />
                    <Image style={styles.headImg} source={require('../../img/head6.jpg')} />
                    <Image style={styles.headImg} source={require('../../img/head3.jpg')} />
                    <Image style={styles.headImg} source={require('../../img/head4.jpg')} />
                    <Image style={styles.headImg} source={require('../../img/head5.jpg')} />
                    <Text style={styles.dot}>···</Text>
                    <Icon
                        name='ios-arrow-forward'
                        size={28}
                        style={styles.commentIcon} />
                </View>

                <TouchableOpacity style={styles.btn}
                    onPress={() => {
                        this._fetchAddData(this.props.navigation.state.params.item.fclassName);
                        
                    }}>
                    <Text style={styles.btnText}>加入该班级群聊</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _fetchAddData(title) {
        var isLeap = true;
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=qunnews', function (data) {
            if (data.status) {
                let obj = data.data;
                for (var i = 0; i < obj.length; i++) {
                    if (title == obj[i].fName) {
                        isLeap = false;
                        break;
                    }
                }
                if (isLeap) {
                    url = 'http://tree.luoyelusheng.cn/data/qunnews?type=qunnews&fName=' + title+'&newstype=qun';
                    Util.get(url, function (data) {
                        if (data.status) {
                            var obj = data.info;
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].fName == self.props.navigation.state.params.item.fclassName) {
                                    self.setState({
                                        item: obj[i],
                                    });
                                }
                            }
                            self.setState({
                                obj: obj,
                            });
                            self.props.navigation.navigate('QunChat', { item: self.state.item
                            })
                        } else {
                            alert('服务异常,正在紧急修复,请耐心等待1');
                        }

                    }, function (err) {
                        alert(err);
                        alert('服务异常,正在紧急修复,请耐心等待2');
                    });
                }
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
        width: width * 0.5,
        textAlign: 'right',
    },
    title: {
        paddingLeft: 15,
        paddingTop: 5,
        paddingBottom: 5,
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
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
    ImgGroup: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        paddingLeft: 15,
        alignItems: 'center',
    },
    headImg: {
        width: 40,
        height: 40,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        borderRadius:50
    },
    commentIcon: {
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 15,
    },
    dot: {
        position: 'absolute',
        right: 40,
        fontSize: 40,
    },
});