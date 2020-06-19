import React, { useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { UserContext } from "/data/UserContext";
// import Button from "/components/ui/Button";
import { Button, Datepicker, Input } from "@ui-kitten/components";
import FormError from "/components/ui/FormError";
// import FileUpload from "/components/user/FileUpload";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 3rem;
`;

const TitlePage = styled.h2`
  text-align: center;
`;

const SettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 4rem;
`;

const ProfileForm = () => {
  const auth = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm();
  const { name, birthday } = auth.user;
  const { t } = useTranslation();

  const onSubmit = (data) => auth.updateProfile(data);

  return (
    <div>
      <TitlePage>{t("Profile settings")}</TitlePage>
      <SettingsWrapper>
        {/* <FileUpload user={auth.user} /> */}
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          <label>{t("name")}: </label>
          <Input
            type="text"
            defaultValue={name}
            name="name"
            ref={register({ required: true })}
          />
          {errors.name && <FormError />}
          <label>{t("birthday")}: </label>
          <Datepicker name="birthday" ref={register({ required: true })} />
          {/* <Input type="date" defaultValue={birthday} name="birthday" /> */}
          {errors.date && <FormError />}

          <Button onClick={handleSubmit(onSubmit)}>{t("save")}</Button>
        </FormWrapper>
      </SettingsWrapper>
    </div>
  );
};

export default ProfileForm;
