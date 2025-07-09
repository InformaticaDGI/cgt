import type { NavGroupProps } from "./config"

const NavGroup = ({ item }: { item: NavGroupProps }) => {
    return <p>{item.label}</p>
}

export default NavGroup