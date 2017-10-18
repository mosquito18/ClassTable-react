import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import News from './Component/News/News.js';
import Comment from './Component/Comment/Comment.js';
import Classes from './Component/Classes/Classes.js';
import Friend from './Component/Friend/Friend.js';
import My from './Component/My/My.js';
import DfyTabBar from './DfyTabBar';
const {width, height} = Dimensions.get('window');
import Dimensions from 'Dimensions';
import {DrawerNavigator , DrawerItems ,} from 'react-navigation';
import { Navigator } from 'react-native-deprecated-custom-components';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view';
export default class App extends Component {
  static navigationOptions = {
  	//{ focused: boolean, tintColor: string }
    drawerLabel:() => (
      <Text style={styles.rowText}>首页</Text>
    ),
    //{ focused: boolean, tintColor: string }
    drawerIcon: () => (
    <Icon name='ios-home-outline'
        style={styles.backIconB}
    />
    ),
  };
    render() {

        return (
            <Navigator
                {...this.props}
                initialRoute={{ name: 'AppsTabBarView', component: AppsTabBarView }}
                //配置场景
                configureScene=
                {
                    (route) => {
                        //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
                        // return Navigator.SceneConfigs.PushFromRight;
                        return ({
                            ...Navigator.SceneConfigs.PushFromRight,
                            gestures: null
                        });
                    }
                }
                renderScene={
                    (route, navigator) => {
                        let Component = route.component;
                        return <Component {...route.params} navigator={navigator} />
                    }
                } ></Navigator>
        );
    }
}

class AppsTabBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['推荐', '树洞', '课程表', '小纸条', '我'],
            tabIconNames: ['md-flower', 'ios-create', 'md-grid', 'md-chatboxes', 'md-contact'],
            isOpen: false,
        };
    }
    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
                <ScrollableTabView
                    // renderTabBar={() => <ScrollableTabBar/>}
                    renderTabBar={() => <DfyTabBar tabNames={tabNames} tabIconNames={tabIconNames} />}
                    tabBarPosition='bottom'
                    onChangeTab={
                        (obj) => {
                            console.log('被选中的tab下标：' + obj.i);
                        }
                    }
                    onScroll={
                        (position) => {
                            console.log('滑动时的位置：' + position);
                        }
                    }
                    locked={true}
                    initialPage={0}
                    prerenderingSiblingsNumber={1}
                >


                    <News tabLabel="news"  {...this.props} />

                    <Comment tabLabel="comment"  {...this.props} />

                    <Classes tabLabel="classes"  {...this.props} />

                    <Friend tabLabel="friend"  {...this.props} />

                    <My tabLabel="my"  {...this.props} />

                </ScrollableTabView>

        );
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
  backIcon:{
        fontSize:27,
    },
    backIconB:{
        fontSize:30,
    },
	row:{
		height:40,
		paddingLeft:30,
        flexDirection:'row',		
        alignItems:'center',
		marginBottom:1,
	},
	rowText:{
		fontSize:17,
	},

});

