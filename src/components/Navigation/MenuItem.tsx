import type { NavGroupProps, NavLinkProps, NavSectionTitleProps } from "./config";
import NavGroup from "./NavGroup";
import NavLink from "./NavLink";
import NavSectionTitle from "./NavSectionTitle";

const MenuItem = ({ item }: { item: NavLinkProps | NavGroupProps | NavSectionTitleProps }) => {
    if('children' in item) return <NavGroup item={item} />
    if('sectionTitle' in item) return <NavSectionTitle item={item} />
    return <NavLink item={item} />
}

export default MenuItem