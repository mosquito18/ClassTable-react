import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    TouchableHighlight,
    TimePickerAndroid,
    ToastAndroid,
    Text,
    Switch,
    Platform,
    ListView,
    TextInput,
    Image,
    View
    } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const {width,height} = Dimensions.get('window');


export default class ExamTip extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: this.props.navigation.state.params.value,
            trueSwitchIsOn: this.props.navigation.state.params.trueSwitchIsOn,  
            falseSwitchIsOn: this.props.navigation.state.params.falseSwitchIsOn,
            selectTime:this.props.navigation.state.params.selectTime,
        };
    }

  //进行弹出时间选择器
async showPicker(options) {
    try {
      const {action, minute, hour} = await TimePickerAndroid.open(options);
      if (action === TimePickerAndroid.timeSetAction) {
          this.setState(
            {
              selectTime:this._formatTime(hour,minute),
            }
          );
         ToastAndroid.show('选择的时间为:'+this._formatTime(hour,minute),ToastAndroid.SHORT);
      } else if (action === TimePickerAndroid.dismissedAction) {
        ToastAndroid.show('选择器关闭取消',ToastAndroid.SHORT);
      }
    } catch ({code, message}) {
      ToastAndroid.show('错误信息:'+message,ToastAndroid.SHORT);
    }
  }
_formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={()=>{
                            this.props.navigation.state.params.onCallBack(this.state.value,this.state.trueSwitchIsOn,this.state.falseSwitchIsOn,this.state.selectTime),
                            this.props.navigation.goBack() }}

                        >
                        <Icon name='ios-arrow-back'
                              style={styles.backIcon}
                            />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        考试提醒
                    </Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>通知</Text>                    
                    <Switch  
                        style={styles.btnSwitch} 
                        onValueChange={(value) =>{
                            this.setState({falseSwitchIsOn: value})
                            }
                        }   
                        value={this.state.falseSwitchIsOn}/>                    
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>声音</Text>                    
                    <Switch  
                        style={styles.btnSwitch} 
                        onValueChange={(value) =>this.setState({trueSwitchIsOn: value})}  
                        value={this.state.trueSwitchIsOn}/>                    
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>振动</Text>                    
                    <Switch
                        style={styles.btnSwitch} 
                        value={this.state.value}
                        onValueChange={(value)=>{
                            this.setState({
                                value:value,
                            });
                        }}/>                  
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>提醒时间</Text>
                    <Text style={styles.selectTime}>{this.state.selectTime}</Text>                    
                    <TouchableOpacity  style={styles.btn}
                              onPress={this.showPicker.bind(this,{
                                hour: 7,
                                minute: 14,
                                is24Hour:true,
                    })}>
                        <View>
                            <Icon
                            name='ios-arrow-down'
                            size={28}
                            style={styles.commentIcon1} />  
                        </View>
                    </TouchableOpacity>                
                </View>
            </View>
        );
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
        marginBottom:15,
    },
    headerEdit:{
        fontSize:20,
        fontWeight:'600',
        color:'#fff',
        position:'absolute',
        right:15,
        top:12,
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
    textWrap:{
        paddingLeft:15,
        backgroundColor:'#fff',
        flexDirection:'row',
        height:40,
        paddingRight:15,     
        alignItems:'center',
        marginBottom:1,
    },
    textName:{
        fontSize:18,
        color:'black',
    },
    textMessage:{
        fontSize:16,
        position:'absolute',
        right:15,
    },
    btnSwitch:{
        position:'absolute',
        right:15,
    },
    btn:{
        position:'absolute',
        right:20,
        width:20,
    },
    commentIcon1:{
        textAlign:'right',
        justifyContent:'flex-end',
        // position:'absolute',
        // right:15,
    },
    selectTime:{
        position:'absolute',
        right:50,
        textAlign:'right',
    },

});