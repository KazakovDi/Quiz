import React from "react";
import Flex from "../../Components/UI/Flex/Flex";
import styled from "styled-components";
import TextAnchor from "../../Components/UI/TextAnchor/TextAnchor";
const Footer = () => {
  return (
    <StyledFooter>
      <Flex justify="between" align="center">
        <List>
          <li>
            telegram:
            <TextAnchor target="_blank" href="https://t.me/Mistah_bumbastick">
              @mistah_boombastick
            </TextAnchor>
          </li>
          <li>
            E-mail:
            <TextAnchor href="mailto:diman.ua68@gmail.com">
              diman.ua68@gmail.com
            </TextAnchor>
          </li>
          <li>phone: 0684600763</li>
        </List>
        <h2>QuizA</h2>
        <TextAnchor href="/">About us</TextAnchor>
      </Flex>
    </StyledFooter>
  );
};
const List = styled.ul`
  list-style: none;
  padding: 0;
  & li {
    font-size: 22px;
    margin: 5px 0;
  }
`;
const StyledFooter = styled.footer`
  position: fixed;
  width: 100vw;
  bottom: 0px;
  background-color: blue;
  padding: 0 10%;
  box-sizing: border-box;
  * {
    color: #fff;
  }
`;
export default Footer;
