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
import Util from '../../Common/util.js';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import Example from '../chat.js';
// import ChatFriendReset from './chatFriendReset.js'
export default class FriendChat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: '',
        }

    }

    _onChildChanged(newState) {
        this.setState({
            messages: newState
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => this._fetchData(this.props.navigation.state.params.item.id, this.state.messages, this.props.navigation.state.params.item.fName, this.props.navigation.state.params.item.fImg)}>
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        {this.props.navigation.state.params.item.fName}
                    </Text>
                    <TouchableOpacity style={styles.headerEdit}
                        onPress={() => this.props.navigation.navigate('ChatFriendReset', { item: this.props.navigation.state.params.item })}>
                        <View>
                            <Icon style={{ color: '#fff' }}
                                name='md-person'
                                size={24} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Example callbackParent={this._onChildChanged.bind(this)} {...this.props} />
            </View>
        );
    }
    _fetchData(id, content, title, img) {
        var isLeap = true;
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=qunnews', function (data) {
            if (data.status) {
                let obj = data.data;
                for (var i = 0; i < obj.length; i++) {
                    if (title == obj[i].title) {
                        isLeap = false;
                        break;
                    }
                }
                if (isLeap) {
                    url = 'http://tree.luoyelusheng.cn/data/qunnews?type=qunnews&id=' + id + '&content=' + content + '&title=' + title + '&img=' + img;
                    Util.get(url, function (data) {
                        if (data.status) {
                            let obj = data.info;
                            self.setState({
                                obj: obj,
                            });
                            self.props.navigation.navigate('Friend');
                            // self.props.navigation.state.params.onCallBack(self.state.obj);
                        } else {
                            alert('服务异常,正在紧急修复,请耐心等待');
                        }

                    }, function (err) {
                        alert(err);
                        alert('服务异常,正在紧急修复,请耐心等待6');
                    });
                } else {
                    url = 'http://tree.luoyelusheng.cn/data/update_qunnews?id=' + id + '&content=' + content,
                        Util.get(url, function (data) {
                            if (data.status) {
                                let obj = data.info;
                                self.setState({
                                    obj: obj,
                                });
                                // alert(self.state.obj);
                                self.props.navigation.navigate('Friend');

                            } else {
                                alert('服务异常,正在紧急修复,请耐心等待');
                            }

                        }, function (err) {
                            alert(err);
                            alert('服务异常,正在紧急修复,请耐心等待5');
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
    headerEdit: {
        position: 'absolute',
        right: 15,
        top: 12,
    },
});