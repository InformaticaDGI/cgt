import styled from "styled-components";
import Logo from "../Logo/Logo";
import NavItems from "./NavItems";
import { Outlet } from "react-router";


const Navigation = () => {

  return (
    <DrawerWrapper>
      <Drawer>
        <Nav>
          <Logo />
          <Spacer />
          <NavItems />
        </Nav>
      </Drawer>
      <Outlet />
    </DrawerWrapper>
  )
};

export default Navigation;

  const DrawerWrapper = styled.div`
    display: flex;
  `;


  const Drawer = styled.div`
        width: 15vw;
        min-height: 100vh;
        background: linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%);
        flex-shrink: 0;
  `;

  const Nav = styled.div`
      display: flex;
      gap: 1.4em;
      flex-direction: column;
      padding-left: 12px;
      padding-right: 12px;
      padding-top: 1.4em;
  `;

  const Spacer = styled.div`
        border: 1px solid transparent;
        border-image: linear-gradient(to right, rgba(255, 225, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 225, 255, 0.16) 100%) 1;
        max-width: 95%;
  `;
