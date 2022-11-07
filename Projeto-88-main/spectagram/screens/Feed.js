import React, { Component } from 'react';
import { Text, View , StyleSheet, Platform, StatusBar, Image} from 'react-native';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Flatlist} from 'react-native-gesture-handler';
import PostCard from './PostCard';


let stories = require("./temp.json");
let customFonts = {
    'Bubblugum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf'),
}

export default class Feed extends Component {
    constructor(props){
       super(props);
       this.state={
          fontsLoaded:false,
          posts: [],
       };
    }

    async _loadFontAsync() {
       await Font.loadAsync(customFonts);
       this.async_loadFontAsync({fontsLoaded:true});
    }

    componentDidMount(){
       this.async_loadFontAsync();
    }

    renderItem = ({ item: post }) => {
        return <PostCard post={post} navigation={this.props.navigation}/>;
    };

    keyExtractor = (item,index) => index.toString();

    fetchPosts = () => {
      firebase
          .database()
          .ref("/posts/")
          .on("value", (snapshot) => {
              let posts = []
              if (snapshot.val()) {
                  Object.keys(snapshot.val()).forEach(function (key) {
                      posts.push({
                          key: key,
                          value: snapshot.val()[key]
                      })
                  });
              }
              this.setState({ posts: posts })
              this.props.setUpdateToFalse();
          }, function (errorObject) {
              console.log("A leitura falhou: " + errorObject.code);
          })
   }

    render() {
        if (!this.state.fontsLoaded) {
            return<AppLoading/>;
        } else {
            return (
                <View style={styles.container}>
                   <SafeAreaView style={styles.droidSafeArea}>
                     <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                           <Image source={require("../assets/logo.png")} styles={{width:60, height:60, rezizeMode:"contain", marginLeft:10}}></Image>
                        </View>
                        <View style={styles.appTitleText}>
                        <Text>
                            App Narração de História
                        </Text>
                     </View>
                     </View>
                     <View style={styles.cardContainer}>
                        <Flatlist
                           keyExtractor = {this.keyExtractor}
                           data = {stories}
                           renderItem={this.renderItem}
                        />
                     </View>
                   </SafeAreaView>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container:{
       flex: 1,
       backgroundColor:"#15193c",
    },
    droidSafeArea:{
       marginTop:Platform.OS === "android"?StatusBar.currentHeight:0
    },
    appTitle:{
       flex:0.07,
       flexDirection:"row",
       flexWrap:"wrap",
       padding: 5,
    },
    appIcon:{
       flex:0.3
    },
    appTitleTextContainer:{
       justifyContent:"center",
       alignItems:"center",
    },
    appTitleText:{
       color:"white",
       fontSize:28,
       fontFamily:"Bubblegum-Sans",
       paddingLeft:20
    },
    cardContainer:{
        flex:0.85
    }
})