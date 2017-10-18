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
    View,
    TouchableHighlight,
    Animated,
    ScrollView,
} from 'react-native';
import Dimensions from 'Dimensions';
import Panel from '../Panel';

import Util from '../../Common/util.js';
import Icon from 'react-native-vector-icons/Ionicons';
import AlertSelected from '../AlertSelected';
const sexArr = ["男", "女"];
const { width, height } = Dimensions.get('window');
export default class MyNoteUpadate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.state.params.item.id,
            title: this.props.navigation.state.params.item.Title,
            tip: this.props.navigation.state.params.item.Tip,
            content: this.props.navigation.state.params.item.Content,
            img: this.props.navigation.state.params.item.img,
        }

    }
    callbackSelected(i) {
        setTimeout(() => {
            alert("选择了" + sexArr[i]);
        }, 500);
    }

    showAlertSelected() {
        this.refs.alertSelected.show("分享到", sexArr, this.callbackSelected.bind(this));
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
                        我的笔记
                    </Text>
                    <TouchableOpacity style={styles.headerDelete}
                        onPress={() => {
                            this._fetchDeleteData();
                            this.props.navigation.goBack()
                        }}
                    >
                        <Icon name='ios-trash'
                            size={28}
                            style={{ color: '#fff' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.headerEdit} onPress={this.showAlertSelected.bind(this)}
                    >
                        <View>
                            <Icon style={{ color: '#fff' }}
                                name='md-share'
                                size={28} />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <Panel title={this.state.title}>
                        <View>
                            <View style={styles.wrap}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    keyboardType='default'
                                    style={styles.content1}
                                    onChangeText={(text) => {
                                        this.setState({
                                            tip: text
                                        });
                                    }}>
                                    {this.state.tip}
                                </TextInput>
                            </View>
                            <View style={styles.wrap}>
                                <TextInput
                                    underlineColorAndroid='transparent'
                                    keyboardType='default'
                                    style={styles.content2}
                                    multiline={true}
                                    onChangeText={(text) => {
                                        this.setState({
                                            content: text
                                        });
                                    }}
                                >
                                    {this.state.content}
                                </TextInput>
                            </View>
                            <TouchableOpacity style={styles.btn} onPress={() => {
                                this._fetchData(this.state.id, this.state.title, this.state.tip, this.state.content, this.state.img);
                                this.props.navigation.goBack()
                            }}>
                                <Text style={styles.btnText}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </Panel>
                </ScrollView>

                <AlertSelected ref="alertSelected" />
            </View>
        );
    }
    _fetchData(id, title, tip, content, img) {
        var self = this;
        // alert(content)
        url = 'http://tree.luoyelusheng.cn/data/update_noteData?id=' + id + '&Title=' + title + '&Tip=' + tip + '&Content=' + content + '&img=' + img,
            Util.get(url, function (data) {
                if (data.status) {
                    let obj = data.info;
                    self.setState({
                        obj: obj,
                    });
                    self.props.navigation.state.params.onCallBack(self.state.obj);

                } else {
                    alert('服务异常,正在紧急修复,请耐心等待');
                }

            }, function (err) {
                alert(err);
                alert('服务异常,正在紧急修复,请耐心等待5');
            });

    }
    _fetchDeleteData() {
        var self = this;
        url = 'http://tree.luoyelusheng.cn/data/delete_noteData?id=' + this.state.id;
        Util.get(url, function (data) {
            if (data.status) {
                let obj = data.info;
                self.setState({
                    obj: obj,
                    isProps: false,
                });
                
                self.props.navigation.state.params.onCallBack(self.state.obj);
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
    headerDelete: {
        position: 'absolute',
        right: 50,
        top: 12,
    },
    content1: {
        paddingLeft: 10,
        color: '#333',
        fontSize: 16,
        height: 40,
    },
    content2: {
        paddingLeft: 10,
        color: '#333',
        fontSize: 16,
        height: 120,
    },
    wrap: {
        marginTop: 15,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#fff',
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

});
