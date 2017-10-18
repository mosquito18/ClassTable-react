import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Platform,
    TextInput,
    Image,
    Text,
    View
} from 'react-native';

import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
export default class CETCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            Password: '',
            obj: '',
        };
        // this._login = this._login.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => {
                                this.props.navigation.goBack()
                        }}>
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        四六级成绩查询
                    </Text>
                </View>
                <View style={styles.container}>
                    <View style={styles.wrap}>
                        <Text style={styles.Title}>2017年夏季</Text>
                        <TextInput
                            placeholder='请填写准考证号'
                            underlineColorAndroid='transparent'
                            keyboardType='default'
                            style={styles.content1}
                            onChangeText={(text) => {
                                this.setState({
                                    phoneNumber: text
                                });
                            }}
                        >{this.state.phoneNumber}</TextInput>
                        <TextInput
                            placeholder='请填写对应考生姓名'
                            underlineColorAndroid='transparent'
                            keyboardType='default'
                            style={styles.content2}
                            onChangeText={(text) => {
                                this.setState({
                                    Password: text
                                });
                            }}
                        >{this.state.Password}</TextInput>


                    </View>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.btnText}>查询</Text>
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
    header: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        paddingTop: 12,
        paddingBottom: 12,
        height: 48,
        backgroundColor: '#00b3ca',
        flexDirection: 'row',
        paddingLeft: 10,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        position: 'absolute',
        left: 30,
        top: 12,
    },
    headerEdit: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        position: 'absolute',
        right: 15,
        top: 12,
    },
    backBox: {
        position: 'absolute',
        left: 10,
        top: 12,
        width: 20,
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor:'yellow',
    },
    backIcon: {
        color: '#fff',
        fontSize: 28,
        //marginRight:10
    },
    Bg: {
        width: width,
        resizeMode: 'cover',
        height: (height - 48) / 2,
    },
    commentIcon: {
        fontSize: 100,
        position: 'absolute',
        right: 30,
        top: ((height - 48) / 2 - 100) / 2,
        color: '#fff',
    },
    CheckText: {
        position: 'absolute',
        left: 50,
        top: ((height - 48) / 2 - 30) / 2,
        color: '#fff',
        fontSize: 30,
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
        marginTop:100,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    Title: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        color: '#000',
        fontSize: 18,
        height: 45,
        paddingTop: 10,
        paddingLeft: 10,
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
});