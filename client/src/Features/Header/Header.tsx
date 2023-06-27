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
const Header = () => {
  return (
    <HeaderSection>
      <nav>
        <Flex direction="row" align="center" justify="between">
          <UnstyledLink to="/">Quiza</UnstyledLink>
          <Flex direction="row" align="center" justify="between">
            <IconPlus />
            <IconUser />
            <IconSettings />
            <IconLogout />
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
