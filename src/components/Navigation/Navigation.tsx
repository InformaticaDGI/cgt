import styled from "styled-components";
import Logo from "../Logo/Logo";
import NavItems from "./NavItems";


const Navigation = ({ children }: { children: React.JSX.Element }) => {

  return (
    <DrawerWrapper>
      <Drawer>
        <Nav>
          <Logo />
          <Spacer />
          <NavItems />
        </Nav>
      </Drawer>
      {children}
    </DrawerWrapper>
  )
};

export default Navigation;

  const DrawerWrapper = styled.div`
    display: flex;
  `;


  const Drawer = styled.div`
        width: 292px;
        min-height: 100vh;
        background: linear-gradient(180deg, var(--primary) 0%, var(--secondary) 100%);
  `;

  const Nav = styled.div`
      display: flex;
      gap: 0.7em;
      flex-direction: column;
      padding-left: 17px;
      padding-top: 44px;
  `;

  const Spacer = styled.div`
        border: 1px solid transparent;
        border-image: linear-gradient(to right, rgba(224, 225, 226, 0) 0%, rgba(224, 225, 226, 1) 50%, rgba(224, 225, 226, 0.16) 100%) 1;
        max-width: 95%;
  `;
