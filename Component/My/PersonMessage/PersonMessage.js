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
import { BlurView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import EditPerson from './editPerson';
import Util from '../../Common/util.js';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { DrawerNavigator, DrawerItems, } from 'react-navigation';
const { width, height } = Dimensions.get('window');
class PersonMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewRef: 0,
            obj: '',
            isBlur: false,

        };
    }

    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }

    render() {
        // alert(this.props.navigation.state.params.My.fName);
        // alert(this.state.obj.fName);
        // alert(this.state.isBlur);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.headerImg} source={require('../../../img/logo.png')} />
                    <Text style={styles.headerText}>
                        个人资料
                    </Text>
                    <Text style={styles.headerEdit}
                        onPress={() => this.props.navigation.navigate('EditPerson', {
                            obj: this.state.obj,
                            id: this.props.navigation.state.params.MyID,
                            onCallBack: (obj, isBlur) => {
                                this.setState({
                                    obj: obj,
                                    isBlur: isBlur
                                })
                            }
                        })}>
                        编辑
                    </Text>
                </View>
                {/*{
                    this.state.isBlur ?  */}
                    <View style={styles.container1}>
                            <Image
                                ref={(img) => { this.backgroundImage = img; }}
                                source={{ uri: this.state.obj.fImg }}
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
                                source={{ uri: this.state.obj.fImg }}
                            ></Image>
                        </View>
                        {/*:<View style={styles.container1}>
                        <Image
                            source={{ uri: this.state.obj.fImg }}
                            style={styles.imgBig}
                        >
                            <Image
                                style={styles.avatar}
                                source={{ uri: this.state.obj.fImg }}
                            ></Image>
                        </Image>
                    </View>
                }*/}


                <View style={styles.textWrap}>
                    <Text style={styles.textName}>昵称：</Text>
                    <Text style={styles.textMessage}>{this.state.obj.fJianame}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>姓名：</Text>
                    <Text style={styles.textMessage}>{this.state.obj.fName}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>年龄：</Text>
                    <Text style={styles.textMessage}>{this.state.obj.fAge}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>性别：</Text>
                    <Text style={styles.textMessage}>{this.state.obj.fSex}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>学校：</Text>
                    <Text style={styles.textMessage}>{this.state.obj.fSchool}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>学院：</Text>
                    <Text style={styles.textMessage}>{this.state.obj.fXueyuan}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>入学时间：</Text>
                    <Text style={styles.textMessage}>{this.state.obj.fCometime}年</Text>
                </View>

            </View>
        );
    }
    componentDidMount() {
        var self = this;
        var i=0;
        this.timer = setTimeout(function () {
            self._fetchData();
        }, 100);

    }

    componentWillUnmount() {
        // 请注意Un"m"ount的m是小写

        // 如果存在this.timer，则使用clearTimeout清空。
        // 如果你使用多个timer，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.timer && clearTimeout(this.timer);
    }

    _fetchData() {
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=friendData', function (data) {
            if (data.status) {
                let obj = data.data;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id == self.props.navigation.state.params.MyID) {
                        self.setState({
                            obj: obj[i],
                        });
                        break;
                    }
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
const PersonMessageScreen = StackNavigator({
    PersonMessage: {
        screen: PersonMessage,
        navigationOptions: {
            //{ focused: boolean, tintColor: string }

        }
    },
    EditPerson: { screen: EditPerson },

}, {
        initialRouteName: 'PersonMessage', // 默认显示界面
        navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            header: {  // 导航栏相关设置项

                visible: true,
            },
            drawerLabel: () => (
                <View style={styles.row}><Text style={styles.rowText}>个人资料</Text></View>
            ),
            //{ focused: boolean, tintColor: string }
            drawerIcon: () => (
                <Icon name='ios-person-outline'
                    style={styles.backIconB}
                />
            ),
        },
        mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
        headerMode: 'none', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
        onTransitionStart: () => { console.log('导航栏切换开始'); },  // 回调
        onTransitionEnd: () => { console.log('导航栏切换结束'); }  // 回调
    });

const styles = StyleSheet.create({
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBig: {
        width: width,
        height: width * 0.4,
        marginBottom: width * 0.2
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    avatar: {
        position: 'absolute',
        top: width * 0.4 - width * 0.15,
        left: width * 0.35,
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
        // marginBottom: 15,
    },
    headerImg: {
		width: 24,
		height: 18,
		marginTop:5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        paddingLeft: 10,
    },
    headerEdit: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        position: 'absolute',
        right: 15,
        top: 12,
    },
    icon: {
        width: 24,
        height: 24,
    },
    backIcon: {
        fontSize: 27,
    },
    backIconB: {
        fontSize: 30,
    },
    row: {
        height: 40,
        justifyContent: 'center',
    },
    rowText: {
        fontSize: 17,
    },
    backIcon1: {
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
        borderBottomWidth: 1,
        borderColor: '#dedfe1',
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
});
export default PersonMessageScreen;