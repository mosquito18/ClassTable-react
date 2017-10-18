import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    TouchableHighlight,
    Animated,
    Image,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.icons = { //Step 2 
            'up': 'ios-arrow-up', 'down':'ios-arrow-down'
        };
        this.state = { //Step 3 
            title: props.title,
            expanded: true,
            animation: new Animated.Value(),
            height:0,
        };
    }
    toggle() { //Step 1 
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.height;
        let height=this.state.maxHeight + this.state.minHeight;
        this.setState({
            height:height,
            expanded: !this.state.expanded //Step 2 
        }); 
        this.state.animation.setValue(initialValue); //Step 3 
        Animated.spring( //Step 4 
            this.state.animation, { toValue: finalValue }
            ).start(); //Step 5 
    }

    _setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }
    _setMinHeight(event) {
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    render() {
        let icon = this.icons['down']
        if (this.state.expanded) {
            icon = this.icons['up']; //Step 4 
        } //Step 5 
        return (
            <Animated.View 
            style={[styles.container,{height: this.state.animation}]}
            > 
                <View style={styles.container} >
                    <View style={styles.titleContainer}
                        onLayout={this._setMinHeight.bind(this)} >
                        <Text style={styles.title}>{this.state.title}</Text>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={this.toggle.bind(this)}
                            underlayColor="#f1f1f1">
                            <Icon name={icon}
                                size={28}
                                style={styles.headerEdit}
                            />
                            {/*<Image
                                style={styles.buttonImage}
                                source={icon}
                            ></Image>*/}
                        </TouchableHighlight>
                    </View >
                    <View style={styles.body}
                        onLayout={this._setMaxHeight.bind(this)}>
                        {this.props.children}
                    </View>
                </View >
            </Animated.View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dedfe1',
        // margin: 10,
        overflow: 'hidden'
    },
    titleContainer: {
        flexDirection: 'row',
        backgroundColor:'#fff',
    }, 
    title: {
        fontSize:18,
        flex: 1,
        padding: 10,
        color: '#2a2f43',
        fontWeight: 'bold'
    },
    button: {

    },
    buttonImage: {
        width: 30,
        height: 25
    },
    body: {
        // padding: 10,
        paddingBottom: 10,
    },
    headerEdit: {
        marginRight:15,
        marginTop:10,
        // color: '#fff',
        // position: 'absolute',
        // right: 15,
        // top: 12,
    },
});

