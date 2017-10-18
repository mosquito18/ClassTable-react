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
    Picker,
    Image,
    View
    } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const {width,height} = Dimensions.get('window');
export default class SchoolImport extends Component {
    constructor(props){
        super(props);
        this.state = {
            year: '',
            date:'',
        };

    }
    render() {
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
                        教务导入
                    </Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>教务账号：</Text>                    
                    <TextInput
                        placeholder='请输入教务账号'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.textMessage}
                        multiline={true}
                        />
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>教务密码：</Text>                    
                    <TextInput
                        placeholder='请输入教务密码'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.textMessage}
                        multiline={true}
                        />
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>学年：</Text> 
                    <Picker 
                        style={{width:width*2/5,position:'absolute',right:0}}
                        selectedValue={this.state.year}
                        onValueChange={(value) => this.setState({year: value})}>
                        <Picker.Item label="2015~2016" value="2015~2016" />
                        <Picker.Item label="2016~2017" value="2016~2017" />
                    </Picker> 
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>学期：</Text>                    
                    <Picker 
                        style={{width:width/4,position:'absolute',right:0}}
                        selectedValue={this.state.date}
                        onValueChange={(value) => this.setState({date: value})}>
                        <Picker.Item label="1" value="1" />
                        <Picker.Item label="2" value="2" />
                    </Picker>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => { this.props.navigation.goBack() }}>
                    <Text style={styles.btnText}>导入</Text>
                </TouchableOpacity>

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
        marginBottom:10,
    },
    textName:{
        fontSize:18,
        color:'black',
    },
    textMessage:{
        width:width*0.7,
        textAlign:'left',
        fontSize:16,
        position:'absolute',
        right:15,
    },
    btn: {
        marginTop:30,
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