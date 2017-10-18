import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    FlatList,
    Platform,
    ListView,
    ScrollView,
    TextInput,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
import Note from './Note.js';
const colors = ['#d4ffe1', '#b9d4ff', '#ecd1fe'];
export default class NewNoteDemo extends Component {
    // async getCityInfos() {
    //     let NewNoteData = await require('../../json/NewNoteData.json');
    //     this.setState({ data: NewNoteData })
    // }


    constructor(props) {
        super(props);
        this.state = {
            // data: [],
            refreshing: false, //初始化不刷新
            text: '',//跳转的行
            fNoteTitle: '',
            fNoteTip: '',
            fNoteContent: '',
            data: this.props.data,
        };
        // this.getCityInfos();

    }
    render() {
        let first = [];
        let data = this.props.data;
        // alert(data);
        for (var i in data) {
            var Item = (
                <TouchableOpacity key={i} style={styles.card}
                onPress={() => this.props.navigation.navigate('Note', {fNoteTitle: data[i].fNoteTitle,
                            fNoteTip: data[i].fNoteTip,
                            fNoteContent: data[i].fNoteContent,})}>
                    <View style={[styles.wrap1, { backgroundColor: colors[i % 3] }]}>
                        <Text style={styles.content4}>{data[i].fNoteTitle}</Text>
                        <Text style={styles.content5}>{data[i].fNoteTip}天</Text>
                    </View>
                </TouchableOpacity>


                // <View style={styles.topic} key={i}>
                //   <TouchableOpacity onPress={this._showDetail.bind(this, data[i].title, data[i].url)}>
                //     <View style={styles.shadow}>
                //       <Image style={styles.topicImg} source={{uri: data[i].img}} resizeMode="cover"/>
                //     </View>
                //     <View style={{marginTop:10}}>
                //       <Text style={styles.title} numberOfLines={2}>{data[i].title}</Text>
                //     </View>
                //   </TouchableOpacity>
                // </View>
            );
            first.push(Item);

        }
        return (
            <View style={styles.container}>
                {first}
            </View>
        );
    }

    // _keyExtractor = (item, index) => index;
    // _renderItem = ({ item, index }) => {

    //     return (
    //         <TouchableOpacity style={styles.card} onPress={() => {
    //             this.props.navigator.push({
    //                 component: Note,
    //                 params: {
    //                     fNoteTitle:item.fNoteTitle,
    //                     fNoteTip:item.fNoteTip,
    //                     fNoteContent:item.fNoteContent,
    //                 }
    //             })
    //         }}>
    //             <View style={[styles.wrap1, { backgroundColor: colors[index % 3] }]}>
    //                 <Text style={styles.content4}>{item.fNoteTitle}</Text>
    //                 <Text style={styles.content5}>{item.fNoteTip}天</Text>
    //             </View>
    //         </TouchableOpacity>
    //     );
    // }

    // render() {
    //     return (
    //         <View style={styles.container}>
    //             <FlatList
    //                 data={this.state.data}
    //                 //使用 ref 可以获取到相应的组件
    //                 ref={(flatList) => this._flatList = flatList}
    //                 keyExtractor={this._keyExtractor}
    //                 //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
    //                 //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
    //                 //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
    //                 getItemLayout={(data, index) => ({ length: 74, offset: (74 + 1) * index, index })}
    //                 renderItem={this._renderItem}
    //             />
    //         </View>
    //     );
    // }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    NewsWrap: {
        width: width * 0.9,
        marginLeft: width * 0.05,
    },
    NewsTitle: {
        flexDirection: 'row',
        height: 40,
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'center',
    },
    NewsTip: {
        borderColor: '#01cf6b',
        borderLeftWidth: 5,
        paddingLeft: 10,
        fontSize: 18,
    },
    NewsIcon: {
        position: 'absolute',
        right: 0,
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
    content4: {
        fontSize: 18,
    },
    content5: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'center',
    },
    wrap: {
        height: 40,
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    wrap1: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
});