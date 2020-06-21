import React from "react";
import styled from "styled-components/native";

const BaseButton = styled.a`
  color: black;
  display: inline-block;
  border-radius: 5px;
  padding: 0.5em 1em;
  cursor: pointer;
  text-align: center;
  :not(:last-of-type) {
    margin-right: 0.5em;
  }
`;

const PrimaryButton = styled(BaseButton)`
  background-color: var(--bash-color);
  &:hover {
    background-color: var(--bash-shade);
  }
`;

const SecondaryButton = styled(BaseButton)`
  border: 3px solid var(--bash-color);
  &:hover {
    border-color: var(--bash-shade);
  }
`;

const Button = ({ type = "primary", children, onClick }) => {
  if (type === "secondary")
    return <SecondaryButton onClick={onClick}>{children}</SecondaryButton>;
  return <PrimaryButton onClick={onClick}>{children}</PrimaryButton>;
};

export default Button;
