/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
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

import config from '../../Common/config';
import request from '../../Common/request';
import Item from './item';
import Details from './details';


const { width, height } = Dimensions.get('window');


let cachedResults = {
    nextPage: 1,
    items: [],
    total: 0,
}

export default class List extends Component {

    constructor(props) {
        super(props);//这一句不能省略，照抄即可
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            isLoadingTail: false,
            isRefreshing: false,
        };
    }

    componentWillMount() {
        //this.dsfetchData();//打底数据共3条
    }

    componentDidMount() {
        this._fetchData(1);//从服务器获取的真实数据
    }


    //http://rap.taobao.org/mockjs/7756/api/list?accessToken=ssss
    _fetchData(page) {


        if (page !== 0) {

            this.setState({
                isLoadingTail: true
            });

        } else {

            this.setState({
                isRefreshing: true
            });

        }



        console.log('封装后的异步请求网络get');

        request.get(config.api.base + config.api.video, {
            accessToken: '123',
            page: page
        }).then(
            (data) => {

                if (data.success) {
                    //把服务器得到的数据存到缓存里面
                    let items = cachedResults.items.slice();

                    if (page !== 0) {

                        items = items.concat(data.data);

                        cachedResults.nextPage += 1

                    } else {
                        items = data.data.concat(items)


                    }

                    cachedResults.items = items
                    cachedResults.total = data.total



                    console.log('总个数据的长度是：' + cachedResults.total);
                    console.log('当前的listview数据的总长度是：' + cachedResults.items.length);


                    setTimeout(() => {

                        if (page !== 0) {

                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(
                                    cachedResults.items
                                ),
                                isLoadingTail: false
                            });

                        } else {
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(
                                    cachedResults.items
                                ),
                                isRefreshing: false
                            });
                        }



                    }, 200);



                }

            }

            ).catch(
            (err) => {

                if (page !== 0) {
                    this.setState({
                        isLoadingTail: false
                    });
                } else {
                    this.setState({
                        isRefreshing: false
                    });
                }

                console.log('err' + err);
            }
            )
    }

    _fetchData2() {

        //网络当中去请求数据  fetch   xmlhttprequest websocket
        console.log('GET访问网络');
        let url = ' http://rapapi.org/mockjs/22491/api/list/vedio?accessToken=123';
        fetch(url).then(
            (response) => {
                console.log('第一个then里面');
                return response.json()
            }
        ).then(
            (response) => {
                //这里不能用console否则看不到 这是一个巨大的坑 用alert一点问题没有
                // alert('服务器返回：' + responseText);
                let result = JSON.stringify(response);
                // throw new Error('sssss');
                // console.log('服务器返回：' + result);
                let result1 = Mock.mock(response);
                //canvas node找不到 安装 完了 之后  其他的问题出现

                if (result1.success) {
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(
                            result1.data
                        ),
                    });
                }


            }
            ).catch(
            (err) => {
                console.log('err' + err);
            }
            );


    }



    dsfetchData() {
        // let result = Mock.mock({"data|20":[{"_id":"@ID","video":"http:\/\/v.youku.com\/v_show\/id_XMTczMDM0NzQ2OA==.html?f=26378220&spm=a2hww.20023042.m_223465.5~5~5~5!2~5~5~A.BZYRBN&from=y1.3-idx-beta-1519-23042.223465.4-1","thumb":"@IMG(1280x720,@color())","title":"@cparagraph(1, 3)"}],"total":20,"success":true});


        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(

                // result.data

                [

                    {
                        "_id": "650000201402241256", "thumb": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503844056758&di=ba2ce39004aabb7b339c5455f783a725&imgtype=0&src=http%3A%2F%2Fww2.sinaimg.cn%2Forj480%2F7390333dgw1f6u5bmmau3j20gw08k40d.jpg", "title": "cparagraph(1,3)", "video": "http://183.252.54.17/vlive.qqvideo.tc.qq.com/Ad6WCR59MJjwdEhmPqR2ugTgTTua_x4TlGsFNDGePL_M/y0024vcegi1.mp4?vkey=81C22DC3AA1B52EF63A155ED4870A3DC7E992825E5CF3982C9DCEBD7AB882D0A81D79E8BB8B99E2263B2A351426FC8A40E7E68E13A98E9F3E090AA0536F52678CF66AC261A1DEF8E552E5B291FFFAA5A986E0851850BA75F&locid=0c56847b-318e-43b9-ab4f-b147c928a128&size=9033504&ocid=365959340"
                    }
                    ,
                    {
                        "_id": "370000197107252685", "thumb": "http://imgsrc.baidu.com/forum/pic/item/bba2a5529822720eccca473472cb0a46f31fab4a.jpg", "title": "cparagraph(1,3)", "video": "http://183.252.54.17/vlive.qqvideo.tc.qq.com/Ad6WCR59MJjwdEhmPqR2ugTgTTua_x4TlGsFNDGePL_M/y0024vcegi1.mp4?vkey=81C22DC3AA1B52EF63A155ED4870A3DC7E992825E5CF3982C9DCEBD7AB882D0A81D79E8BB8B99E2263B2A351426FC8A40E7E68E13A98E9F3E090AA0536F52678CF66AC261A1DEF8E552E5B291FFFAA5A986E0851850BA75F&locid=0c56847b-318e-43b9-ab4f-b147c928a128&size=9033504&ocid=365959340"
                    }
                    ,
                    {
                        "_id": "460000199105050909", "thumb": "http://imgsrc.baidu.com/forum/pic/item/bba2a5529822720eccca473472cb0a46f31fab4a.jpg", "title": "cparagraph(1,3)", "video": "http://183.252.54.17/vlive.qqvideo.tc.qq.com/Ad6WCR59MJjwdEhmPqR2ugTgTTua_x4TlGsFNDGePL_M/y0024vcegi1.mp4?vkey=81C22DC3AA1B52EF63A155ED4870A3DC7E992825E5CF3982C9DCEBD7AB882D0A81D79E8BB8B99E2263B2A351426FC8A40E7E68E13A98E9F3E090AA0536F52678CF66AC261A1DEF8E552E5B291FFFAA5A986E0851850BA75F&locid=0c56847b-318e-43b9-ab4f-b147c928a128&size=9033504&ocid=365959340"
                    }
                ]

            ),
        });
    }

    //加载更多的数据 上拉加载更多  滑动分页
    _fetchMoreData = () => {

        if (!this._hasMore() || this.state.isLoadingTail) {
            return
        }

        //去服务器请求加载更多的数据了

        let page = cachedResults.nextPage;

        this._fetchData(page)

    }


    //下拉刷新的回调   从服务器获取最新的数据
    _onRefresh = () => {

        if (!this._hasMore() || this.state.isRefreshing) {
            return
        }

        //去服务器获取数据l

        //page 相当于数据的页码

        this._fetchData(0)

    }

    _renderFooter = () => {
        if (!this._hasMore() && cachedResults.total !== 0) {
            return (<View style={styles.loadingMore}>
                <Text style={styles.loadingText}>没有更多数据啦...</Text>
            </View>);
        }

        if (!this.state.isLoadingTail) {
            return <View style={styles.loadingMore} />
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


    //     tintColor="#ff0000"
    //     title="Loading..."
    //     titleColor="#00ff00"
    //     colors={['#ff0000', '#00ff00', '#0000ff']}
    // progressBackgroundColor="#ffff00"

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
                        视频列表
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

    _renderRow = (rowData) => {
        return (

            <Item rowData={rowData}
                onSelect={() => this.props.navigation.navigate('Details', {
                    rowData: rowData
                })}

                key={rowData._id}
            />

        );
    }

    _loadPage(rowData) {
        //解构 与 模式匹配
        let { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'detail',
                component: Detail,
                params: {
                    rowData: rowData
                }
            })
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    listView: {
        paddingTop: 20,
        backgroundColor: 'white',
    },

    loadingMore: {

        marginVertical: 20
    },

    loadingText: {
        fontSize: 18,
        textAlign: 'center'
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


});

