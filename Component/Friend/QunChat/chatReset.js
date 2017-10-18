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
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const {width,height} = Dimensions.get('window');
export default class ChatReset extends Component {
    constructor(props){
        super(props);

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={()=>{this.props.navigation.goBack()}}
                        >
                        <Icon name='ios-arrow-back'
                              style={styles.backIcon}
                            />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        聊天设置
                    </Text>
                </View>
                <View style={styles.tipWrap}>
                    <Text style={styles.tip} numberOfLines={1}>{this.props.navigation.state.params.fqunName}</Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textBtn}>聊天记录</Text>                    
                        <Icon
                            name='ios-arrow-forward'
                            size={28}
                            style={styles.commentIcon} />                   
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textBtn}>聊天背景</Text>                    
                        <Icon
                            name='ios-arrow-forward'
                            size={28}
                            style={styles.commentIcon} />                   
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
        height:50,
        paddingRight:15,     
        alignItems:'center',
        marginBottom:1,
    },
    textBtn:{
        fontSize:18,   
        color:'black',
    },
    commentIcon:{
        justifyContent:'flex-end',
        position:'absolute',
        right:15,
    },
    tipWrap:{
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:15,
        marginTop:15,
        marginBottom:15,
        backgroundColor:'#fff',
    },
    tip:{
        fontSize:18,
        width:width/2,

    },

});