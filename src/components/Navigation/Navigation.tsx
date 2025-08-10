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
    background: rgba(244,245,251,1);
  `;


const Drawer = styled.div`
        width: 280px;
        min-height: 100vh;
        background: linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%);
        flex-shrink: 0;
        box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
        position: relative;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
            pointer-events: none;
        }
  `;

const Nav = styled.div`
      display: flex;
      gap: 1.2em;
      flex-direction: column;
      padding: 1.2em;
      position: relative;
      z-index: 1;
  `;

const Spacer = styled.div`
        border: 1px solid transparent;
        border-image: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%) 1;
        max-width: 100%;
        margin: 8px 0;
        opacity: 0.6;
  `;
