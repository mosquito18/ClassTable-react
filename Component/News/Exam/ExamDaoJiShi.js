import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    Platform,
    FlatList,
    ListView,
    TextInput,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import SwipeoutExample from './SwipeoutExample';
import AddExam from './AddExam.js';
import Upadate from './Upadate.js';
export default class ExamDaoJiShi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: '',
            deleteObj: '',
        }
    }
    _onChildChanged(newState) {
        this.setState({
            deleteObj: newState
        });
    }
    render() {
        // alert(this.state.deleteObj);
        var self = this;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => {
                            this.props.navigation.state.params.onCallBacks(this.state.obj, this.state.deleteObj);
                            this.props.navigation.goBack()
                        }}>
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText} onPress={this._pop}>
                        考试倒计时
                    </Text>
                </View>
                <TouchableOpacity style={styles.btn}
                    onPress={() => this.props.navigation.navigate('AddExam', {
                        onCallBack: (obj) => {
                            self.setState({
                                obj: obj
                            })
                        }
                    })}>
                    <Text style={styles.btnText} onPress={this._login}>添加</Text>
                </TouchableOpacity>
                <SwipeoutExample obj={this.state.obj} callbackParent={this._onChildChanged.bind(this)} {...this.props} />
            </View>
        );
    }
}
const styles = StyleSheet.create({
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
    backIcon: {
        color: '#fff',
        fontSize: 28,
        //marginRight:10
    },
    content1: {
        paddingLeft: 10,
        color: '#333',
        fontSize: 18,
    },
    content2: {
        // textAlign:'right',
        position: 'absolute',
        right: 10,
        color: '#333',
        fontSize: 16,
    },
    wrap: {
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#eee',
    },
    btn: {
        marginTop: 20,
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