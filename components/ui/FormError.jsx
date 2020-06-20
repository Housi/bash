import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

const ErrorInfo = styled.Text`
  margin: -15px 0 -15px 0;
  color: red;
`;

const FormError = () => {
  const { t } = useTranslation();
  return <ErrorInfo>{t("field required")}</ErrorInfo>;
};

export default FormError;
