import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    TextInput,
    Button,
    Image,
    View
    } from 'react-native';
import Dimensions from 'Dimensions';
import Util from '../Common/util';
import Icon from 'react-native-vector-icons/Ionicons';
const {width,height} = Dimensions.get('window');
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: this.props.navigation.state.params.phoneNumber,
            verifyCode: '',
            firstPassword:'',
            secondPassword:'',
            codeAlreadySend: false,
            seconds:60,
            obj:'',
        };
        this._login = this._login.bind(this);
        this._getVerifyCode = this._getVerifyCode.bind(this);
        this._showVerifyCode = this._showVerifyCode.bind(this);
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
                        注册
                    </Text>
                </View>
                <View style={styles.wrap}>
                    <TextInput
                        placeholder='请输入手机号'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content1}
                        onEndEditing={(event)=> {
                            this._correctPhone(event.nativeEvent.text)}}
                        onChangeText={(text)=> {
                                this.setState({
                                    phoneNumber: text
                                });
                            }}
                        >{this.state.phoneNumber}</TextInput>
                    <View style={styles.codeWrap}>
                        <TextInput
                            placeholder='请输入验证码'
                            underlineColorAndroid='transparent'
                            keyboardType='default'
                            style={styles.content2}
                            onChangeText={(text)=> {
                                this.setState({
                                    verifyCode: text
                                });
                            }}
                            />

                        {this.state.codeAlreadySend ?
                            <View>{this.state.seconds === 0 ?
                                <View style={styles.codeBtn}>
                                    <Text style={styles.btnText} onPress={this._showVerifyCode}>重新获取</Text>
                                </View>
                                :
                                <View style={styles.codeBtn}>
                                    <Text style={styles.btnText}>剩余{this.state.seconds}秒</Text>
                                </View>
                            }</View>:
                            <View style={styles.codeBtn}>
                                <Text style={styles.btnText} onPress={this._showVerifyCode}>获取验证码</Text>
                            </View>
                        }
                    </View>

                    <TextInput
                        placeholder='请输入新密码'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content1}
                        secureTextEntry={true}
                        onEndEditing={(event)=> {
                            this._correctPassword(event.nativeEvent.text)}}
                        onChangeText={(text)=> {
                            this.setState({
                                firstPassword: text
                            });
                        }}
                        />
                    <TextInput
                        placeholder='请确认新密码'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content1}
                        secureTextEntry={true} 
                        onEndEditing={(event)=> {
                            this._correctPassword(event.nativeEvent.text)}}                                              
                        onChangeText={(text)=> {
                            this.setState({
                                secondPassword: text
                            });
                        }}
                        />

                </View>
                <TouchableOpacity style={styles.btn}
                    onPress={this._login}
                >
                    <Text style={styles.btnText}>注册</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _correctPhone(text){
        var regex = /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/;
        if(!regex.test(text)&&text!=''){
            alert('请输入正确的手机号');
            return;
        }
    }

    _correctPassword(text){
        var regExp=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        if(!regExp.test(text)&&text!=''){
            alert('密码格式不正确，请输入6~21位带英文和数字的密码');
            return;
        }
    }
    

    _fetchData(phoneNumber,firstPassword) {
        var self = this;      
        url='http://tree.luoyelusheng.cn/data/friendData?fPhone='+phoneNumber+'&fPassword='+firstPassword;
        Util.get(url, function (data) {
            if (data.status) {
                let obj = data.info;
                self.setState({
                    obj: obj,
                });              
                self.props.onCallBack(self.state.phoneNumber);
            }else {
                alert('服务异常,正在紧急修复,请耐心等待');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待2');
        });

    }

    _login() {

        //去服务器验证手机号码与验证码是否匹配
        //正则匹配的
        let phoneNumber = this.state.phoneNumber;
        let verifyCode = this.state.verifyCode;
        let firstPassword = this.state.firstPassword;
        let secondPassword = this.state.secondPassword;
        if (!phoneNumber) {
            alert('手机号码不能为空');
            return ;
        }else if (!verifyCode) {
            alert('验证码不能为空');
            return ;
        }else if (!firstPassword) {
            alert('输入新密码不能为空');
            return ;
        }else if (!secondPassword) {
            alert('再次输入新密码不能为空');
            return ;
        }else if (secondPassword!=firstPassword) {
            alert('两次密码不一致，请重新输入');
            return ;
        }
        this._fetchData(this.state.phoneNumber,this.state.firstPassword);
        // this.props.onCallBack(this.state.phoneNumber);
        this.props.navigation.goBack()
        // let body = {
        //     phoneNumber: phoneNumber,
        //     code:verifyCode
        // };
        // let url = config.api.base + config.api.verify;
        // request.post(url, body)
        //     .then(
        //     (data)=> {
        //         if (data && data.success) {
        //             console.log('验证成功了，可以登陆，页面可以跳转了');
        //             console.log(data);
        //             this.props.afterLogin(data.data);

        //         } else {
        //             alert('获取验证码失败了,请检查一下你的手机号');
        //         }
        //     }
        // )
        //     .catch((err)=> {
        //         alert(1);
        //         alert('错误：' + err);
        //     });

    }


    _showVerifyCode() {

        console.log('开始显示验证码的输入框与开始倒计时');

        this.setState({
            codeAlreadySend:true,
            seconds:60,
        });

        this._interval = setInterval(()=>{

            if(this.state.seconds === 0){
                return clearInterval(this._interval);

            }

            this.setState({
                seconds:this.state.seconds - 1
            });
        },1000);

    }

    componentWillUnmount(){
        console.log('组件即将卸载');
        this._interval && clearInterval(this._interval);
    }

    _getVerifyCode() {

        //去服务器获取验证码了
        //正则匹配的
        let phoneNumber = this.state.phoneNumber;
        if (!phoneNumber) {
            alert('手机号码不能为空');
            return ;
        }

        let body = {
            phoneNumber: phoneNumber
        };
        // let url = config.api.base + config.api.signup;
        // request.post(url, body)
        //     .then(
        //     (data)=> {
        //         if (data && data.success) {
        //             // console.log(data);
        //             this._showVerifyCode();

        //         } else {
        //             alert('获取验证码失败了,请检查一下你的手机号');
        //         }
        //     }
        // )
        //     .catch((err)=> {
        //         alert('错误：' + err);
        //     });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dedfe1',
    },
    header:{
        marginTop:Platform.OS === 'ios' ? 20 : 0,
        paddingTop:12,
        paddingBottom:12,
        height:48,
        backgroundColor:'#00b3ca',
        flexDirection:'row',
        paddingLeft:10,
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
    backIcon:{
        color:'#fff',
        fontSize:28,
        //marginRight:10
    },
    wrap:{
        width:width*0.9,
        marginLeft:width*0.05,
    },
    content1:{
        fontSize:18,
        height:40,
        marginTop:25,
        backgroundColor:'#fff',
        paddingLeft: 10,

    },
    content2:{
        fontSize:18,
        height:40,
        width:width*0.6,
        marginTop:25,
        backgroundColor:'#fff',
        paddingLeft: 10,
    },
    codeWrap:{
        flexDirection:'row',
    },
    codeBtn: {
        marginTop:25,
        width:width*0.27,
        marginLeft:width*0.03,
        backgroundColor:'#00b3cb',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00b3cb',
    },
    btn: {
        marginTop:50,
        width:width*0.9,
        marginLeft:width*0.05,
        backgroundColor:'#00b3cb',
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