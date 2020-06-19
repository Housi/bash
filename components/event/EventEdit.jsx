import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { addEvent, updateEvent } from "data/EventService";
import FormError from "components/ui/FormError";
import Button from "components/ui/Button";
import Input from "components/ui/Input";
import Textarea from "components/ui/Textarea";
import styled from "styled-components";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  max-width: var(--content-width);
  margin: 0 auto;
  padding: var(--space);
`;

const TitlePage = styled.h1`
  text-align: center;
`;

const EventEdit = ({ event }) => {
  const { description, date } = event;
  const { register, handleSubmit, errors } = useForm();
  const { t } = useTranslation();

  const onSubmit = async (formData) => {
    const { id, ...rest } = event;
    if (id) await updateEvent(id, formData);
    else await addEvent({ ...rest, ...formData });
    window.location.reload();
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <TitlePage>{t("add event")}</TitlePage>
      <label>{t("date")}: </label>
      <Input
        type="date"
        name="date"
        defaultValue={date}
        ref={register({ required: true })}
      />
      {errors.date && <FormError />}

      <label>{t("description event")}</label>
      <Textarea
        type="textarea"
        defaultValue={description}
        name="description"
        ref={register({ required: true })}
      />
      <Button onClick={handleSubmit(onSubmit)}>{t("save")}</Button>
    </FormWrapper>
  );
};

export default EventEdit;
