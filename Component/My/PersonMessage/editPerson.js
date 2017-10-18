import React, { Component } from 'react';
import {
    AppRegistry,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    findNodeHandle,
    Button,
    ScrollView,
    ActivityIndicator,
    Platform,
    ListView,
    TextInput,
} from 'react-native';
import Util from '../../Common/util.js';
import { BlurView } from 'react-native-blur';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
const window = Dimensions.get('window');
const { width, height } = Dimensions.get('window');
// onPress={() => this.props.navigation.navigate('EditPerson')}
import Qiniu, { Auth, ImgOps, Conf, Rs, Rpc } from 'react-native-qiniu';
let pickPhotoOptions = {
    title: '选择头像',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '从相册...',
    quality: 0.8,
    allowsEditing: true,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class EditPerson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatarSource: null,
            info: '',
            uri: '',
            viewRef: 0,
            id: this.props.navigation.state.params.id,
            fCopy: this.props.navigation.state.params.obj.fCopy,
            fJianame: this.props.navigation.state.params.obj.fJianame,
            fName: this.props.navigation.state.params.obj.fName,
            first: this.props.navigation.state.params.obj.first,
            fAge: this.props.navigation.state.params.obj.fAge,
            fSex: this.props.navigation.state.params.obj.fSex,
            fCometime: this.props.navigation.state.params.obj.fCometime,
            fXueyuan: this.props.navigation.state.params.obj.fXueyuan,
            fSchool: this.props.navigation.state.params.obj.fSchool,
            fImg: this.props.navigation.state.params.obj.fImg,
        };
    }
    imageLoaded() {
        this.setState({ viewRef: findNodeHandle(this.backgroundImage) });
    }
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(pickPhotoOptions, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                // let uri='data:image/jpeg;base64,' + response.data;
                let uri = response.uri;
                this.setState({
                    avatarSource: source,
                    uri: uri
                });
                // alert(this.state.uri);
            }
        });
    }
    render() {
        // alert(this.state.id);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backBox}
                        onPress={() => { this.props.navigation.goBack() }}
                    >
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        编辑
                        </Text>

                </View>
                <ScrollView>
                    <View style={styles.container}>
                        <View>
                            {this.state.avatarSource === null ?
                                <View style={styles.container1}>

                                    <Image
                                        ref={(img) => { this.backgroundImage = img; }}
                                        source={{ uri: this.state.fImg }}
                                        style={styles.imgBig}
                                        onLoadEnd={this.imageLoaded.bind(this)}
                                    >
                                    </Image>
                                    <BlurView
                                        style={styles.absolute}
                                        viewRef={this.state.viewRef}
                                        blurType="light"
                                        blurAmount={10}
                                    />
                                    <TouchableOpacity style={styles.avatarBox}
                                        onPress={this.selectPhotoTapped.bind(this)}>
                                        <Image
                                            style={styles.avatar}
                                            source={{ uri: this.state.fImg }}
                                        >
                                        </Image>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={styles.container1}>
                                    <Image
                                        source={this.state.avatarSource}
                                        style={styles.imgBig}
                                    >
                                        <TouchableOpacity style={styles.avatarBox}
                                            onPress={this.selectPhotoTapped.bind(this)}>
                                            <Image
                                                style={styles.avatar}
                                                source={this.state.avatarSource}
                                            >
                                            </Image>
                                        </TouchableOpacity>
                                    </Image>

                                </View>
                            }
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.textName}>昵称：</Text>
                            <TextInput
                                placeholder='小狐狸'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.textMessage}
                                onChangeText={(text) => {
                                    this.setState({
                                        fJianame: text
                                    });
                                }}
                            >{this.state.fJianame}</TextInput>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.textName}>姓名：</Text>
                            <TextInput
                                placeholder='张艺兴'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.textMessage}
                                onChangeText={(text) => {
                                    this.setState({
                                        fName: text
                                    });
                                }}
                            >{this.state.fName}</TextInput>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.textName}>年龄：</Text>
                            <TextInput
                                placeholder='24'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.textMessage}
                                onChangeText={(text) => {
                                    this.setState({
                                        fAge: text
                                    });
                                }}
                            >{this.state.fAge}</TextInput>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.textName}>性别：</Text>
                            <TextInput
                                placeholder='男'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.textMessage}
                                onChangeText={(text) => {
                                    this.setState({
                                        fSex: text
                                    });
                                }}
                            >{this.state.fSex}</TextInput>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.textName}>学校：</Text>
                            <TextInput
                                placeholder='XXXXXX'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.textMessage}
                                onChangeText={(text) => {
                                    this.setState({
                                        fSchool: text
                                    });
                                }}
                            >{this.state.fSchool}</TextInput>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.textName}>学院：</Text>
                            <TextInput
                                placeholder='XXXXXX'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.textMessage}
                                onChangeText={(text) => {
                                    this.setState({
                                        fXueyuan: text
                                    });
                                }}
                            >{this.state.fXueyuan}</TextInput>
                        </View>
                        <View style={styles.textWrap}>
                            <Text style={styles.textName}>入学时间：</Text>
                            <TextInput
                                placeholder='2015年'
                                underlineColorAndroid='transparent'
                                keyboardType='default'
                                style={styles.textMessage}
                                onChangeText={(text) => {
                                    this.setState({
                                        fCometime: text
                                    });
                                }}
                            >{this.state.fCometime}</TextInput>
                        </View>
                        {
                            this.state.uri == '' ?
                                <TouchableOpacity style={styles.btn} onPress={() => {
                                    this._fetchData(this.state.id, this.state.fJianame, this.state.fName, this.state.first, this.state.fAge, this.state.fSex, this.state.fCometime, this.state.fXueyuan, this.state.fSchool, this.state.fImg);
                                    this.props.navigation.goBack()
                                }}>
                                    <Text style={styles.btnText}>确定</Text>
                                </TouchableOpacity>
                                : <TouchableOpacity style={styles.btn} onPress={() => {
                                    this._fetchData(this.state.id, this.state.fJianame, this.state.fName, this.state.first, this.state.fAge, this.state.fSex, this.state.fCometime, this.state.fXueyuan, this.state.fSchool, this.state.uri);
                                    this.props.navigation.goBack()
                                }}>
                                    <Text style={styles.btnText}>确定</Text>
                                </TouchableOpacity>
                        }

                    </View>
                </ScrollView>

            </View>
        );
    }
    _fetchData(id, fJianame, fName, first, fAge, fSex, fCometime, fXueyuan, fSchool, fImg) {
        var self = this;
        // alert(content)
        var key = fImg;
        // var key = new Date();
        Conf.ACCESS_KEY = 'BSi8Sd386VY3LO5itsbvm8geehWkLcGIpK7RxEeU';
        Conf.SECRET_KEY = 'ghSlX7iNRrThCXv9kVz_8BogOb4JT-lyXEYFqSeg';


        // var putPolicy = new Auth.PutPolicy2(
        //     { scope: "myavatar:" + key }
        // );
        // var uptoken = putPolicy.token();


        var avatar = fImg;
        var isBlur=true;
        var uptoken = 'BSi8Sd386VY3LO5itsbvm8geehWkLcGIpK7RxEeU:-Fh0goh8xCbVyJnxF8GvSBDGabY=:eyJzY29wZSI6Im15YXZhdGFyIiwiZGVhZGxpbmUiOjE4MDM3MTgxNTl9';
        let formInput = {
            key: key,
        }
        Rpc.uploadFile(fImg, uptoken, formInput, function (resp) {
            //   alert("上传成功");
            isBlur=true;
            avatar = 'http://ov6od9t69.bkt.clouddn.com/' + key;
            console.log(JSON.stringify(resp));

        }).then((e) => {
            // alert("成功")
            
            
            console.log(e)
        }).catch((e) => {
            //   alert("失败")
            isBlur=false;
            console.log(e)
        });
        // alert(isBlur);
        url = 'http://tree.luoyelusheng.cn/data/update_My_friendData?id=' + id + '&fJianame=' + fJianame + '&fName=' + fName + '&first=' + first + '&fAge=' + fAge + '&fSex=' + fSex + '&fCometime=' + fCometime + '&fXueyuan=' + fXueyuan + '&fSchool=' + fSchool + '&fImg=' + avatar,
            Util.get(url, function (data) {
                // alert(id);
                if (data.status) {
                    let obj = data.info;
                    self.setState({
                        obj: obj,
                    });
                    // alert(self.state.obj.fSchool);
                    self.props.navigation.state.params.onCallBack(self.state.obj,isBlur);
                    // 

                } else {
                    alert('服务异常,正在紧急修复,请耐心等待');
                }

            }, function (err) {
                alert(err);
                alert('服务异常,正在紧急修复,请耐心等待5');
            });

    }
}
const styles = StyleSheet.create({
    container1: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBig: {
        width: width,
        height: width * 0.4,
        marginBottom: width * 0.17
    },
    absolute: {
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0,
    },
    avatarContainer: {
        width: width,
        height: width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: width * 0.1,
    },
    avatar: {
        // position: 'absolute',
        // top: width*0.4- width * 0.15,
        width: width * 0.3,
        height: width * 0.3,
        borderWidth: 2,
        borderColor: 'white',
        resizeMode: 'cover',

    },

    avatarBox: {
        position: 'absolute',
        top: width * 0.4 - width * 0.15,
        width: width * 0.3,
        height: width * 0.3,
        left: width * 0.35,
        justifyContent: 'center',
        alignItems: 'center',
    },


    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        paddingTop: 12,
        paddingBottom: 12,
        height: 48,
        backgroundColor: '#00b3ca',
        flexDirection: 'row',
        paddingLeft: 10,
        // marginBottom:15,
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
    textWrap: {
        paddingLeft: 15,
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 40,
        paddingRight: 15,
        alignItems: 'center',
        marginBottom: 1,
    },
    textName: {
        fontSize: 18,
        color: 'black',
    },
    textMessage: {
        width: width * 0.7,
        textAlign: 'right',
        fontSize: 16,
        position: 'absolute',
        right: 15,
    },
    btn: {
        marginTop: 30,
        width: width * 0.9,
        marginLeft: width * 0.05,
        backgroundColor: '#00b3cb',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#00b3cb',
        marginBottom: 5,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    },
});