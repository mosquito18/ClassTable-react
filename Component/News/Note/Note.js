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
import Util from '../../Common/util.js';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
export default class Note extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        笔记
                    </Text>
                </View>
                <View style={styles.wrap}>
                    <Text style={styles.content1}>
                        {this.props.navigation.state.params.fNoteTitle}
                    </Text>
                </View>
                <View style={styles.wrap}>
                    <Text style={styles.content1}>
                        {this.props.navigation.state.params.fNoteTip}
                    </Text>
                </View>
                <View style={styles.wrap}>
                    <Text style={styles.content2}>
                        {this.props.navigation.state.params.fNoteContent}
                    </Text>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => {
                                this._fetchData(this.props.navigation.state.params.fNoteTitle, this.props.navigation.state.params.fNoteTip,this.props.navigation.state.params.fNoteContent);
                                this.props.navigation.goBack()
                            }}>
                    <Text style={styles.btnText}>收藏</Text>
                </TouchableOpacity>
            </View>
        );
    }
        _fetchData(title, tip, content) {
        var self = this;
        url = 'http://tree.luoyelusheng.cn/data/noteData?type=noteData&Title=' + title + '&Tip=' + tip + '&Content=' + content;
        Util.get(url, function (data) {
            if (data.status) {
                let obj = data.info;
                self.setState({
                    obj: obj,
                }); 
            } else {
                alert('服务异常,正在紧急修复,请耐心等待');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待8');
        });

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
        fontSize: 16,
        height: 30,
    },
    content2: {
        paddingLeft: 10,
        paddingRight: 10,
        color: '#333',
        fontSize: 16,
        height: 80,
    },
    wrap: {
        paddingTop: 8,
        marginTop: 15,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#fff',
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