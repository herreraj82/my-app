import {
  View,
  Text,
  Button,
  StatusBar,
  TouchableWithoutFeedback,
  TextInput,
  Dimensions,
}                          from "react-native";
import { useState }        from "react";
import * as FileSystem     from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';
import MainScreen from "./mainscreen";
import ContentPane from "./contentpane";

export default function App() {
  const [sentences, setSentences] = useState(0);
  const [currPage,  setCurrPage]  = useState(0);

  async function osaat() {
    const file     = await DocumentPicker.getDocumentAsync();
    const response = await FileSystem.uploadAsync(
      'http://192.168.0.154:5000',
      file.uri,
      {
        httpMethod: 'POST',
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName:  'uploadedFile'
      }
    );
    setSentences(JSON.parse(response.body));
    let save_uri = FileSystem.documentDirectory + "save.txt";

    if (!(await FileSystem.getInfoAsync(save_uri)).exists) {
      FileSystem.writeAsStringAsync(save_uri, "0");
    }

    setCurrPage(await FileSystem.readAsStringAsync(save_uri));
  };

  async function handlePress(summand) {
    const newPage = Math.min(
      Math.max(Number(currPage) + summand, 0),
      sentences.length
    );
    setCurrPage(newPage);
    await FileSystem.writeAsStringAsync(
      FileSystem.documentDirectory + "save.txt",
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
      <MainScreen sentences={sentences} osaat={osaat} handlePress={handlePress} currPage={currPage} setCurrPage={setCurrPage}/>
    </View>
  );
}
