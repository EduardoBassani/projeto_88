import React, { Component } from 'react';
import { Text, View , StyleSheet, Platform, StatusBar, Image} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import {Flatlist} from 'react-native-gesture-handler';

export default class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
          light_theme: true,
          post_id: this.props.post.key,
          post_data: this.props.post.value
        };
      }

    componentDidMount(){
      this.fetchUser();
    }

    fetchUser = () => {
        let theme;
        firebase
          .database()
          .ref("/users/" + firebase.auth().currentUser.uid)
          .on("value", snapshot => {
            theme = snapshot.val().current_theme;
            this.setState({ light_theme: theme === "light" });
          });
      };

    renderItem = ({ item: post }) => {
        return <PostCard post={post} />;
    };
    
    keyExtractor = (item, index) => index.toString();

    render() {
        return (
              <View style={styles.container}>
                <View style={styles.cardContainer}>
                  <Image
                    source={require("../assets/story_image_1.png")}
                    style={styles.storyImage}
                  ></Image>
                  <View style={styles.titleContainer}>
                    <Text style={styles.storyTitleText}>
                      {this.props.story.title}
                    </Text>
                    <Text style={styles.storyAuthorText}>
                      {this.props.story.author}
                    </Text>
                    <Text style={styles.descriptionText}>
                      {this.props.story.description}
                    </Text>
                  </View>
                 <View style={styles.actionContainer}>
                <View style={styles.likeButton}>
                    <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                    <Text style={styles.likeText}>12k</Text>
                </View>
                </View>
                 <View style={styles.cardContainer}>
                 <FlatList
                    keyExtractor={this.keyExtractor}
                    data={stories}
                    renderItem={this.renderItem}
                 />
                 </View>
            </View>
            </View>
         );
        }
    }

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2a2a2a",
        borderRadius: RFValue(20),
        padding: RFValue(20)
    },
    authorContainer: {
        flex: 0.1,
        flexDirection: "row"
    },
    authorImageContainer: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        borderRadius: RFValue(100)
    },
    authorNameContainer: {
        flex: 0.85,
        justifyContent: "center"
    },
    authorNameText: {
        color: "white",
        fontSize: RFValue(20)
    },
    postImage: {
        marginTop: RFValue(20),
        resizeMode: "contain",
        width: "100%",
        alignSelf: "center",
        height: RFValue(275)
    },
    captionContainer: {},
    captionText: {
        fontSize: 13,
        color: "white",
        paddingTop: RFValue(10)
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#eb3948",
        borderRadius: RFValue(30)
    },
    likeText: {
        color: "white",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    },
    postCardLight: {
      margin: RFValue(20),
      backgroundColor: "#eaeaea",
      borderRadius: RFValue(20)
    },
    postCard: {
        margin: RFValue(20),
        backgroundColor: "black",
        borderRadius: RFValue(20)
    }
});