import styled from "styled-components";
import MenuItem from "./MenuItem";
import buildNavItems from "./config";


const NavItems = () => {
  const menuItems = buildNavItems('admin');
  const RenderMenuItems = menuItems.map((navItem, index) => <MenuItem item={navItem} key={index} />)
  return <Menu>{RenderMenuItems}</Menu>
}

export default NavItems



const Menu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  padding: 0.3em;
  
`;