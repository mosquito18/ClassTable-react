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
import Register from './register';
import Index from '../../Index';
import FogetPassword from './fogetPassword';
import Util from '../Common/util';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator } from 'react-navigation';
const { width, height } = Dimensions.get('window');
// export default class MyNavigator extends Component {
//     render() {
//         return (
//             <Navigator
//                 {...this.props}
//                 //tabLabel="my"
//                 initialRoute={{ name: 'Login', component: Login }}
//                 //配置场景
//                 configureScene=
//                 {
//                     (route) => {

//                         //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js

//                         // return Navigator.SceneConfigs.PushFromRight;

//                         return ({
//                             ...Navigator.SceneConfigs.PushFromRight,
//                             gestures: null
//                         });
//                     }
//                 }
//                 renderScene={
//                     (route, navigator) => {
//                         let Component = route.component;
//                         return <Component {...route.params} navigator={navigator} />
//                     }
//                 }></Navigator>
//         );
//     }

// }
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '15869199534',
            Password: '123456',
            obj: '',
            isLogo:false,
            logo: '',
        };
        // this._login = this._login.bind(this);
    }
    render() {
        // alert(this.state.phoneNumber);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        登录
                    </Text>
                </View>
                {
                    this.state.isLogo?<View style={styles.userImg}>
                    <Image style={styles.headImg} source={{uri:this.state.logo}}/>
                </View>:<View style={styles.userImg}>
                    <Image style={styles.headImg} source={require('../../img/login.png')} />
                </View>
                }
                
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
                            {/*this._fetchImgData(text);*/}
                        }}
                    >{this.state.phoneNumber}</TextInput>
                    <TextInput
                        placeholder='请输入密码'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content2}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            this.setState({
                                Password: text
                            });
                        }}
                    >{this.state.Password}</TextInput>
                </View>

                <TouchableOpacity style={styles.btn} onPress={this._loadPage.bind(this)}>
                    <Text style={styles.btnText}>登录</Text>
                </TouchableOpacity>
                <View style={styles.linkWrap}>
                    <Text style={styles.link}
                        onPress={() => this.props.navigation.navigate('Register', {
                            phoneNumber: this.state.phoneNumber,
                            onCallBack: (phoneNumber) => {
                                this.setState({
                                    phoneNumber: phoneNumber
                                })
                            }
                        })}>注册新用户</Text>
                    <Text style={styles.link}></Text>
                    <Text style={styles.link}
                        onPress={() => this.props.navigation.navigate('FogetPassword', {
                            phoneNumber: this.state.phoneNumber,
                            onCallBack: (phoneNumber) => {
                                this.setState({
                                    phoneNumber: phoneNumber
                                })
                            }
                        })}>忘记密码？</Text>
                </View>

            </View>
        );
    }
    _loadPage() {
        //解构 与 模式匹配

        let self = this;
        self._fetchData();
        // alert(self.state.obj.fPassword);
        // if (this.state.obj == '') {
        //     alert('账号或密码不正确，请重新输入');
        //     return;
        // }
        // this.props.navigation.navigate('Index', { MyID: this.state.obj.id });

    }
    // async 
//     _fetchImgData(text) {
// // alert(text);
//         var self = this;
//         Util.get('http://tree.luoyelusheng.cn/data/read?type=friendData', function (data) {
//             if (data.status) {
//                 if (data.data) {
//                     let obj = data.data;
//                     for (var i = 0; i < obj.lenght; i++) {
//                         if (obj[i].fPhone == text) {
//                             self.setState({
//                                 isLogo:true,
//                                 logo: obj[i].fImg,
//                             });
//                             alert(self.state.logo)
//                             break;
//                         }
//                     }
//                 }

//             }
//         }, function (err) {
//             alert(err);
//             alert('服务异常,正在紧急修复,请耐心等待2');
//         });

//     }
    async _fetchData() {

        var self = this;
        url = 'http://tree.luoyelusheng.cn/data/read_My_friendData?fPhone=' + this.state.phoneNumber + '&fPassword=' + this.state.Password;
        Util.get(url, function (data) {
            if (data.status) {
                if (data.data) {
                    let obj = data.data;
                    if (obj == '') {
                        alert('账号或密码不正确，请重新输入');
                        return;
                    } else {
                        self.setState({
                            obj: obj,
                        });
                        self.props.navigation.navigate('Index', { MyID: obj.id, My: obj });
                    }


                } else {
                    self.setState({
                        obj: '',
                    });
                }

            } else {
                alert('服务异常,正在紧急修复,请耐心等待');
            }
            // alert('成功！');
        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待2');
        });

    }

}
const LoginScreen = StackNavigator({
    Login: { screen: Login },
    FogetPassword: { screen: FogetPassword },
    Register: { screen: Register },
    Index: { screen: Index },

}, {
        initialRouteName: 'Login', // 默认显示界面
        navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            header: {  // 导航栏相关设置项

                visible: true,
            },
        },
        mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        onTransitionStart: () => { console.log('导航栏切换开始'); },  // 回调
        onTransitionEnd: () => { console.log('导航栏切换结束'); }  // 回调
    });
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ececec',
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        paddingTop: 12,
        paddingBottom: 12,
        height: 48,
        backgroundColor: '#00b3ca',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headImg: {
        width: 100,
        height: 100,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    userImg: {
        width: width,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
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
    content1: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: '#333',
        fontSize: 16,
        height: 45,
        paddingLeft: 10,
    },
    content2: {
        paddingLeft: 10,
        color: '#333',
        fontSize: 16,
        height: 45,
    },
    wrap: {
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    linkWrap: {
        flex: 1,
        flexDirection: 'row',
        height: 40,
        marginTop: 40,
        // position:'absolute',
        // bottom:0,
        // top:height*8/9,

    },
    link: {
        textAlign: 'center',
        width: width / 3,
        color: '#00b3cb',
    },

});

export default LoginScreen;