import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PixelRatio,
  TouchableOpacity,
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';
const {width,height} = Dimensions.get('window');
import ImagePicker from 'react-native-image-picker';
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
export default class Photo extends React.Component {

  state = {
    avatarSource: null,
    // videoSource: null
  };

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

        this.setState({
          avatarSource: source
        });
      }
    });
  }

  // selectVideoTapped() {
  //   const options = {
  //     title: 'Video Picker',
  //     takePhotoButtonTitle: 'Take Video...',
  //     mediaType: 'video',
  //     videoQuality: 'medium'
  //   };

  //   ImagePicker.showImagePicker(options, (response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled video picker');
  //     }
  //     else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     }
  //     else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     }
  //     else {
  //       this.setState({
  //         videoSource: response.uri
  //       });
  //     }
  //   });
  // }

  render() {
    return (
      <View style={styles.container}>
        {/*<TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 20}]}>
          { this.state.avatarSource === null ? <Text>Select a Photo</Text> :
            <Image style={styles.avatar} source={this.state.avatarSource} />
          }
          </View>
        </TouchableOpacity>*/}



        { this.state.avatarSource === null ? <TouchableOpacity
            style={styles.btn}
            onPress={this.selectPhotoTapped.bind(this)}>  
                <Text style={styles.btnText}>拍照</Text>
        </TouchableOpacity>:<TouchableOpacity
            style={styles.avatar}
            onPress={this.selectPhotoTapped.bind(this)}>  
                <Image style={styles.avatar} source={this.state.avatarSource} />
        </TouchableOpacity>
             
        }
        {/*<TouchableOpacity
            style={styles.btn}
            onPress={this.selectPhotoTapped.bind(this)}>  
                <Text style={styles.btnText}>拍照</Text>
        </TouchableOpacity>
        <Image style={styles.avatar} source={this.state.avatarSource} />*/}

        {/*<TouchableOpacity onPress={this.selectVideoTapped.bind(this)}>
          <View style={[styles.avatar, styles.avatarContainer]}>
            <Text>Select a Video</Text>
          </View>
        </TouchableOpacity>

        { this.state.videoSource &&
          <Text style={{margin: 8, textAlign: 'center'}}>{this.state.videoSource}</Text>
        }*/}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop:20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF'
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    // borderRadius: 75,
    // marginTop:20,
    width: 150,
    height: 150
  },
      btn: {
        marginTop:20,
        width:width*0.9,
        // marginLeft:width*0.05,
        backgroundColor:'#c3c3c3',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#c3c3c3',
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000'
    },
});
