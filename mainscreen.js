import {
    View,
    Text,
    Button,
    StatusBar,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
  }                          from "react-native";
  import FooterBar from "./footerbar";
  import ContentPane from "./contentpane";

  export default function MainScreen(props) {
    return(
        <View style={{ width: "100%" ,flex:1}}>
            {!props.sentences && <Button title="Convert Ebook" onPress={props.osaat} />}

            {props.sentences.length > 0 && (<ContentPane handlePress={props.handlePress} sentences={props.sentences} currPage={props.currPage}/>)}

            {props.sentences.length > 0 && ( <FooterBar handlePress={props.handlePress} sentences={props.sentences} currPage={props.currPage} setCurrPage={props.setCurrPage}/>)}
      </View>
    );
  }

