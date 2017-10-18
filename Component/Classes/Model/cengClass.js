import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    Platform,
    ScrollView,
    FlatList,
    TextInput,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../../Common/util.js';
const { width, height } = Dimensions.get('window');
export default class CengClass extends Component {
    //<Image style={styles.headerImg} source={require('../../img/logo.png')} />
    constructor(props) {
        super(props);
        this.state = {
            obj: '',
        }

    }
    _keyExtractor = (item, index) => index;
    _renderItem = ({ item, index }) => {
        return (
            <View style={styles.classWrap}>
                <View style={styles.classNews}>
                    <Text style={styles.title}>{item.fclassName}</Text>
                    <View style={styles.row}>
                        <Text style={styles.fonts}>老师：</Text><Text style={styles.fonts}>{item.fTeachar}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.fonts}>教室：</Text><Text style={styles.fonts}>{item.fPlace}</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.fonts}>时间：</Text><Text style={styles.fonts}>{item.fzhouqi}周 周{item.fweek} {item.fClasstime}节</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => {
                    this._fetchAddData(item.fclassName, item.fPlace, item.fTeachar, item.fzhouqi, item.fClasstime, item.fweek);
                }}>
                    <Text style={styles.btnText}>添加到课表</Text>
                </TouchableOpacity>
            </View>
        );
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
                        蹭课
                    </Text>
                </View>
                <View style={styles.inputWrap}>
                    <TextInput
                        placeholder='搜索'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.content2}
                        multiline={true}
                    />
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.obj}
                        //使用 ref 可以获取到相应的组件
                        ref={(flatList) => this._flatList = flatList}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </ScrollView>

            </View>
        );
    }
    componentDidMount() {
        this._fetchData();

    }
    _fetchData() {
        var self = this;
        var isTrue = true;
        var arr = [];
        Util.get('http://tree.luoyelusheng.cn/data/read?type=classesData', function (data) {
            if (data.status) {
                var obj = data.data;
                Util.get('http://tree.luoyelusheng.cn/data/read?type=classData', function (data) {
                    if (data.status) {
                        var objs = data.data;
                        for (var i = 0; i < obj.length; i++) {
                            for (var j = 0; j < objs.length; j++) {
                                if (obj[i].fclassName == objs[j].fclassName) {
                                    isTrue = false;
                                    break;
                                }
                            }
                            if (isTrue) {
                                arr.push(obj[i]);
                            }
                        }
                        self.setState({
                            obj: arr,
                        });
                    } else {
                        alert('服务异常,正在紧急修复,请耐心等待');
                    }

                }, function (err) {
                    alert(err);
                    alert('服务异常,正在紧急修复,请耐心等待2');
                });

            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待2');
        });

    }
    _fetchAddData(fclassName, fPlace, fTeachar, zhouqi, time, week) {
        var self = this;
        url = 'http://tree.luoyelusheng.cn/data/classData?type=classData&fclassName=' + fclassName + '&fPlace=' + fPlace + '&fTeachar=' + fTeachar + '&fzhouqi=' + zhouqi + '&fClasstime=' + time + '&fweek=' + week;
        Util.get(url, function (data) {
            // alert(data.status);
            if (data.status) {
                self._fetchData();
                Util.get('http://tree.luoyelusheng.cn/data/read?type=classData', function (data) {
                    if (data.status) {
                        var obj=data.data;
                var Mon = [];
                var Tus = [];
                var Wes = [];
                var Thu = [];
                var Fri = [];
                var Sat = [];
                var Sun = [];
                for (var x = 0; x < obj.length; x++) {
                    if (obj[x].fweek == '一') {
                        Mon.push(obj[x]);
                    } else if (obj[x].fweek == '二') {
                        Tus.push(obj[x]);
                    } else if (obj[x].fweek == '三') {
                        Wes.push(obj[x]);
                    } else if (obj[x].fweek == '四') {
                        Thu.push(obj[x]);
                    } else if (obj[x].fweek == '五') {
                        Fri.push(obj[x]);
                    } else if (obj[x].fweek == '六') {
                        Sat.push(obj[x]);
                    } else if (obj[x].fweek == '日') {
                        Sun.push(obj[x]);
                    }
                }
                if (Mon.length > 1) {
                    for (var y = 0; y < Mon.length - 1; y++) {
                        for (var z = 1; z < Mon.length; z++) {
                            let str = Mon[y].fClasstime.split("~");
                            let strs = Mon[z].fClasstime.split("~");
                            if (strs[0] < str[0]) {
                                let temp = Mon[y];
                                Mon[y] = Mon[z];
                                Mon[z] = temp;
                            }
                        }
                    }
                }
                if (Tus.length > 1) {
                    for (var y = 0; y < Tus.length - 1; y++) {
                        for (var z = 1; z < Tus.length; z++) {
                            let str = Tus[y].fClasstime.split("~");
                            let strs = Tus[z].fClasstime.split("~");
                            if (strs[0] < str[0]) {
                                let temp = Tus[y];
                                Tus[y] = Tus[z];
                                Tus[z] = temp;
                            }
                        }
                    }
                }
                if (Wes.length > 1) {
                    for (var y = 0; y < Wes.length - 1; y++) {
                        for (var z = 1; z < Wes.length; z++) {
                            let str = Wes[y].fClasstime.split("~");
                            let strs = Wes[z].fClasstime.split("~");
                            if (strs[0] < str[0]) {
                                let temp = Wes[y];
                                Wes[y] = Wes[z];
                                Wes[z] = temp;
                            }
                        }
                    }
                }
                if (Thu.length > 1) {
                    for (var y = 0; y < Thu.length - 1; y++) {
                        for (var z = 1; z < Thu.length; z++) {
                            let str = Thu[y].fClasstime.split("~");
                            let strs = Thu[z].fClasstime.split("~");
                            if (strs[0] < str[0]) {
                                let temp = Thu[y];
                                Thu[y] = Thu[z];
                                Thu[z] = temp;
                            }
                        }
                    }
                }
                if (Fri.length > 1) {
                    for (var y = 0; y < Fri.length - 1; y++) {
                        for (var z = 1; z < Fri.length; z++) {
                            let str = Fri[y].fClasstime.split("~");
                            let strs = Fri[z].fClasstime.split("~");
                            if (strs[0] < str[0]) {
                                let temp = Fri[y];
                                Fri[y] = Fri[z];
                                Fri[z] = temp;
                            }
                        }
                    }
                }
                if (Sat.length > 1) {
                    for (var y = 0; y < Sat.length - 1; y++) {
                        for (var z = 1; z < Sat.length; z++) {
                            let str = Sat[y].fClasstime.split("~");
                            let strs = Sat[z].fClasstime.split("~");
                            if (strs[0] < str[0]) {
                                let temp = Sat[y];
                                Sat[y] = Sat[z];
                                Sat[z] = temp;
                            }
                        }
                    }
                }
                if (Sun.length > 1) {
                    for (var y = 0; y < Sun.length - 1; y++) {
                        for (var z = 1; z < Sun.length; z++) {
                            let str = Sun[y].fClasstime.split("~");
                            let strs = Sun[z].fClasstime.split("~");
                            if (strs[0] < str[0]) {
                                let temp = Sun[y];
                                Sun[y] = Sun[z];
                                Sun[z] = temp;
                            }
                        }
                    }
                }
                self.props.navigation.state.params.onCallBack(Mon, Tus, Wes, Thu, Fri, Sat, Sun);
                    }
                }, function (err) {
                    alert(err);
                    alert('服务异常,正在紧急修复,请耐心等待2');
                });
            } else {
                alert('服务异常,正在紧急修复,请耐心等待~');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待9');
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
    inputWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        backgroundColor: '#fff',
        height: 60,
    },
    content2: {
        backgroundColor: '#f3f3f3',
        paddingLeft: 10,
        color: '#333',
        fontSize: 16,
        height: 40,
        width: width - 30,
    },
    btn: {
        width: width * 0.25,
        position: 'absolute',
        right: 15,
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
    row: {
        flexDirection: 'row',
    },
    classWrap: {
        borderTopWidth: 1,
        borderColor: '#dedfe1',
        alignItems: 'center',
        height: 120,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    fonts: {
        fontSize: 16,
        color: 'black',
    },
    title: {
        fontSize: 18,
        color: 'black',
        paddingBottom: 3,
    },
});