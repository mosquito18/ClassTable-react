import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    DatePickerAndroid,
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
import moment from 'moment';
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');
class Button extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.button}
                onPress={this.props.onPress}>
                <Text style={styles.buttonText}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}
export default class ToggleAnimatingActivityIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anim: [1, 2, 3].map(() => new Animated.Value(0)), //初始化3个值
            pressDate: new Date(2016, 3, 11),
            allDate: new Date(),
            simpleText: '选择日期，默认今天',
            minText: '选择日期，不能比今日再早',
            maxText: '选择日期，不能比今日再晚',
            presetText: '请选择日期',

        };

    }

    //进行创建时间日期选择器,创建一个'openDataPicker'（名字自定义）
    async openDataPicker(stateKey, options) {
        try {
            var newState = {};
            const { action, year, month, day } = await DatePickerAndroid.open(options);
            if (action === DatePickerAndroid.dismissedAction) {
                newState[stateKey + 'Text'] = 'dismissed';
            } else {
                var dates = new Date(year, month, day);
                var date = moment(dates).format('YYYY-MM-DD');
                // alert(date);
                this.setState({
                    time: date
                });
                // alert(date);
                // 这里要注意：setState 是一个异步方法，所以需要操作缓存的当前值
                this.props.callbackParent(date);

                newState[stateKey + 'Text'] = date;
                newState[stateKey + 'Date'] = date;
            }

            this.setState(newState);
        } catch ({ code, message }) {
            console.warn("Error in example '${stateKey}': ", message)
        }
    }
    componentDidMount() {
        if(this.props.times){
            this.setState({presetText:this.props.times});            
        }

        var timing = Animated.timing;
        Animated.sequence([
            Animated.stagger(200, this.state.anim.map((left) => {
                return timing(left, {
                    toValue: 1,
                });
            }).concat(
                this.state.anim.map((left) => {
                    return timing(left, {
                        toValue: 0,
                    })
                })
                )), //三个view滚到右边在还原，每个动作间隔200ms
            Animated.delay(400), //延迟400ms，配合sequence使用
            timing(this.state.anim[0], {
                toValue: 1
            }),
            timing(this.state.anim[0], {
                toValue: -1
            }),
            timing(this.state.anim[0], {
                toValue: 0.5
            }),
            Animated.parallel(this.state.anim.map((anim) => timing(anim, {
                toValue: 0
            }))) //同时回到原位置
        ]).start();
    }


    render() {

        // alert(this.props.time);

        // alert(this.props.times);
        var views = this.state.anim.map(function (value, i) {
            return (
                <Animated.View
                    key={i}
                    style={[styles.demo, {
                        left: value.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 200]
                        })
                    }]}>
                </Animated.View>
            );
        });
        return (
            <View>
                <Button text={this.state.presetText}
                    onPress={this.openDataPicker.bind(this, 'preset', { date: this.state.allDate })} />

            </View>
        )
    }
}

var styles = StyleSheet.create({
    demo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    text: {
        fontSize: 30
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        marginTop: 15,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#eee',
        margin: 5,
        padding: 15,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#cdcdcd',
    }
});