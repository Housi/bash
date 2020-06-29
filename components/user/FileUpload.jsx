import React, { useState, useContext } from "react";
import { UserContext } from "data/UserContext";
import fb from "data/firebase";
import styled from "styled-components/native";
import { useTranslation } from "react-i18next";

import { Input, Button, Text, Datepicker, Image } from "@ui-kitten/components";

const InputFile = styled(Input)`
  width: 100px;
  height: 20px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Label = styled.Text`
  color: black;
  display: inline-block;
  border-radius: 5px;
  padding: 0.5em 1em;
  cursor: pointer;
  text-align: center;
  :not(:last-of-type) {
    margin-right: 0.5em;
  }
  background-color: var(--bash-color);
  &:hover {
    background-color: var(--bash-shade);
  }
`;

const FileUpload = ({ user }) => {
  const { t } = useTranslation();
  const auth = useContext(UserContext);

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = fb.storage.ref(`images/${image.name}`).put(image);
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
          .child(image.name)
          .getDownloadURL()
          .then(async (url) => {
            await profileApi.doc(auth.uid).update({ photoUrl: url });
            window.location.reload();
          });
      }
    );
  };

  return (
    <div>
      <Image
        src={
          imageUrl ||
          user.photoUrl ||
          "https://cdn2.iconfinder.com/data/icons/user-70/512/397_Avatar_User_Basic-512.png"
        }
        alt="uploaded"
      />
      <br />
      <InputFile name="file" type="file" id="file" onChange={handleChange} />
      <Label htmlFor="file">{t("selectfoto")} </Label>
      <br />
      <Button onPress={handleUpload}>{t("save foto")}</Button>
    </div>
  );
};

export default FileUpload;