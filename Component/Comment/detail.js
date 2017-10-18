/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
    Modal,
    Image,
    View
    } from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../Common/config';
import request from '../Common/request';
import Button from 'react-native-button';
const {width,height} = Dimensions.get('window');
let cachedResults = {
    nextPage: 1,
    items: [],
    total: 0,
}
export default class Detail extends Component {
//<Image style={styles.headerImg} source={require('../../img/logo.png')} />
    constructor(props){
        super(props);
        this.state={
            rowData: this.props.navigation.state.params.rowData,
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2)=> row1 !== row2,
            }),
            isLoadingTail: false,
            animationType: 'fade',//none slide fade
            modalVisible: false,//模态场景是否可见
            transparent: false,//是否透明显示
            contents:'',
            isSendingComment:false,
        }
        this._pop = this._pop.bind(this);
        this._renderRow = this._renderRow.bind(this);
        this._fetchMoreData = this._fetchMoreData.bind(this);
        this._fetchData = this._fetchData.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
        this._renderHeader = this._renderHeader.bind(this);
        this._focus = this._focus.bind(this);
        this._blur = this._blur.bind(this);
        this._setModalVisible = this._setModalVisible.bind(this);
        this._startShow = this._startShow.bind(this);
        this._closeModal =this._closeModal.bind(this);
        this._submit = this._submit.bind(this);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                         onPress={() => {this.props.navigation.goBack() }}
                        >
                        <Icon name='ios-arrow-back'
                              style={styles.backIcon}
                            />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        详细
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    onEndReached={this._fetchMoreData}
                    onEndReachedThreshold={20}
                    renderFooter={this._renderFooter}
                    renderHeader={this._renderHeader}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={false}
                    />
                <Modal
                    animationType={this.state.animationType}
                    transparent={this.state.transparent}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this._setModalVisible(false)
                    } }
                    onShow={this._startShow}
                    >
                    <View style={styles.modalContainer}>
                        <Icon
                            name='ios-close-outline'
                            size={45}
                            onPress={this._closeModal}
                            style={styles.closeIcon}/>
                        <View style={styles.commentBox}>
                            <View style={styles.comment}>
                                <TextInput
                                    placeholder='评论'
                                    style={styles.content}
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                    keyboardType='default'
                                    defaultValue={this.state.contents}
                                    onChangeText={(text)=>{
                                        this.setState({
                                            contents:text
                                        });
                                    }}
                                    />
                            </View>
                            <Button
                                style={styles.submitButton}
                                onPress = {this._submit}
                            >评论一下</Button>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
    _setModalVisible(visible){
        this.setState({ modalVisible: visible });
    }
    _startShow(){
        console.log('开始显示modal');
    }
    _closeModal(){
        this._setModalVisible(false);
    }
    _fetchData(page) {
        this.setState({
            isLoadingTail: true
        });
        console.log('封装后的异步请求网络get');
        request.get(config.api.base + config.api.comments, {
            accessToken: 'zyx',
            id: '12138',
            page: page
        }).then(
            (data)=> {
                if (data.success) {
                    //把服务器得到的数据存到缓存里面
                    let items = cachedResults.items.slice();
                    items = items.concat(data.data);
                    cachedResults.nextPage += 1
                    cachedResults.items = items
                    cachedResults.total = data.total
                    console.log('总个数据的长度是：' + cachedResults.total);
                    console.log('当前的listview数据的总长度是：' + cachedResults.items.length);
                    setTimeout(()=> {
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(
                                cachedResults.items
                            ),
                            isLoadingTail: false
                        });

                    }, 200);
                }
            }
        ).catch(
            (err) => {
                this.setState({
                    isLoadingTail: false
                });
                console.log('err' + err);
            }
        )
    }
    _pop(){
        //alert()
        let {navigator} = this.props;
        if(navigator){
            navigator.pop();
        }
    }
    componentDidMount() {
        this._fetchData(1);
    }
    _fetchData2(){
        let url = config.api.base+ config.api.comments;
        console.log('说说的id：'+this.state.rowData._id);
        request.get(url,{
            id:'12138',
            accessToken:'zyx'
        }).then(
            (data)=>{
                console.log('服务器返回的:'+JSON.stringify(data));
                if(data && data.success){
                    let comments = data.data;
                    if(comments && comments.length > 0){
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(comments)
                        });
                    }
                }
            }
        ).catch((err)=>{
                console.log(err);
            })
    }
    _renderRow(rowData_reply){
        return (
            <View style={styles.item}>
                <View style={styles.flexDirection}>
                    <Image
                        style={styles.replyAvatar}
                        source={{uri:rowData_reply.replyBy.avatar}}
                        ></Image>
                    <Text style={styles.replyNickname} >{rowData_reply.replyBy.nickname}</Text>
                </View>
                <Text style={styles.replyContent}>{rowData_reply.contents}</Text>
            </View>
        );
    }
    //加载更多的数据 上拉加载更多  滑动分页
    _fetchMoreData() {
        if (!this._hasMore() || this.state.isLoadingTail) {
            return
        }
        //去服务器请求加载更多的数据了
        let page = cachedResults.nextPage;
        this._fetchData(page)
    }
    _renderHeader() {
        let rowData = this.state.rowData;
        return (
            <View style={styles.item}>
                <View style={styles.flexDirection}>
                    <Image style={styles.headImg} source={require('../../img/head.png')} />
                    <View>
                        <Text style={styles.headText} >树洞墙</Text>
                        <Text style={styles.headTime}>{this.props.navigation.state.params.createTime}</Text>
                    </View>

                </View>
                <Text style={styles.title}>{this.props.navigation.state.params.rowData.content}</Text>
                <Image style={styles.thumb} source={{uri:this.props.navigation.state.params.rowData.img}}>
                    <Icon />
                </Image>
                <View style={styles.commentBox}>
                    <View style={styles.comment}>
                        <TextInput
                            placeholder='评论'
                            underlineColorAndroid='transparent'
                            keyboardType='default'
                            style={styles.content}
                            multiline={true}
                            onFocus={this._focus}
                            onBlur={this._blur}
                            defaultValue={this.state.contents}
                            onChangeText={(text)=>{
                                this.setState({
                                    contents:text
                                });
                            }}
                            />
                    </View>
                    {Platform.OS === 'ios' ? null :

                        <View style={styles.btn}>
                            <Text style={styles.submitComment} onPress={this._submit}>评论</Text>

                        </View>
                    }
                </View>
                <View style={styles.commentArea}>
                    <Text style={styles.commentTitle}>评论</Text>
                </View>
            </View>
        );
    }
    _focus() {
        console.log('获得焦点');
        if(Platform.OS === 'ios'){
            this._setModalVisible(true);

        }else {
            //android

        }
    }
    _blur() {
        console.log('失去焦点');
    }
    _renderFooter() {
        if (!this._hasMore() && cachedResults.total !== 0) {
            return (<View style={styles.loadingMore}>
                <Text style={styles.loadingText}>没有更多数据啦...</Text>
            </View>);
        }
        if (!this.state.isLoadingTail) {
            return <View style={styles.loadingMore}/>
        }
        return (
            <ActivityIndicator
                style={styles.loadingMore}
                />
        );
    }
    _hasMore() {
        return cachedResults.items.length !== cachedResults.total
    }
    _submit(){
        //post comment

        // alert('开始评论了')
        if(!this.state.contents){
            return alert('评论内容不能为空');
        }

        if(this.state.isSendingComment){
            return alert('正在发送评论');
        }

        //第一次发生评论

        this.setState({
            isSendingComment:true
        },()=>{
            let body={
                accessToken:'zyx',
                id_pic:'12138',
                contents:this.state.contents,
            }
            let url = config.api.base + config.api.comment;
            request.post(url,body)
                .then(
                (data)=>{
                    if(data && data.success){
                        let itmes = cachedResults.items.slice();
                        itmes = [{
                            contents:this.state.contents,
                            replyBy:{
                                nickname:'zyx',
                                avatar:'http://dummyimage.com/640x640/967776)'
                            }
                        }].concat(itmes);

                        cachedResults.items = itmes;
                        cachedResults.total = cachedResults.total +1;
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(cachedResults.items),
                            isSendingComment:false,
                            contents:''
                        });

                        this._setModalVisible(false);


                    }
                }

            ).catch((err)=>{
                    console.log(err);
                    this.setState({
                        isSendingComment:false,
                    });
                    this._setModalVisible(false);
                    alert('评论失败，请稍后重试');
                });

        });

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
    },
    item:{
        width:width,
        marginBottom:10,
        paddingTop:10,
        backgroundColor:'white'
    },
    title:{
        fontSize:18,
        paddingLeft:10,
        paddingBottom:10,
        lineHeight:27,
        color:'#333'
    },
    thumb:{
        width:width-20,
        height:(width-20)*0.56,
        marginLeft:10,
        resizeMode:'cover'
    },
    up:{
        fontSize:22,
        color:'#ed7b66'
    },
    down:{
        fontSize:22,
        color:'#333'
    },
    headImg:{
        width:40,
        height:40,
        margin:10,
    },
    flexDirection:{
        width:width,
        flexDirection:'row',
    },
    headText:{
        marginTop:10,
        fontSize:18,
    },
    headTime:{

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
    replyBox:{
        flexDirection:'row',
        width:width,
        justifyContent:'flex-start',
        marginTop:10,
    },
    replyAvatar:{
        width:30,
        height:30,
        borderRadius:20,
        marginRight:10,
        marginLeft:10,
    },
    reply:{
        flex:1,
    },
    replyNickname:{
        //marginBottom:6,
        fontSize:16,
        lineHeight:26,
    },
    replyContent:{
        fontSize:16,
        margin:0,
        paddingLeft:10,
        paddingRight:10,
        paddingBottom:10,
        lineHeight:23,
    },
    loadingMore: {
        marginVertical: 20
    },
    loadingText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center'
    },
    commentBox: {
        marginTop: 6,
        padding: 8,
        width: width,
        flexDirection:'row',
    },
    comment: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderTopLeftRadius:10,
        borderBottomLeftRadius:10,
        flex:1,
    },
    content: {
        paddingLeft: 10,
        color: '#333',
        height:40,
    },
    btn:{
        width:60,
        backgroundColor:'#00b3ca',
        height:42,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: '#00b3ca',
        borderTopRightRadius:10,
        borderBottomRightRadius:10,
        marginLeft:-4,
    },
    submitComment:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',

    },
    commentArea: {
        width: width,
        paddingBottom: 6,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    commentTitle: {
        //color: 'red',
    },
    modalContainer:{
        flex:1,
        paddingTop:45,
        backgroundColor:'white',
        alignItems:'center',
    },
    closeIcon:{
        alignSelf:'center',
        fontSize:30,
        marginTop:20,
        //color:'red'
    },
    submitButton:{
        width:width-20,
        padding:16,
        marginTop:20,
        marginBottom:20,
        borderWidth:1,
        borderColor:'red',
        borderRadius:4,
        color:'red',
        fontSize:18,
    },

});