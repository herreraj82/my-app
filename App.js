import {
  View,
  Text,
  Button,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import * as DocumentPicker from 'expo-document-picker';
import { files } from "jszip";

export default function App() {
  const [sentences, setSentences] = useState(0);
  const [currPage, setCurrPage] = useState(0);

  const osaat = async () => {
    // let book_uri = FileSystem.documentDirectory + "sherlock3.txt";

    //  if (!(await FileSystem.getInfoAsync(book_uri)).exists) {
    //   await FileSystem.downloadAsync(
    //     "https://pastebin.com/raw/Lup6yYqS",
    //     book_uri
    //   );
    //  }

    // const book = await FileSystem.readAsStringAsync(book_uri);
    // const parsed = new DOMParser().parseFromString(book);
    
    // let p_arr = parsed.querySelect('p');
    
    // let paragraphs = p_arr.map((e) => {
    //     return e.textContent + '¶';
    // });

    // let sentences = [];
    // paragraphs.forEach( (e) => {
    //     e.split('.').forEach((f) => {
    //         sentences.push(f + '.');
    //     })
    //   });

    //console.log(sentences);

    let file = await DocumentPicker.getDocumentAsync();
    console.log(file.uri);
    let response = await FileSystem.uploadAsync(
      'http://192.168.0.154:5000',
      file.uri,
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'uploadedFile'
      }
    );

    setSentences(JSON.parse(response.body));

    let save5_uri = FileSystem.documentDirectory + "save5.txt";
    if (!(await FileSystem.getInfoAsync(save5_uri)).exists) {
      FileSystem.writeAsStringAsync(save5_uri, "0");
    }

     setCurrPage(await FileSystem.readAsStringAsync(save5_uri));
  };

  const handlePress = async (summand) => {
    const newPage = Math.min(
      Math.max(Number(currPage) + summand, 0),
      sentences.length
    );

    setCurrPage(newPage);

    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "save2.txt",
      newPage.toString()
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
      }}
    >
      {sentences.length > 0 && (
        <TouchableWithoutFeedback
          onPress={(e) =>
            handlePress(
              e.nativeEvent.locationX / Dimensions.get("window").width < 1 / 2
                ? -1
                : 1
            )
          }
          touchSoundDisabled={true}
        >
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: StatusBar.currentHeight,
            }}
          >
            <Text
              style={{
                color: "cornsilk",
                fontSize: 28,
                textAlign: "center",
              }}
            >
              {sentences[currPage].replace("¶", "")}
            </Text>
            {sentences[currPage].includes("¶") && (
              <Text
                style={{
                  color: "cornsilk",
                  fontSize: 33,
                  top: 50,
                }}
              >
                ¶
              </Text>
            )}
          </View>
        </TouchableWithoutFeedback>
      )}

      <View style={{ width: "100%" }}>
        {!sentences && <Button title="Sherlock Holmes" onPress={osaat} />}

        {sentences.length > 0 && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 50,
            }}
          >
            <Button title="<--" onPress={() => handlePress(-1)} />
            <TextInput
              style={{ color: "white" }}
              placeholder={currPage.toString()}
              placeholderTextColor="white"
              keyboardType="number-pad"
              onSubmitEditing={(e) => setCurrPage(e.nativeEvent.text)}
            />
            <Text style={{ color: "white" }}>/</Text>
            <Text style={{ color: "white" }}>{sentences.length}</Text>
            <Button title="-->" onPress={() => handlePress(1)} />
          </View>
        )}
      </View>
    </View>
  );
}
