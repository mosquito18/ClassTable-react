/**
 * Created by linwenjie on 2017/7/13.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Platform,
    ListView,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl,
    View,
    Image
    } from 'react-native';
    import Dimensions from 'Dimensions';
    import Icon from 'react-native-vector-icons/Ionicons';
    import Mock from 'mockjs';
    import config from '../Common/config';
    import request from '../Common/request';
    import Item from './item';
    import moment from 'moment';
const {width,height} = Dimensions.get('window');
let cachedResults={
    nextPage:1,
    items:[],
    total:0,
}
export default class Comment extends Component {
    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2)=> row1 !== row2,
            }),
            isLoadingTail:false,
            isRefreshing:false,
            createTime:moment().format('MM月DD日 HH:mm'),
        };
    }
    componentWillMount() {
       this.dsfetchData();
    }
    //   componentDidMount() {
    //         this._fetchData(1);
    //     }
//http://rapapi.org/mockjs/22491/api/comment?accessToken=ouxiaoje
_fetchData(page){
    if(page!==0){

        this.setState({
                isLoadingTail:true
            });
        }else{
            this.setState({
                isRefreshing:true
            });
        }
console.log('封装后的异步请求网络get');
    request.get(config.api.base+config.api.list,{
        accessToken:'ouxiaojie',
        page:page
    }).then(
        (data)=>{
            if(data.success){
                //把服务器得到的数据存到缓存里面
                let items = cachedResults.items.slice();
                if(page!==0){
                    items = items.concat(data.data);
                    cachedResults.nextPage +=1
                }else{
                    items = data.data.concat(items)
                }

                cachedResults.items = items
                cachedResults.total = data.total

                console.log('总个数据的长度是：'+cachedResults.total);
                console.log('当前的listview数据的总长度是：'+cachedResults.items.length);


                setTimeout(()=>{

                    if(page!== 0){

                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(
                                cachedResults.items
                            ),
                            isLoadingTail:false
                        });

                    }else{
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(
                                cachedResults.items
                            ),
                            isRefreshing:false
                        });
                    }
                },2000);
            }
        }
    ).catch(
        (err) => {
            if(page!== 0 ){
                this.setState({
                        isLoadingTail:false
                    });
                }else{
                    this.setState({
                        isRefreshing:false
                    });
                }
            console.log('err' + err);
        }
    )
}
//    _fetchData2(){
//        console.log('GET访问网络');
//            let url = 'http://rapapi.org/mockjs/22491/api/comment?accessToken=ouxiaoje';
//            fetch(url).then(
//              (response) => {
//                console.log('第一个then里面');
//                return response.json()
//              }
//            ).then(
//              (response) => {
//                let result=JSON.stringify(response);
//                let result1=Mock.mock(response);
//                if(result1.success){
//                    this.setState({
//                        dataSource: this.state.dataSource.cloneWithRows(
//                            result1.data
//                        ),
//                    });
//                }
//
//              }
//              ).catch(
//              (err) => {
//                console.log('err' + err);
//              }
//              );
//    }
    dsfetchData(){
//        let result=Mock.mock({"data|20":[{"img":"http:\/\/imgsrc.baidu.com\/forum\/pic\/item\/8041fb246b600c33d7e311f5124c510fd9f9a11c.jpg","_id":"@ID","content":"@cparagraph(1,3)"}],"total":20,"success":true});
    this.setState({
        dataSource: this.state.dataSource.cloneWithRows(
//                result.data
            [
                {
                        "_id":"640000201512023442","content":"超级智能课表使用起来真的很方便呢，可以随时随地地查看课程表，还可以和一起上课的小伙伴们讨论分享资料","img":"http://p1.wmpic.me/article/2014/12/09/1418111352_SGvSBfkM.jpg"
                    }
                    ,
                    {
                        "_id":"51000019800506414X","content":"咖啡就是人生,苦与甜都包含其中。","img":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503754948018&di=9cef757bdd0fbb33d596251976689210&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F170420%2F106-1F420100321161.jpg"
                    }
                    ,
                    {
                        "_id":"130000198411044987","content":"小邦课表使用起来真的很方便呢，可以随时随地地查看课程表，还可以和一起上课的小伙伴们讨论分享资料","img":"http://imgsrc.baidu.com/forum/pic/item/8041fb246b600c33d7e311f5124c510fd9f9a11c.jpg"
                    }
                ]
            ),
        });
    }
    //加载更多的数据 上拉加载更多 滑动分页
    _fetchMoreData=()=>{
        if(!this._hasMore() || this.state.isLoadingTail){
            return
        }
        //去服务器强求加载更多的数据了
        let page=  cachedResults.nextPage;
        this._fetchData(page)
    }
//下拉刷新的回调   从服务器获取最新的数据
    _onRefresh=()=>{
        if(!this._hasMore() || this.state.isRefreshing) {
            return
        }
        //去服务器获取数据l
        //page 相当于数据的页码
        this._fetchData(0)
    }
    _renderFooter=()=>{
        if(!this._hasMore() && cachedResults.total!== 0 ){
            return (<View style={styles.loadingMore}>
                <Text style={styles.loadingText}>没有更多数据啦...</Text>
            </View>);
        }
        if(!this.state.isLoadingTail){
            return <View style={styles.loadingMore}/>
        }
        return (
            <ActivityIndicator
            style={styles.loadingMore}
            />
        );
    }
    _hasMore(){
        return cachedResults.items.length !== cachedResults.total
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image style={styles.headerImg} source={require('../../img/logo.png')} />
                    <Text style={styles.headerText}>
                      树洞
                    </Text>
                </View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    enableEmptySections={true}
                    automaticallyAdjustContentInsets={false}
                    onEndReached={this._fetchMoreData}
                    onEndReachedThreshold={20}

                    renderFooter={this._renderFooter}

                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                    style={styles.listView}
                />
            </View>
        );
    }
    _renderRow=(rowData)=>{
        return (
            <Item rowData={rowData}
                 onSelect={()=>this._loadPage(rowData)}
                 key = {rowData._id}
            />
        );
    }
    _loadPage(rowData){
        //解构 与 模式匹配
        // let {navigator} = this.props;
        // if(navigator){
        //     navigator.push({
        //         name:'detail',
        //         component:Detail,
        //         params:{
        //             rowData:rowData
        //         }
        //     })
        // }
        this.props.navigation.navigate('Detail', {rowData:rowData,createTime:this.state.createTime})
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dedfe1',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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
    headerImg:{
		width: 24,
		height: 18,
		marginTop:5,
    },
    headerText:{
        fontSize:20,
        fontWeight:'600',
        color:'#fff',
        paddingLeft:10,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: 'white',
    },
    loadingMore:{
        marginVertical:20
    },
    loadingText:{
        fontSize:18,
        color:'red',
        textAlign:'center'
    },
});

