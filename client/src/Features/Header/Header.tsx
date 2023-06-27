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
import { useAppDispatch } from "../../Redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/UserSlice";
import { useLogout } from "./hooks/useLogout";
const Header = () => {
  const Logout = useLogout();
  return (
    <HeaderSection>
      <nav>
        <Flex direction="row" align="center" justify="between">
          <UnstyledLink to="/">Quiza</UnstyledLink>
          <Flex direction="row" align="center" justify="between">
            <IconPlus />
            <IconUser />
            <IconSettings />
            <Button onClick={Logout} variant="hollow" color="#fff">
              <IconLogout />
            </Button>
          </Flex>
        </Flex>
      </nav>
    </HeaderSection>
  );
};

const HeaderSection = styled.header`
  background-color: #29a2eb;
  * {
    color: #fff;
  }
`;
export default Header;
