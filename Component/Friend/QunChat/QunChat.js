'use strict';
import React from 'react';
import ReactNative from 'react-native';
import IMUI from 'aurora-imui-react-native';
import TimerMixin from 'react-timer-mixin';
var {
	View,
    Text,
    Image,
    TouchableHighlight,
    TextInput,
    Dimensions,
    NativeModules,
    StyleSheet,
    Platform,
    TouchableOpacity,
    PermissionsAndroid,
} = ReactNative;
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
var MessageList = IMUI.MessageList;
var ChatInput = IMUI.ChatInput;
var AuroraIMUIController = IMUI.AuroraIMUIController;
const IMUIMessageListDidLoad = "IMUIMessageListDidLoad";
import moment from 'moment';
import Util from '../../Common/util.js';
var times = moment(new Date).format('HH:mm');
export default class QunChat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            single: this.props.groupId === "",
            groupNum: '(1)',
            inputContent: '',
            recordText: '按住 说话',
            menuContainerHeight: 850,
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 100
            },
            isDismissMenuContainer: false,
            updateUI: false,


            title: this.props.navigation.state.params.item.fName,
            img: this.props.navigation.state.params.item.fImg,
            id: this.props.navigation.state.params.item.id,
            // MyID: this.props.navigation.state.params.MyID,
            MyID: '50F1421D-2C64-4447-9C3B-0E8716B86F7D',
            newstype: this.props.navigation.state.params.item.newstype,
            My: '',
            message: '',

        };
        
        this.onMsgClick = this.onMsgClick.bind(this);
        this.onAvatarClick = this.onAvatarClick.bind(this);
        this.onMsgLongClick = this.onMsgLongClick.bind(this);
        this.onStatusViewClick = this.onStatusViewClick.bind(this);
        this.onTouchMsgList = this.onTouchMsgList.bind(this);
        this.onSendText = this.onSendText.bind(this);
        this.onSendGalleryFiles = this.onSendGalleryFiles.bind(this);
        this.onStartRecordVideo = this.onStartRecordVideo.bind(this);
        this.onFinishRecordVideo = this.onFinishRecordVideo.bind(this);
        this.onCancelRecordVideo = this.onCancelRecordVideo.bind(this);
        this.onStartRecordVoice = this.onStartRecordVoice.bind(this);
        this.onFinishRecordVoice = this.onFinishRecordVoice.bind(this);
        this.onTakePicture = this.onTakePicture.bind(this);
        this.onCancelRecordVoice = this.onCancelRecordVoice.bind(this);
        this.onSwitchToMicrophoneMode = this.onSwitchToMicrophoneMode.bind(this);
        this.onSwitchToGalleryMode = this.onSwitchToGalleryMode.bind(this);
        this.onSwitchToCameraMode = this.onSwitchToCameraMode.bind(this);
        this.onTouchEditText = this.onTouchEditText.bind(this);
        this.onPullToRefresh = this.onPullToRefresh.bind(this);
    }

    componentWillMount() { }
    //点击消息气泡触发
    onMsgClick(message) {
        console.log("message click! " + message);
    }

    onMsgLongClick(message) {
        console.log("message long click " + message);
    }
    //点击头像触发
    onAvatarClick(fromUser) {
        console.log("Avatar click! " + fromUser);
    }
    //点击消息状态按钮触发
    onStatusViewClick(message) {
        console.log("on message resend! " + message);
    }
    //点击聊天列表触发
    onTouchMsgList() {
        console.log("Touch msg list, hidding soft input and dismiss menu");
        this.setState({
            isDismissMenuContainer: true,
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 100
            },
        });
    }
    //滚动MessageList到顶部时，下拉触发，案例用法：参考示例中的聊天组件中的onPullToRefresh方法
    onPullToRefresh() {
        console.log("pull to refresh! Will load history messages insert to top of MessageList");
        var messages = [ {
            msgId: "1",
            status: "send_succeed",
            msgType: "text",
            text: "history2",
            isOutgoing: true,
            fromUser: {
                userId: this.state.My.id,
                displayName: this.state.My.fName,
                avatarPath: this.state.My.fImg
            },
            timeString: "9:20",
        }];
        AuroraIMUIController.insertMessagesToTop(messages);
        //消息数组的顺序排列要按照时间顺序排列
    }


    //输入文字后点击发送按钮触发
    onSendText(text) {
        console.log("will send text: " + text);
        AuroraIMUIController.scrollToBottom(true);
        var messages = [{
            msgId: "1",
            status: "send_succeed",
            msgType: "text",
            text: text,
            isOutgoing: true,
            fromUser: {
                userId: this.state.My.id,
                displayName: this.state.My.fName,
                avatarPath: this.state.My.fImg
            },
            timeString: times,
        }];
        this.setState({
            isDismissMenuContainer: true,
            updateUI: true,
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 100
            },
            message: text,
        });
        AuroraIMUIController.appendMessages(messages);

    }
    //选中视频或图片后点击发送按钮触发
    onSendGalleryFiles(mediaFiles) {
        console.log("will send media files: " + mediaFiles);
        AuroraIMUIController.scrollToBottom(true);
        for (var i = 0; i < mediaFiles.length; i++) {
            var mediaFile = mediaFiles[i];
            console.log("mediaFile: " + mediaFile);
            var messages;
            if (mediaFile.mediaType == "image") {
                messages = [{
                    msgId: "1",
                    status: "send_succeed",
                    msgType: "image",
                    isOutgoing: true,
                    mediaPath: mediaFile.mediaPath,
                    fromUser: {
                        userId: this.state.My.id,
                        displayName: this.state.My.fName,
                        avatarPath: this.state.My.fImg
                    },
                    timeString: times
                }];
            } else {
                messages = [{
                    msgId: "1",
                    status: "send_succeed",
                    msgType: "video",
                    isOutgoing: true,
                    mediaPath: mediaFile.mediaPath,
                    duration: mediaFile.duration,
                    fromUser: {
                        userId: this.state.My.id,
                        displayName: this.state.My.fName,
                        avatarPath: this.state.My.fImg
                    },
                    timeString: times
                }];
            }
            this.setState({
                isDismissMenuContainer: true,
                chatInputStyle: {
                    width: Dimensions.get('window').width,
                    height: 100
                },
                message: '[图片]',
            });
            AuroraIMUIController.appendMessages(messages);
        }
    }
    //点击录制视频按钮触发
    onStartRecordVideo() {
        console.log("start record video");
        AuroraIMUIController.scrollToBottom(true);
    }
    //完成录制视频触发
    onFinishRecordVideo(mediaPath, duration) {
        console.log("finish record video, Path: " + mediaPath + " duration: " + duration);
        var messages = [{
            msgId: "1",
            status: "send_succeed",
            msgType: "video",
            isOutgoing: true,
            mediaPath: mediaPath,
            duration: duration,
            fromUser: {
                userId: this.state.My.id,
                displayName: this.state.My.fName,
                avatarPath: this.state.My.fImg
            },
            timeString: times
        }];
        AuroraIMUIController.appendMessages(messages);
    }
    //取消录制视频触发
    onCancelRecordVideo() {
        console.log("cancel record video");
    }
    //点击录音按钮触发
    onStartRecordVoice() {
        console.log("start record voice");

    }
    //录音完成后松开手指触发
    onFinishRecordVoice(mediaPath, duration) {
        console.log("finish record voice, mediaPath: " + mediaPath + " duration: " + duration);
        var messages = [{
            msgId: "1",
            status: "send_succeed",
            msgType: "voice",
            isOutgoing: true,
            mediaPath: mediaPath,
            duration: duration,
            fromUser: {
                userId: this.state.My.id,
                displayName: this.state.My.fName,
                avatarPath: this.state.My.fImg
            },
            timeString: times
        }];
        AuroraIMUIController.appendMessages(messages);
        this.setState({
            isDismissMenuContainer: true,
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 100
            },
            message: '[语音]',
        });
    }
    //手指移动到取消录音区域后，抬起手指触发
    onCancelRecordVoice() {
        console.log("cancel record voice");
    }
    //点击拍照按钮触发
    onTakePicture(mediaPath) {
        console.log("finish take picture, mediaPath: " + mediaPath);
        // alert(1);
        // AuroraIMUIController.scrollToBottom(true);
        var messages = [{
            msgId: "1",
            status: "send_succeed",
            msgType: "image",
            isOutgoing: true,
            mediaPath: mediaPath,
            fromUser: {
                userId: this.state.My.id,
                displayName: this.state.My.fName,
                avatarPath: this.state.My.fImg
            },
            timeString: times
        }];
        this.setState({
            isDismissMenuContainer: true,
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 100
            },
            message: '[图片]',
        });
        AuroraIMUIController.appendMessages(messages);

    }
    //点击菜单栏麦克风按钮触发
    async onSwitchToMicrophoneMode() {
        console.log("switch to microphone mode, set menuContainerHeight : " + this.state.menuContainerHeight);
        AuroraIMUIController.scrollToBottom(true);
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, {
                    'title': 'IMUI needs Record Audio Permission',
                    'message': 'IMUI needs record audio ' +
                    'so you can send voice message.'
                });
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can record audio");
            } else {
                console.log("Record Audio permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
        if (this.state.chatInputStyle.height == 100) {
            this.setState({
                chatInputStyle: {
                    width: Dimensions.get('window').width,
                    height: 420
                },
            });
        } else {
            this.setState({
                chatInputStyle: {
                    width: Dimensions.get('window').width,
                    height: 100
                },
            });
        }

    }
    //点击菜单栏图片按钮触发
    async onSwitchToGalleryMode() {
        console.log("switch to gallery mode");
        AuroraIMUIController.scrollToBottom(true);
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
                    'title': 'IMUI needs Read External Storage Permission',
                    'message': 'IMUI needs access to your external storage ' +
                    'so you select pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can select pictures");
            } else {
                console.log("Read External Storage permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
        if (this.state.chatInputStyle.height == 100) {
            this.setState({
                chatInputStyle: {
                    width: Dimensions.get('window').width,
                    height: 420
                },
                menuContainerHeight: 850,
            });
        } else {
            this.setState({
                isDismissMenuContainer: true,
                chatInputStyle: {
                    width: Dimensions.get('window').width,
                    height: 100
                },
            });
        }

    }
    //点击菜单栏拍照按钮触发
    async onSwitchToCameraMode() {
        console.log("switch to camera mode");
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA, {
                    'title': 'IMUI needs Camera Permission',
                    'message': 'IMUI needs access to your camera ' +
                    'so you can take awesome pictures.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can select pictures");
            } else {
                console.log("Read External Storage permission denied");
            }
        } catch (err) {
            console.warn(err)
        }
        if (this.state.chatInputStyle.height == 100) {
            this.setState({
                chatInputStyle: {
                    width: Dimensions.get('window').width,
                    height: 420
                },
            });
        } else {
            this.setState({
                isDismissMenuContainer: true,
                chatInputStyle: {
                    width: Dimensions.get('window').width,
                    height: 100
                },
            });
        }


    }
    //点击输入框触发
    onTouchEditText() {
        console.log("will scroll to bottom");
        AuroraIMUIController.scrollToBottom(true);
        this.setState({
            isDismissMenuContainer: true,
            chatInputStyle: {
                width: Dimensions.get('window').width,
                height: 100
            },
        });
    }

    componentDidMount() {
        this._fetSerchData();
        //AuroraIMUIController会初始化先于MessageListView完成，如果调用需要对MessageListView的所有操作（添加消息，删除消息，更新消息）在需要MessageListDidLoad事件触发后才会起作用。
        AuroraIMUIController.addMessageListDidLoadListener(() => {
            console.log("MessageList did load !");
        });
        this.timer = setTimeout(() => {
            console.log("updating message! ");
            var messages = [{
                msgId: "1",
                status: "send_succeed",
                msgType: "text",
                text: "Hello world",
                isOutgoing: false,
                fromUser: {
                    userId: this.state.id,
                    displayName: this.state.title,
                    avatarPath: this.state.img
                },
                timeString: "10:00",
            }];
            AuroraIMUIController.appendMessages(messages);
        }, 5000);

    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        AuroraIMUIController.removeMessageListDidLoadListener(IMUIMessageListDidLoad);
        //对取消MessageListDidLoad事件的监听。
    }

    render() {
        var listHeight = height - this.state.chatInputStyle.height;
         return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this._fetchData(this.state.id, this.state.message)}
                        style={styles.backBox}>
                        <Icon name='ios-arrow-back'
                            style={styles.backIcon}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText} numberOfLines={1}>
                        {this.state.title}
                    </Text>
                    {this.state.newstype == 'qun' ? <TouchableOpacity style={styles.headerEdit}
                        onPress={() => this.props.navigation.navigate('ChatReset', { fqunName: this.state.title })}>
                        <View>
                            <Icon style={{ color: '#fff' }}
                                name='md-settings'
                                size={24} />
                        </View>
                    </TouchableOpacity> : <TouchableOpacity style={styles.headerEdit}
                        onPress={() => this.props.navigation.navigate('ChatFriendReset', { item: this.props.navigation.state.params.item })}>
                            <View>
                                <Icon style={{ color: '#fff' }}
                                    name='md-settings'
                                    size={24} />
                            </View>
                        </TouchableOpacity>}

                </View>
                <MessageList
                    style={{ flex: 1, height: listHeight }}
                    {...this.props}
                    ref={com => this.view = com}
                    updateUI={this.state.updateUI}
                    onMsgClick={this.onMsgClick}
                    onMsgLongClick={this.onMsgLongClick}
                    onAvatarClick={this.onAvatarClick}
                    onStatusViewClick={this.onStatusViewClick}
                    onTouchMsgList={this.onTouchMsgList}
                    onPullToRefresh={this.onPullToRefresh}
                    sendBubble={{ imageName: "send_msg", padding: 10 }}
                    receiveBubbleTextColor={'#ffffff'}
                    sendBubbleTextSize={18}
                    receiveBubbleTextSize={14}
                    sendBubblePressedColor={'#dddddd'}
                    eventMsgTxtColor={'#ffffff'}
                    eventMsgTxtSize={16}
                />
                <ChatInput
                    style={this.state.chatInputStyle}
                    menuContainerHeight={this.state.menuContainerHeight}
                    isDismissMenuContainer={this.state.isDismissMenuContainer}
                    onSendText={this.onSendText}
                    onSendGalleryFiles={this.onSendGalleryFiles}
                    onTakePicture={this.onTakePicture}
                    onStartRecordVideo={this.onStartRecordVideo}
                    onFinishRecordVideo={this.onFinishRecordVideo}
                    onCancelRecordVideo={this.onCancelRecordVideo}
                    onStartRecordVoice={this.onStartRecordVoice}
                    onFinishRecordVoice={this.onFinishRecordVoice}
                    onCancelRecordVoice={this.onCancelRecordVoice}
                    onSwitchToMicrophoneMode={this.onSwitchToMicrophoneMode}
                    onSwitchToGalleryMode={this.onSwitchToGalleryMode}
                    onSwitchToCameraMode={this.onSwitchToCameraMode}
                    onTouchEditText={this.onTouchEditText}
                />
            </View>
            // <View style={styles.container}>

            // </View>
        );
    }
    _fetSerchData() {
        var self = this;
        Util.get('http://tree.luoyelusheng.cn/data/read?type=friendData', function (data) {
            if (data.status) {
                let obj = data.data;
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].id == self.state.MyID) {
                        self.setState({
                            My: obj[i],
                        });
                        break;
                    }
                }
            } else {
                alert('服务异常,正在紧急修复,请耐心等待1');
            }

        }, function (err) {
            alert(err);
            alert('服务异常,正在紧急修复,请耐心等待2');
        });

    }
    _fetchData(id, content) {
        var isLeap = true;
        var self = this;
        
        url = 'http://tree.luoyelusheng.cn/data/update_qunnews?id=' + id + '&content=' + content,
            Util.get(url, function (data) {
                if (data.status) {
                    let obj = data.info;
                    self.setState({
                        obj: obj,
                    });
                    self.props.navigation.navigate('Friend', { MyID: self.state.MyID });

                } else {
                    alert('服务异常,正在紧急修复,请耐心等待3');
                }

            }, function (err) {
                alert(err);
                alert('服务异常,正在紧急修复,请耐心等待4');
            });


    }
}

var styles = StyleSheet.create({
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
    headerEdit: {
        position: 'absolute',
        right: 15,
        top: 12,
    },
});