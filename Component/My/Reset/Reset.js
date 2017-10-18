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
    Easing,
} from 'react-native';
import Dimensions from 'Dimensions';
import AlertSelected from '../AlertSelected';
import ExamTip from './examTip';
import Icon from 'react-native-vector-icons/Ionicons';
import { StackNavigator, TabNavigator } from 'react-navigation';
const sexArr = ["男", "女"];
const { width, height } = Dimensions.get('window');
import { DrawerNavigator, DrawerItems, } from 'react-navigation';
class Reset extends React.Component {

    // static 
    constructor(props) {
        super(props);
        this.state = {
            value: false,
            trueSwitchIsOn: false,
            falseSwitchIsOn: false,
            valueCN: '',
            trueSwitchIsOnCN: '',
            falseSwitchIsOnCN: '',
            selectTime: '',

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
                    {/*<TouchableOpacity
                        style={styles.backBox}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon1}
                        />
                    </TouchableOpacity>*/}
                    <Image style={styles.headerImg} source={require('../../../img/logo.png')} />
                    <Text style={styles.headerText}>
                        设置
                    </Text>
                </View>

                <View>
                    <View style={styles.textWrap}>
                        <View style={styles.textBtn}>
                            <Text style={styles.textB}>个人资料</Text>
                            <Text style={styles.texts}>{this.state.falseSwitchIsOnCN}{this.state.trueSwitchIsOnCN}{this.state.valueCN}{this.state.selectTime}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => this.props.navigation.navigate('ExamTip', {
                                falseSwitchIsOn: this.state.falseSwitchIsOn,
                                trueSwitchIsOn: this.state.trueSwitchIsOn,
                                value: this.state.value,
                                selectTime: this.state.selectTime,
                                onCallBack: (value, trueSwitchIsOn, falseSwitchIsOn, selectTime) => {
                                    this.setState({
                                        value: value,
                                        trueSwitchIsOn: trueSwitchIsOn,
                                        falseSwitchIsOn: falseSwitchIsOn,
                                        selectTime: selectTime,
                                    })
                                    if (falseSwitchIsOn) {
                                        this.setState({
                                            falseSwitchIsOnCN: '通知、',
                                        })
                                    };
                                    if (trueSwitchIsOn) {
                                        this.setState({
                                            trueSwitchIsOnCN: '声音、',
                                        })
                                    };
                                    if (value) {
                                        this.setState({
                                            valueCN: '振动、',
                                        })
                                    };
                                }
                            })}
                        >
                            <View>
                                <Icon
                                    name='ios-arrow-forward'
                                    size={28}
                                    style={styles.commentIcon1} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textWrap}>
                        <View style={styles.textBtn}>
                            <Text style={styles.textB}>考试提醒</Text>
                            <Text style={styles.texts}>{this.state.falseSwitchIsOnCN}{this.state.trueSwitchIsOnCN}{this.state.valueCN}{this.state.selectTime}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => this.props.navigation.navigate('ExamTip', {
                                falseSwitchIsOn: this.state.falseSwitchIsOn,
                                trueSwitchIsOn: this.state.trueSwitchIsOn,
                                value: this.state.value,
                                selectTime: this.state.selectTime,
                                onCallBack: (value, trueSwitchIsOn, falseSwitchIsOn, selectTime) => {
                                    this.setState({
                                        value: value,
                                        trueSwitchIsOn: trueSwitchIsOn,
                                        falseSwitchIsOn: falseSwitchIsOn,
                                        selectTime: selectTime,
                                    })
                                    if (falseSwitchIsOn) {
                                        this.setState({
                                            falseSwitchIsOnCN: '通知、',
                                        })
                                    };
                                    if (trueSwitchIsOn) {
                                        this.setState({
                                            trueSwitchIsOnCN: '声音、',
                                        })
                                    };
                                    if (value) {
                                        this.setState({
                                            valueCN: '振动、',
                                        })
                                    };
                                }
                            })}
                        >
                            <View>
                                <Icon
                                    name='ios-arrow-forward'
                                    size={28}
                                    style={styles.commentIcon1} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textWrap}>
                        <View style={styles.textBtn}>
                            <Text style={styles.textB}>课前提醒</Text>
                            <Text style={styles.texts}>{this.state.falseSwitchIsOnCN}{this.state.trueSwitchIsOnCN}{this.state.valueCN}{this.state.selectTime}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}
                            onPress={() => this.props.navigation.navigate('ExamTip', {
                                falseSwitchIsOn: this.state.falseSwitchIsOn,
                                trueSwitchIsOn: this.state.trueSwitchIsOn,
                                value: this.state.value,
                                selectTime: this.state.selectTime,
                                onCallBack: (value, trueSwitchIsOn, falseSwitchIsOn, selectTime) => {
                                    this.setState({
                                        value: value,
                                        trueSwitchIsOn: trueSwitchIsOn,
                                        falseSwitchIsOn: falseSwitchIsOn,
                                        selectTime: selectTime,
                                    })
                                    if (falseSwitchIsOn) {
                                        this.setState({
                                            falseSwitchIsOnCN: '通知、',
                                        })
                                    };
                                    if (trueSwitchIsOn) {
                                        this.setState({
                                            trueSwitchIsOnCN: '声音、',
                                        })
                                    };
                                    if (value) {
                                        this.setState({
                                            valueCN: '振动、',
                                        })
                                    };
                                }
                            })}
                        >
                            <View>
                                <Icon
                                    name='ios-arrow-forward'
                                    size={28}
                                    style={styles.commentIcon1} />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.wrap}>
                    <View style={styles.textWrap}>
                        <View style={styles.textBtn}>
                            <Text style={styles.textB}>推荐给好友</Text>
                        </View>
                        <TouchableOpacity style={styles.btn} onPress={this.showAlertSelected.bind(this)}
                        >
                            <View>
                                <Icon
                                    name='ios-arrow-forward'
                                    size={28}
                                    style={styles.commentIcon1} />
                            </View>
                        </TouchableOpacity>


                    </View>
                    <View style={styles.textWrap}>
                        <View style={styles.textBtn}>
                            <Text style={styles.textB}>清除缓存</Text>
                        </View>
                        <Icon
                            name='ios-arrow-forward'
                            size={28}
                            style={styles.commentIcon} />
                    </View>
                    <View style={styles.textWrap}>
                        <View style={styles.textBtn}>
                            <Text style={styles.textB}>版本更新</Text>
                        </View>
                        <Text style={styles.textsr}>有版本更新</Text>
                        <Icon
                            name='ios-arrow-forward'
                            size={28}
                            style={styles.commentIcon} />
                    </View>

                </View>
                <AlertSelected ref="alertSelected" />
            </View>
        );
    }
}
const ResetScreen = StackNavigator({
    Reset: {
        screen: Reset,
        navigationOptions: {
            //{ focused: boolean, tintColor: string }

        }
    },
    ExamTip: { screen: ExamTip },

}, {
        initialRouteName: 'Reset', // 默认显示界面
        navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
            header: {  // 导航栏相关设置项

                visible: true,
            },
                        drawerLabel: () => (
                <View style={styles.row}><Text style={styles.rowText}>设置</Text></View>
            ),
            //{ focused: boolean, tintColor: string }
            drawerIcon: () => (
                <Icon name='ios-settings-outline'
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
        // marginBottom: 1,
        // borderBottomWidth: 1,
        // borderColor:'gray'
    },
    rowText: {
        fontSize: 17,
    },
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
        marginBottom: 15,
    },
    headerImg: {
		width: 24,
		height: 18,
		marginTop:5,
    },
    headerEdit: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        position: 'absolute',
        right: 15,
        top: 12,
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
    backIcon1: {
        color: '#fff',
        fontSize: 28,
        //marginRight:10
    },
    textWrap: {
        paddingLeft: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 60,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 1,
    },
    textBtn: {
        flexDirection: 'column',
    },
    commentIcon: {
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 15,
    },
    textB: {
        fontSize: 18,
        color: 'black',
    },
    texts: {
        fontSize: 14,
    },
    textsr: {
        fontSize: 14,
        position: 'absolute',
        right: 35,
    },
    wrap: {
        marginTop: 10,
    },
    btn: {
        position: 'absolute',
        right: 15,
        width: 20,
    },
    commentIcon1: {
        textAlign: 'right',
        justifyContent: 'flex-end',
    },
    itemText: {
        fontSize: 15,
        color: '#ffffff',
        textAlign: 'left',
        marginLeft: 20,
    },
});
export default ResetScreen;