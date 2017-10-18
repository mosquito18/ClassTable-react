import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
const { width } = Dimensions.get('window')

const styles = {
    container: {
        // flex: 1,
        height: 175,
    },

    wrapper: {
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    image: {
        width,
        flex: 1
    },
    title:{
        backgroundColor:'red',
        color:'#fff',
        fontSize:16,

    },
        bannerImg: {
        width: '100%',
        height: 175,
        flex: 1
    }

}

export default class Swipers extends Component {
       constructor(props) {
        super(props);
        this.state = {
            swiperShow:false,
        };
    }
    	    componentDidMount(){
        setTimeout(()=>{
            this.setState({
                swiperShow:true
            });
        },0)
    }
    render() {
        if(this.state.swiperShow){ 
            return(
                
            <View style={styles.container}>
                <Swiper style={styles.wrapper} height={175} horizontal={true} showsButtons={false} autoplay={true}>
                    <View style={styles.slide}>
                        {/*<Text numberOfLines={1} style={styles.title}>Aussie tourist dies at Bali hotel</Text>*/}
                        <Image resizeMode='stretch' style={styles.image} source={require('../../img/1.jpg')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../../img/2.jpg')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../../img/3.jpg')} />
                    </View>
                    <View style={styles.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
                        <Image resizeMode='stretch' style={styles.image} source={require('../../img/4.jpg')} />
                    </View>
                </Swiper>
</View>


            )
        }else {
            return (
                <View style={{height:175}}>
                        <Image source={ require('../../img/1.jpg')} style={styles.bannerImg} />
                </View>
            );
        }
    }
}
        //        <Swiper style={styles.wrapper} height={240}
        //   onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
        //   dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        //   activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        //   paginationStyle={{
        //     bottom: -23, left: null, right: 10
        //   }} loop>
        // </Swiper>


// import React, { Component } from 'react'
// import {
//     Text,
//     View,
//     Image,
//     StyleSheet,
//     Dimensions,
// } from 'react-native'
// import Carousel from 'react-native-carousel'
// const { width } = Dimensions.get('window')

// export default class Swipers extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             swiperShow:false,
//         };
//     }

//     componentDidMount(){
//         setTimeout(()=>{
//             this.setState({
//                 swiperShow:true
//             });
//         },0)
//     }
//     render() {
//         if(this.state.swiperShow){ 
//         return (
//       <Carousel  width={width}  indicatorAtBottom={false} indicatorOffset={110} indicatorSize={20}  indicatorSpace={16}  delay={3000} >

//         <View style={styles.swipeContainer}>

//         <Image

//             style={styles.image}

//             resizeMode={Image.resizeMode.stretch}

//             source={require('../../img/1.jpg')}/>

//         </View>

//         <View style={styles.swipeContainer}>

//         <Image

//               style={styles.image}

//               resizeMode={Image.resizeMode.stretch}
//                source={require('../../img/2.jpg')} />

//         </View>

//         <View style={styles.swipeContainer}>

//         <Image

//                style={styles.image}

//                resizeMode={Image.resizeMode.stretch}

//                source={require('../../img/3.jpg')} />

//         </View>

//       </Carousel>
//         )
//     }else{
//                     return (
//                 <View style={{height:200}}>
//                                 <Image

//                style={styles.image}

//                resizeMode={Image.resizeMode.stretch}

//                source={require('../../img/3.jpg')} />
//                 </View>
//             );
//     }
//     }
// }


// const styles = StyleSheet.create({

//   swipeContainer: {

//     alignItems: 'center',

//     backgroundColor: 'transparent',

//   },

//  image:{
//         width:width,
//       height:128,

//  }

// });

