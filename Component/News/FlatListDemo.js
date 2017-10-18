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
import moment from 'moment';
import Util from '../Common/util.js'
const colors=['#b9d4ff','#ecd1fe','#d4ffe1'];
export default class FlatListDemo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false, //初始化不刷新
      text: '',//跳转的行
      day:moment().format('YYYY-MM-DD'),
      weekend:null,
      obj:null,
    };
    
  }

  _keyExtractor = (item, index) => index;
  _renderItem = ({ item, index }) => {
item.fRestTime = (moment(item.finalTime).diff(this.state.day) / 86400000);
    return (
      <View style={[styles.wrap, { backgroundColor:colors[index%3] }]}>
        <Text style={styles.content1}>{item.fexamName}</Text>
        <Text style={styles.content2}>{item.fRestTime}天</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.obj==''?<FlatList
            data={this.state.obj}
            //使用 ref 可以获取到相应的组件
            ref={(flatList) => this._flatList = flatList}
            keyExtractor={this._keyExtractor}
            //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
            //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
            //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
            getItemLayout={(data, index) => ({ length: 44, offset: (44 + 1) * index, index })}
            renderItem={this._renderItem}
          />:<FlatList
            data={this.props.obj}
            //使用 ref 可以获取到相应的组件
            ref={(flatList) => this._flatList = flatList}
            keyExtractor={this._keyExtractor}
            //是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。
            //如果你的行高是固定的，getItemLayout用起来就既高效又简单.
            //注意如果你指定了SeparatorComponent，请把分隔线的尺寸也考虑到offset的计算之中
            getItemLayout={(data, index) => ({ length: 44, offset: (44 + 1) * index, index })}
            renderItem={this._renderItem}
          />
}

      </View>
    );
  }

componentDidMount(){
    this._fetchData();
  }

  _fetchData(){
    var self = this;
    Util.get('http://tree.luoyelusheng.cn/data/read?type=examData', function(data){
      if(data.status){
        let obj = data.data;    
        self.setState({
          obj: obj,
        });
      }else{
        alert('服务异常,正在紧急修复,请耐心等待');
      }
      
    }, function(err){
      alert(err);
      alert('服务异常,正在紧急修复,请耐心等待2');
    });
    
  }  


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
    marginTop: 5,
    fontSize: 16,
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






