import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Text,
    View
} from 'react-native';
import Util from '../Common/util.js';
import { Col, Row, Grid } from "react-native-easy-grid";
import Dimensions from 'Dimensions';
const { width, height } = Dimensions.get('window');
const colors = ['#eebbdd', '#bbccee', '#bfeabc', '#fa98a5', '#fcc8a0', '#f4c7dc', '#a5edd5', '#a1a0df', '#b9d4ff', '#ecd1fe', '#d4ffe1'];
export default class Grids extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fclassName: '',
            obj: this.props.obj,
            Mon: this.props.Mon,
            Tus: this.props.Tus,
            Wes: this.props.Wes,
            Thu: this.props.Thu,
            Fri: this.props.Fri,
            Sat: this.props.Sat,
            Sun: this.props.Sun,
        };

    }
    _keyExtractor = (item, index) => index;
    _renderItem = ({ item, index }) => {
        var num = Math.floor(Math.random() * 10);
        var strss = item.fClasstime.split("~");
        var heights = (strss[1] - strss[0] + 1) * 65;
        var Dates = [];
        switch (item.fweek) {
            case "一":
                Dates = this.state.Mon;
                break;
            case "二":
                Dates = this.state.Tus;
                break;
            case "三":
                Dates = this.state.Wes;
                break;
            case "四":
                Dates = this.state.Thu;
                break;
            case "五":
                Dates = this.state.Fri;
                break;
            case "六":
                Dates = this.state.Sat;
                break;
            case "日":
                Dates = this.state.Sun;
                break;
        }
        if (index == 0) {
            var marginTop = (strss[0] - 1) * 65;
        } else {
            let BefIndex = index - 1;
            let Befstr = Dates[BefIndex].fClasstime.split("~");
            // alert(Befstr[0]);
            var marginTop = (strss[0] - Befstr[1] - 1) * 65;
        }
        return (
            <View style={[styles.center,
            { borderRadius: 10, backgroundColor: colors[num], width: width * 2 / 15, height: heights, marginTop: marginTop, }
            ]}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('ClassMessage', { item: item }) }}>
                    <Text style={styles.color}>{item.fclassName}@{item.fPlace}</Text>
                </TouchableOpacity >
            </View>
        );

    }
    render() {
        return (
            <View>
                <View style={{ height: 30 }}>
                    <Grid>
                        <Row>
                            <Col style={styles.center} size={1}><Text style={{ fontSize: 12 }}>九月</Text></Col>
                            <Col style={styles.center} size={2}><Text>周一</Text></Col>
                            <Col style={styles.center} size={2}><Text>周二</Text></Col>
                            <Col style={styles.center} size={2}><Text>周三</Text></Col>
                            <Col style={styles.center} size={2}><Text>周四</Text></Col>
                            <Col style={styles.center} size={2}><Text>周五</Text></Col>
                            <Col style={styles.center} size={2}><Text>周六</Text></Col>
                            <Col style={styles.center} size={2}><Text>周日</Text></Col>
                        </Row>
                    </Grid>
                </View>
                <ScrollView>
                    <View style={{ height: 780, marginBottom: 85, }}>
                        <Grid>
                            <Col size={1}>
                                <Row style={styles.center} size={1}><Text>1</Text></Row>
                                <Row style={styles.center} size={1}><Text>2</Text></Row>
                                <Row style={styles.center} size={1}><Text>3</Text></Row>
                                <Row style={styles.center} size={1} ><Text>4</Text></Row>
                                <Row style={styles.center} size={1} ><Text>5</Text></Row>
                                <Row style={styles.center} size={1} ><Text>6</Text></Row>
                                <Row style={styles.center} size={1} ><Text>7</Text></Row>
                                <Row style={styles.center} size={1} ><Text>8</Text></Row>
                                <Row style={styles.center} size={1} ><Text>9</Text></Row>
                                <Row style={styles.center} size={1} ><Text>10</Text></Row>
                                <Row style={styles.center} size={1} ><Text>11</Text></Row>
                                <Row style={styles.center} size={1} ><Text>12</Text></Row>
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Mon == '' ? <FlatList
                                        data={this.state.Mon}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Mon}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Tus == '' ? <FlatList
                                        data={this.state.Tus}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Tus}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Wes == '' ? <FlatList
                                        data={this.state.Wes}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Wes}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Thu == '' ? <FlatList
                                        data={this.state.Thu}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Thu}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Fri == '' ? <FlatList
                                        data={this.state.Fri}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Fri}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }

                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Sat == '' ? <FlatList
                                        data={this.state.Sat}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Sat}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }
                            </Col>
                            <Col size={2}>
                                {
                                    this.props.Sun == ''? <FlatList
                                        data={this.state.Sun}
                                        //使用 ref 可以获取到相应的组件
                                        ref={(flatList) => this._flatList = flatList}
                                        keyExtractor={this._keyExtractor}
                                        renderItem={this._renderItem}
                                    /> : <FlatList
                                            data={this.props.Sun}
                                            //使用 ref 可以获取到相应的组件
                                            ref={(flatList) => this._flatList = flatList}
                                            keyExtractor={this._keyExtractor}
                                            renderItem={this._renderItem}
                                        />
                                }

                            </Col>
                        </Grid>
                    </View>
                </ScrollView>
            </View>

        );
    }
    componentDidMount() {
        this._fetchData();

    }
    _fetchData() {
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=classData', function (data) {
            if (data.status) {
                let obj = data.data;

                let Mon = [];
                let Tus = [];
                let Wes = [];
                let Thu = [];
                let Fri = [];
                let Sat = [];
                let Sun = [];
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
                

                self.setState({
                    obj: obj,
                    Mon: Mon,
                    Tus: Tus,
                    Wes: Wes,
                    Thu: Thu,
                    Fri: Fri,
                    Sat: Sat,
                    Sun: Sun,
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    color: {
        color: '#fff',
        fontSize: 12,
    },
});