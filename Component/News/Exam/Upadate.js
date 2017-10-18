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
import Util from '../../Common/util.js';
import ToggleAnimatingActivityIndicator from './DataPicker.js'
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
export default class Upadate extends Component {
    //<Image style={styles.headerImg} source={require('../../img/logo.png')} />
    constructor(props) {
        super(props);
        this.state = {
            contents:this.props.navigation.state.params.contents,
            time: '',
        }

    }
    _onChildChanged(newState) {
        // alert(newState);
        this.setState({
            time: newState
        });
    }

    _fetchData(index,contents,time) {
        var self = this;
        url='http://tree.luoyelusheng.cn/data/update_examData?id='+index+'&fexamName='+contents+'&finalTime='+time,
        // url = 'http://tree.luoyelusheng.cn/data/update_examData?id='+index+'&fexamName=' + contents + '&finalTime=' + time;
        Util.get(url, function (data) {
            if (data.status) {
                let obj = data.info;
                self.setState({
                    obj: obj,
                });              
                // alert(self.state.obj);
                self.props.navigation.state.params.onCallBack(self.state.obj);
                
            } else {
                alert('服务异常,正在紧急修复,请耐心等待');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待5');
        });

    }
    
    render() {
        // alert(this.state.time);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => { this.props.navigation.goBack()}}
                    >
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        修改
                    </Text>
                </View>
                <View style={styles.wrap}>
                    <TextInput
                        placeholder='考试名称'
                        underlineColorAndroid='transparent' 
                        keyboardType='default'
                        style={styles.content1}
                        onChangeText={(text) => {
                            this.setState({
                                contents: text
                            });
                        }}                        
                        >{this.state.contents}
                    </TextInput>
                </View>
                <ToggleAnimatingActivityIndicator times={this.props.navigation.state.params.times} callbackParent={this._onChildChanged.bind(this)} time={this.state.time}  />
                <TouchableOpacity
                    style={styles.btn}
                    onPress={() => { 
                        this._fetchData(this.props.navigation.state.params.index,this.state.contents, this.state.time);
                        this.props.navigation.goBack()}}>
                    <Text style={styles.btnText} onPress={this._login}>确定</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = StyleSheet.create({
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
    content1: {
        paddingLeft: 10,
        color: '#333',
        fontSize: 16,
        height: 40,
    },
    wrap: {
        marginTop: 15,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#eee',
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