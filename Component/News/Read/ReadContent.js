import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    Platform,
    FlatList,
    ScrollView,
    WebView,
    Image,
    View
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
export default class ReadContent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let url = this.props.navigation.state.params.item.url;
        // alert(url);
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
                        阅读
                    </Text>
                </View>
                <WebView styleWebViewstyle={styles.webview_style}
                    source={{ uri: url }}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                >
                </WebView>
            </View>
        );
    }
    _loadError() {
        this.setState({
            isShowErrorPage: true
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9fb',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
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
    webview_style: {
        backgroundColor: '#00ff00',
    },
});






