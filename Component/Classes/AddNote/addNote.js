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
import Panel from '../../My/Panel';
import Photo from './Photo';
import Util from '../../Common/util.js';
import Icon from 'react-native-vector-icons/Ionicons';
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');

export default class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.Title,
            tip: '',
            content: '',
            img: '',
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
                        添加笔记
                    </Text>
                </View>
                <ScrollView>
                    <View>
                        <View style={styles.wrap}>
                            {
                                this.state.title == '' ? <TextInput
                                    placeholder='请输入科目名'
                                    underlineColorAndroid='transparent'
                                    keyboardType='default'
                                    style={styles.content1}
                                    onChangeText={(text) => {
                                        this.setState({
                                            title: text
                                        });
                                    }}>
                                    {this.state.title}
                                </TextInput> : <Text style={[styles.content1, {paddingTop:10}]}>{this.state.title}</Text>
                            }

                        </View>
                        <View style={styles.wrap}>
                            <TextInput
                                placeholder='请输入小标题'
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
                                placeholder='请输入内容'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.content2}
                                multiline={true}
                                onChangeText={(text) => {
                                    this.setState({
                                        content: text
                                    });
                                }}
                            >{this.state.content}</TextInput>
                        </View>
                        <Photo />
                        <View style={styles.btn}>
                            <Text style={styles.btnText} onPress={() => {
                                this._fetchData(this.state.title, this.state.tip, this.state.content, this.state.img);
                                this.props.navigation.goBack()
                            }}>确定</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
    _fetchData(title, tip, content, img) {
        var self = this;
        url = 'http://tree.luoyelusheng.cn/data/noteData?type=noteData&Title=' + title + '&Tip=' + tip + '&Content=' + content + '&img=' + img;
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
            alert('服务异常,正在紧急修复,请耐心等待10');
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
        height: 80,
        marginBottom: 10,
    },
    wrap: {
        marginTop: 15,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#fff',
    },
    btn: {
        marginTop: 10,
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