import {
    View,
    Text,
    Button,
    StatusBar,
    TouchableWithoutFeedback,
    TextInput,
    Dimensions,
  }                          from "react-native";

export default function FooterBar(props) {
    return (
        <View
                style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 50,
                }}
        >
                <Button title="<--" onPress={() => props.handlePress(-1)} />
                <TextInput
                style={{ color: "white" }}
                placeholder={props.currPage.toString()}
                placeholderTextColor="white"
                keyboardType="number-pad"
                onSubmitEditing={(e) => props.setCurrPage(e.nativeEvent.text)}
                />
                <Text style={{ color: "white" }}>/</Text>
                <Text style={{ color: "white" }}>{props.sentences.length}</Text>
                <Button title="-->" onPress={() => props.handlePress(1)} />
        </View>
)
        }