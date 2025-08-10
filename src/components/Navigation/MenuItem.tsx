
import type { NavButtonProps, NavGroupProps, NavLinkProps, NavSectionTitleProps } from "./config";
import NavButton from "./NavButton";
import NavGroup from "./NavGroup";
import NavLink from "./NavLink";
import NavSectionTitle from "./NavSectionTitle";

const MenuItem = ({ item }: { item: NavLinkProps | NavGroupProps | NavSectionTitleProps | NavButtonProps }) => {
    if('children' in item) return <NavGroup item={item} />
    if('sectionTitle' in item) return <NavSectionTitle item={item} />
    if('button' in item && item.button) return <NavButton item={item} />
    return <NavLink item={item} />
}

export default MenuItem