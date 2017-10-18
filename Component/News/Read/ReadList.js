import React, { Component } from 'react';
import {
    Alert,
    ToastAndroid,
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
    FlatList,
    ScrollView,
    TextInput,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../../Common/util.js';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
export default class ReadList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fqunName: '',
            data: [],
            refreshing: false, //初始化不刷新
            text: '',//跳转的行
            obj: '',

        };
    }
    _keyExtractor = (item, index) => index;
    _renderItem = ({ item, index }) => {
        let time = moment(item.time).format('YYYY-MM-DD HH:mm');
        return (
            <TouchableOpacity style={styles.card}
                onPress={() => this.props.navigation.navigate('ReadContent', { item: item})}>
                <View style={styles.itemView}>
                    <Image style={styles.itemImg} source={{uri:item.img}} />
                    <View style={styles.itmeText}>
                        <Text style={styles.itmeTitle} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.itmeContent}>{time}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => {
                            this.props.navigation.goBack()
                        }}

                    >
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        阅读推荐
                    </Text>
                </View>
                <ScrollView tabLabel="消息">
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
        Util.get('http://tree.luoyelusheng.cn/data/read?type=readData', function (data) {
            if (data.status) {
                let obj = data.data;
                self.setState({
                    obj: obj,
                });
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
        backgroundColor: '#f9f9fb',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        paddingTop: 12,
        paddingBottom: 12,
        height: 48,
        backgroundColor: '#00b3ca',
        flexDirection: 'row',
        paddingLeft: 10,
        // marginBottom: 15,
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
    },
    itemView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height:80,
    },
    itemImg: {
        // borderRadius:20,
        width: 100,
        height: 60,
    },
    itmeText: {
        marginLeft: 10,
    },
    itmeTitle: {
        width:width/2,
        paddingBottom: 3,
        fontSize: 18,
        color: '#333'
    },
    itmeContent: {
        marginTop:5,
    },
    itmeTime: {
        position: 'absolute',
        right: 20,
    },

    card: {
        // marginBottom:1,
        borderBottomWidth: 1,
        borderColor: '#f9f9fb',
    }
});






