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
import Util from '../../Common/util.js';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
export default class DIYClass extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zhouqi: '1~16',
            week: '一',
            time: '1~3',
            fclassName: '',
            fPlace: '',
            fTeachar: '',
        };
    }
    render() {
        // alert(this.state.zhouqi);
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
                        自定义课程
                    </Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>课程名称：</Text>
                    {/*<Text style={styles.textMessage}>小狐狸</Text>*/}
                    <TextInput
                        placeholder='请输入课程名称'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.textMessage}
                        onChangeText={(text) => {
                            this.setState({
                                fclassName: text
                            });
                        }}
                    >{this.state.fclassName}</TextInput>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>上课地点：</Text>
                    <TextInput
                        placeholder='请输入上课地点'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.textMessage}
                        onChangeText={(text) => {
                            this.setState({
                                fPlace: text
                            });
                        }}
                    >{this.state.fPlace}</TextInput>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>上课教师：</Text>
                    <TextInput
                        placeholder='请输入上课教师'
                        underlineColorAndroid='transparent'
                        keyboardType='default'
                        style={styles.textMessage}
                        onChangeText={(text) => {
                            this.setState({
                                fTeachar: text
                            });
                        }}
                    >{this.state.fTeachar}</TextInput>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>周期：</Text>
                    <Picker
                        style={{ width: width * 4 / 5, position: 'absolute', right: 0 }}
                        selectedValue={this.state.zhouqi}
                        onValueChange={(value) => this.setState({ zhouqi: value })}>
                        <Picker.Item label="1~16" value="1~16" />
                        <Picker.Item label="1~8" value="1~8" />
                        <Picker.Item label="9~16" value="9~16" />
                    </Picker>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>星期：</Text>
                    <Picker
                        style={{ width: width * 4 / 5, position: 'absolute', right: 0 }}
                        selectedValue={this.state.week}
                        onValueChange={(value) => this.setState({ week: value })}>
                        <Picker.Item label="一" value="一" />
                        <Picker.Item label="二" value="二" />
                        <Picker.Item label="三" value="三" />
                        <Picker.Item label="四" value="四" />
                        <Picker.Item label="五" value="五" />
                        <Picker.Item label="六" value="六" />
                        <Picker.Item label="日" value="日" />
                    </Picker>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.textName}>课时：</Text>
                    <Picker
                        style={{ width: width * 4 / 5, position: 'absolute', right: 0 }}
                        selectedValue={this.state.time}
                        onValueChange={(value) => this.setState({ time: value })}>
                        <Picker.Item label="1~3" value="1~3" />
                        <Picker.Item label="1~4" value="1~4" />
                        <Picker.Item label="4~5" value="4~5" />
                        <Picker.Item label="6~8" value="6~8" />
                        <Picker.Item label="10~12" value="10~12" />
                    </Picker>
                </View>

                <TouchableOpacity style={styles.btn} onPress={() => {
                    this._fetchData(this.state.fclassName, this.state.fPlace, this.state.fTeachar, this.state.zhouqi, this.state.time, this.state.week);
                    this.props.navigation.goBack()
                }}>
                    <Text style={styles.btnText}>添加</Text>
                </TouchableOpacity>

            </View>
        );
    }
    _fetchData(fclassName, fPlace, fTeachar, zhouqi, time, week) {
        var self = this;
        url = 'http://tree.luoyelusheng.cn/data/classData?type=classData&fclassName=' + fclassName + '&fPlace=' + fPlace + '&fTeachar=' + fTeachar + '&fzhouqi=' + zhouqi + '&fClasstime=' + time + '&fweek=' + week;
        Util.get(url, function (data) {
            // alert(data.status);
            if (data.status) {
                var obj = data.info;
                
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


                // self.setState({
                //     obj: obj,
                // });

                self.props.navigation.state.params.onCallBack(Mon,Tus,Wes,Thu,Fri,Sat,Sun);
            } else {
                alert('服务异常,正在紧急修复,请耐心等待~');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待14');
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
        marginBottom: 15,
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
        height: 40,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 10,
    },
    textName: {
        fontSize: 18,
        color: 'black',
    },
    textMessage: {
        width: width * 0.7,
        textAlign: 'left',
        fontSize: 16,
        position: 'absolute',
        right: 15,
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