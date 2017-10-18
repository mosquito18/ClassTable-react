import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    Button,
    View,
    Modal
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
class Message extends Component {
    async getCityInfos() {
        let QunNewsData = await require('../../../json/qunnews.json');
        this.setState({ data: QunNewsData })
    }
    constructor(props) {
        super(props);
        this.state = {
            fqunName: '',
            data: [],
            refreshing: false, //初始化不刷新
            text: '',//跳转的行
        };
        this.getCityInfos();

    }
    _keyExtractor = (item, index) => index;
    _renderItem = ({ item, index }) => {

        return (
            <TouchableOpacity style={styles.card}
                onPress={() => this.props.navigation.navigate('QunChat', { fqunName: item.fqunName })}>
                <View style={styles.itemView}>
                    <Image style={styles.itemImg} source={require('../login.png')} />
                    <View style={styles.itmeText}>
                        <Text style={styles.itmeTitle}>{item.fqunName}</Text>
                        <Text style={styles.itmeContent}>{item.fNews}</Text>
                    </View>
                    <Text style={styles.itmeTime}>{item.fCreatime}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <ScrollView>
                <FlatList
                    data={this.state.data}
                    //使用 ref 可以获取到相应的组件
                    ref={(flatList) => this._flatList = flatList}
                    keyExtractor={this._keyExtractor}
                    //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
                    //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
                    //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
                    getItemLayout={(data, index) => ({ length: 44, offset: (44 + 1) * index, index })}
                    renderItem={this._renderItem}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    itemView: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 12,
        alignItems: 'center',
        height: 60,
    },
    itemImg: {
        width: 40,
        height: 40
    },
    itmeText: {
        marginLeft: 10,
    },
    itmeTitle: {
        paddingBottom: 3,

        fontSize: 16,
        color: '#333'
    },
    itmeContent: {
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
export default Message;