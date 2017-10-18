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
    FlatList,
    Image,
    TouchableHighlight,
    Animated,
    ScrollView,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Panel from '../Panel';
import Util from '../../Common/util.js';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
export default class MyNoteMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: this.props.navigation.state.params.Title,
            obj: '',
        }
    }
    _keyExtractor = (item, index) => index;
    _renderItem = ({ item, index }) => {
        if (item.Tip != '' || item.Content != '') {
            return (
                <View style={styles.wrap}>
                    <View style={styles.Message}>
                        <Text style={styles.MessageTip}>{item.Tip}</Text>
                        <Text style={styles.MessageTitle}>{item.Content}</Text>
                    </View>
                    <TouchableOpacity style={styles.btn}
                        onPress={() => this.props.navigation.navigate('MyNoteUpadate', {
                            item: item,
                            onCallBack: (obj) => {
                                this.setState({
                                    obj: obj,
                                })
                            }
                        })}>
                        <Text style={styles.btnText}>编辑</Text>
                    </TouchableOpacity>

                </View>
            );
        } else {
            return;
        }

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
                        我的笔记
                    </Text>
                    <Icon name='md-search'
                        size={28}
                        style={styles.headerDelete}
                    />
                    <TouchableOpacity style={styles.headerEdit}
                        onPress={() => this.props.navigation.navigate('AddNote', {
                            Title:this.state.Title,
                            onCallBack: (obj) => {
                                let arr = [];
                                for (var i = 0; i < obj.length; i++) {
                                    if (this.state.Title == obj[i].Title) {
                                        arr.push(obj[i]);
                                    }
                                }
                                this.setState({
                                    obj: arr,
                                })
                            }
                        })}
                    >
                        <View>
                            <Icon style={{ color: '#fff' }}
                                name='md-add'
                                size={28} />
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <Panel title={this.state.Title}>
                        <FlatList
                            data={this.state.obj}
                            //使用 ref 可以获取到相应的组件
                            ref={(flatList) => this._flatList = flatList}
                            keyExtractor={this._keyExtractor}
                            //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
                            //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
                            //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
                            getItemLayout={(data, index) => ({ length: 44, offset: (44 + 1) * index, index })}
                            renderItem={this._renderItem}
                        />
                    </Panel>
                </ScrollView>

            </View>
        );
    }
    componentDidMount() {
        this._fetchData();

    }
    _fetchData(callback) {
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=noteData', function (data) {
            if (data.status) {
                let objs = data.data;
                let arr = [];
                for (var i = 0; i < objs.length; i++) {
                    if (self.state.Title == objs[i].Title) {
                        arr.push(objs[i]);
                    }
                }

                self.setState({
                    obj: arr,
                    refreshing: false
                });
                // alert(obj[2].Title);
                // alert(self.state.hotTopic[0].English);
            } else {
                alert('服务异常,正在紧急修复,请耐心等待');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待2');
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
    textWrap: {
        paddingLeft: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 50,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 1,
    },
    textBtn: {
        fontSize: 18,
        color: 'black',
    },
    commentIcon: {
        justifyContent: 'flex-end',
        position: 'absolute',
        right: 15,
    },
    textName: {
        fontSize: 18,
        color: 'black',
    },
    textMessage: {
        fontSize: 16,
        position: 'absolute',
        right: 15,
    },
    headerEdit: {
        position: 'absolute',
        right: 15,
        top: 12,
    },
    headerDelete: {
        color: '#fff',
        position: 'absolute',
        right: 50,
        top: 12,
    },

    btn: {

        // backgroundColor:'yellow',
        // marginTop:30,
        width: width * 0.17,
        marginLeft: width * 0.03,
        marginRight: width * 0.03,
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
    wrap: {
        borderTopWidth: 15,
        borderColor: '#dedfe1',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
    },
    Message: {
        // backgroundColor: 'red',
        width: width * 0.74,
        marginLeft: width * 0.03,
    },
    MessageTip: {
        fontSize: 18,
        marginBottom: 10,
    },
    MessageTitle: {
        fontSize: 16,
    },

});