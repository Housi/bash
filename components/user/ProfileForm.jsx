import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { UserContext } from "/data/UserContext";
import { View } from "react-native";
import { Button, Datepicker, Input, Text } from "@ui-kitten/components";
import FormError from "/components/ui/FormError";

const FormWrapper = styled.View`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const TitlePage = styled.Text`
  text-align: center;
  font-size: 20px;
`;

const SettingsWrapper = styled.View`
  display: flex;
  justify-content: center;
`;

const ProfileForm = () => {
  const auth = useContext(UserContext);
  const { control, setValue, handleSubmit, errors } = useForm();
  const { name, birthday } = auth.user;
  const { t } = useTranslation();
  const [birthdayy, setBirthday] = useState(new Date(birthday));

  const onSubmit = (data) => auth.updateProfile(data);
  const settBirthday = (selected) => {};

  return (
    <View>
      <TitlePage>{t("Profile settings")}</TitlePage>
      <SettingsWrapper>
        {/* <FileUpload user={auth.user} /> */}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <Text>{t("name")}: </Text>
          <Controller
            as={<Input />}
            name="name"
            control={control}
            defaultValue={name}
          />
          {errors.name && <FormError />}
          <Text>{t("birthday")}: </Text>
          <Datepicker
            onSelect={(selected) => settBirthday(selected)}
            date={birthdayy}
          />
          {errors.date && <FormError />}

          <Button onPress={handleSubmit(onSubmit)}>{t("save")}</Button>
        </FormWrapper>
      </SettingsWrapper>
    </View>
  );
};

export default ProfileForm;
