import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native';
import ZoomImage from 'react-native-zoom-image';
import {Easing} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../Common/config';
import request from '../Common/request';
import moment from 'moment';
const {width,height} = Dimensions.get('window');
export default class Item extends Component {
    constructor(props){
        super(props);
        this.state={
            rowData: this.props.rowData,
            up: this.props.rowData.voted,
            createTime:moment().format('MM月DD日 HH:mm'),
        }
    }
    _up=()=>{
        let up = !this.state.up;
        let rowData = this.state.rowData;
        //let createTime = this.state.createTime;
        let url = config.api.base+ config.api.up;
        let body = {
            id:rowData._id,
            up: up ? 'yes' : 'no',
            accessToken:'www'
        }
        request.post(url,body)
            .then(
                (data)=>{
                    if(data && data.success){
                        this.setState({
                            up:up
                        });
                    }else {
                        alert('网络错误，请稍后重试！')
                    }
                }
            ).catch(
            (err)=>{
                alert('网络错误，请稍后重试！')
            }
        );
    }
    render() {
        let rowData =this.state.rowData;
        //let createTime=this.state.createTime;
        return (
            <View style={styles.item}>
                <View style={styles.flexDirection}>
                    <Image style={styles.headImg} source={require('../../img/head.png')} />
                    <View>
                        <Text style={styles.headText} >小邦树洞墙</Text>
                        <Text style={styles.headTime}>{this.state.createTime}</Text>
                    </View>
                    <View style={styles.handleBox}>
                        <TouchableOpacity onPress={this.props.onSelect}>
                            <View style={styles.btn}>
                                <Icon
                                    name='ios-chatbubbles'
                                    size={28}
                                    style={styles.commentIcon} />
                                <Text style={styles.handleText}>评论</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles.title}>{rowData.content}</Text>

                    <ZoomImage
                        source={{uri:rowData.img}}
                        imgStyle={{width:width-20,height:(width-20)*0.56}}
                        style={styles.thumb}
                        duration={200}
                        enableScaling={false}
                        easingFunc={Easing.ease}
                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    item:{
        width:width,
        paddingBottom:10,
        borderBottomWidth:5,
        borderBottomColor:'#dedfe1',
        backgroundColor:'white',
    },
    title:{
        fontSize:18,
        paddingLeft:10,
        paddingBottom:10,
        lineHeight:27,
        color:'#333'
    },
    thumb:{

        marginLeft:10,
        // resizeMode:'cover'
    },
    handleBox:{
        paddingRight:10,
        flexDirection:'row',
        width:width*0.4,
        marginLeft:width*0.2,
        justifyContent:'flex-end',
    },
    up:{

        fontSize:22,
        color:'#ed7b66'
    },
    down:{
        fontSize:22,
        color:'#333'
    },
    commentIcon:{
        fontSize:20,
    },
    handleText:{
        fontSize:18,
        paddingLeft:8,
        alignItems:'flex-end',
    },
    headImg:{
        width:40,
        height:40,
        margin:10,
    },
    flexDirection:{
        width:width,
        flex:1,
        flexDirection:'row',
    },
    headText:{
        marginTop:10,
        fontSize:18,
    },
    headTime:{
    },
    btn:{
        paddingTop:20,
        paddingBottom:20,
        flexDirection:'row',
        marginRight:10,
    },
});

