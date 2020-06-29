// import * as React from "react";
import React, { useState, useContext, useEffect } from "react";
import { Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { UserContext } from "data/UserContext";
import fb from "data/firebase";
import { Button, Layout } from "@ui-kitten/components";

const ImagePickerr = ({ user }) => {
  const [image, setImage] = useState(null);
  const auth = useContext(UserContext);

  useEffect(() => {
    getPermissionAsync();
  });

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImage(result);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const handleUpload = () => {
    const imageUrl = image.uri.substring(23);

    const uploadTask = fb.storage
      .ref("images/aska22")
      .putString(imageUrl, "base64", {
        contentType: "image/jpeg",
      });

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        const profileApi = fb.database.collection("profiles");
        fb.storage
          .ref("images")
          .child("aska22")
          .getDownloadURL()
          .then(async (url) => {
            await profileApi.doc(auth.uid).update({ photoUrl: url });
            window.location.reload();
          });
      }
    );
  };

  return (
    <Layout style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={pickImage}>Pick an image from camera roll</Button>
      <Image
        style={{ width: 100, height: 100 }}
        source={{
          uri:
            image?.uri ||
            user.photoUrl ||
            "https://cdn2.iconfinder.com/data/icons/user-70/512/397_Avatar_User_Basic-512.png",
        }}
        alt="uploaded"
      />
      <Button onPress={handleUpload}>Save foto</Button>
    </Layout>
  );
};

export default ImagePickerr;
