import React from "react";
import Flex from "../../Components/UI/Flex/Flex";
import UnstyledLink from "../../Components/UI/UnstyledLink/UnstyledLink";
import {
  IconUser,
  IconSettings,
  IconLogout,
  IconPlus,
} from "@tabler/icons-react";
import styled from "styled-components";
import Button from "../../Components/UI/Button/Button";
import { useLogout } from "./hooks/useLogout";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Container from "../../Components/UI/Container/Container";
const Header = () => {
  const Logout = useLogout();
  const username = useSelector((state: RootState) => state.User.username);
  return (
    <HeaderSection>
      <Container>
        <nav>
          <Flex direction="row" align="center" justify="between">
            <Logo to="/">Quiza</Logo>
            <Flex direction="row" align="center" justify="around">
              <BlockLink to="/create">
                <IconPlus />
              </BlockLink>

              <Username>{username}</Username>
              <BlockLink onClick={Logout} to="#">
                <IconLogout />
              </BlockLink>
            </Flex>
          </Flex>
        </nav>
      </Container>
    </HeaderSection>
  );
};
const Logo = styled(Link)`
  font-size: 40px;
  text-decoration: none;
  font-weight: 700;
`;
const Username = styled.h2`
  margin: 0;
`;
const BlockLink = styled(Link)`
  margin: 0 10px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  * {
    width: 50px;
    height: 50px;
  }
`;
const HeaderSection = styled.header`
  background-color: #29a2eb;
  * {
    color: #fff;
  }
`;
export default Header;
