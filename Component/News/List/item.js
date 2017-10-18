/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    Image,
    Text,
    View
} from 'react-native';

import Dimensions from 'Dimensions';

import Icon from 'react-native-vector-icons/Ionicons';
import config from '../../Common/config';
import request from '../../Common/request';


const {width,height} = Dimensions.get('window');

export default class Item extends Component {
    constructor(props){
        super(props);

        this.state={
            rowData: this.props.rowData,
            up: this.props.rowData.voted,

        }
    }


    _up=()=>{

        let up = !this.state.up
        let rowData = this.state.rowData;
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

        let rowData =this.state.rowData

        return (
            <TouchableHighlight  onPress={this.props.onSelect}>


                <View style={styles.item}>

                    <Text style={styles.title}>{rowData.title}</Text>

                    <Image style={styles.thumb} source={{uri:rowData.thumb}}>

                        <Icon
                            name='ios-play'
                            size={28}
                            style={styles.play} />


                    </Image>

                    <View style={styles.itemFooter}>

                        <View style={styles.handleBox}>

                            <Icon
                                name={this.state.up ? 'ios-heart':'ios-heart-outline'}
                                size={28}
                                onPress={this._up}
                                style={[styles.up,this.state.up ? null : styles.down]} />

                            <Text style={styles.handleText} onPress={this._up}>点赞</Text>


                        </View>


                        <View style={styles.handleBox}>

                            <Icon
                                name='ios-chatbubbles'
                                size={28}
                                style={styles.commentIcon} />

                            <Text style={styles.handleText}>评论</Text>


                        </View>




                    </View>






                </View>



            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({

    item:{
        width:width,
        marginBottom:10,
        backgroundColor:'white'
    },


    title:{
        fontSize:18,
        padding:10,
        color:'#333'
    },

    thumb:{
        width:width,
        height:width*0.56,
        resizeMode:'cover'
    },

    play:{
        position:'absolute',
        bottom:14,
        right:14,
        width:46,
        height:46,
        paddingTop:9,
        paddingLeft:18,
        backgroundColor:'transparent',
        borderColor:'#000',
        borderWidth:1,
        borderRadius:23,
        color:'#00b3ca'
    },


    itemFooter:{
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#eee'
    },

    handleBox:{
        padding:10,
        flexDirection:'row',
        width: width/2 - 0.5,
        justifyContent:'center',
        backgroundColor:'white',
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
        fontSize:22,
        color:'#333'
    },



    handleText:{
        fontSize:18,
        color:'#333',
        paddingLeft:12,
    },

});

