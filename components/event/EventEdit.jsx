import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Input, Button, Text, Datepicker } from "@ui-kitten/components";
import { CONTENT_WIDTH, SPACE } from "theme";

import { addEvent, updateEvent } from "data/EventService";
import styled from "styled-components/native";

const FormWrapper = styled(View)`
  display: flex;
  flex-direction: column;
  max-width: ${CONTENT_WIDTH};
  margin: 0 auto;
  padding: ${SPACE};
`;

const TitlePage = styled(Text)`
  text-align: center;
`;

const EventEdit = ({ event }) => {
  const { description, date } = event;
  const { control, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  const onSubmit = async (formData) => {
    const { id, ...rest } = event;
    if (id) await updateEvent(id, formData);
    else await addEvent({ ...rest, ...formData });
    window.location.reload();
  };

  return (
    <FormWrapper>
      <TitlePage>{t("add event")}</TitlePage>
      {/* <Text>{t("date")}: </Text> */}
      <Controller
        as={<Datepicker />}
        name="date"
        control={control}
        defaultValue={date}
      />

      {errors.date && <FormError />}

      {/* <Text>{t("description event")}</Text> */}
      <Controller
        as={<Input multiline={true} />}
        name="description"
        control={control}
        defaultValue={description}
      />
      <Button onPress={handleSubmit(onSubmit)}>{t("save")}</Button>
    </FormWrapper>
  );
};

export default EventEdit;
