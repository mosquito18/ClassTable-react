import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
    Text,
    View
} from 'react-native';

import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
export default class CheckExam extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => {
                                this.props.navigation.goBack()
                        }}>
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        成绩查询
                    </Text>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CETCheck')}>
                        <Image style={styles.Bg} source={require('../../../img/bg1.jpg')} />
                        <Icon
                            name='ios-arrow-forward'
                            size={30}
                            style={styles.commentIcon} />
                            <Text style={styles.CheckText}>四六级成绩查询</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SchoolCheck')}>

                        <Image style={styles.Bg} source={require('../../../img/bg3.jpg')} />
                                                <Icon
                            name='ios-arrow-forward'
                            size={30}
                            style={styles.commentIcon} />
                            <Text style={styles.CheckText}>学校成绩查询</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
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
    Bg: {
        width: width,
        resizeMode: 'cover',
        height: (height - 48) / 2,
    },
    commentIcon:{
        fontSize:100,
        position:'absolute',
        right:30,
        top: ((height - 48) / 2-100)/2,
        color:'#fff',
    },
    CheckText:{
        position:'absolute',
        left:50,
        top: ((height - 48) / 2-30)/2,
        color:'#fff',
        fontSize:30,
    }
});