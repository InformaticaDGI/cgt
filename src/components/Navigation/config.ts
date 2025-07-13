import { BsBarChartFill } from "react-icons/bs";
import { FaChartBar, FaHammer, FaUsersGear } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdShield } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";

const createNavItems: (logout: () => void) => NavItems = (logout: () => void) => [
        {
            id: 'dashboard',
            to: '/indicadores',
            label: 'Indicadores',
            icon: BsBarChartFill,
            roles: ['*']
        },

        {
            sectionTitle: 'Registro',
            roles: ['*']
        },
        {
            id: 'create-program',
            to: '/crear-programa',
            label: 'Crear Programa',
            icon: FaChartBar,
            roles: ['*']
        },
        {
            id: 'create-project',
            to: '/crear-proyecto',
            label: 'Crear Proyecto',
            icon: FaHammer,
            roles: ['*']
        },

        {
           sectionTitle: 'Gestión',
           roles: ['*']
        },

        {
            id: 'paysheet',
            to: '/nomina',
            label: 'Nomina',
            icon: FaUsersGear,
            roles: ['*']
        },
        {
            id: 'map',
            to: '/mapa',
            label: 'Mapa',
            icon: FaMapLocationDot,
            roles: ['*']
        },


        {
            sectionTitle: 'Cuenta',
            roles: ['*']
        },
        {
            id: 'profile',
            to: '/perfil',
            label: 'Perfil',
            icon: FaUserAlt,
            roles: ['*']
        },
        {
            id: 'security',
            to: '/seguridad',
            label: 'Seguridad',
            icon: MdShield,
            roles: ['*']
        },
        {
            id: 'exit',
            label: 'Salir',
            icon: IoIosExit,
            button: true,
            onClick: () => {
                logout()
            },
            roles: ['*']
        }
    ]
const resolveRoles = (currentRole: string, navItems: NavItems) => {

   
    const NavItemsResult = navItems.filter(navItem => {
        if(navItem.roles.includes('*')) return true;
        return navItem.roles.includes(currentRole);
    })

    return NavItemsResult
}

export const buildNavItems = (currentRole: string, logout: () => void) => {
    console.log(currentRole)
    const navItems = createNavItems(logout);
    const validNavItems = resolveRoles(currentRole, navItems);
    return validNavItems;
}

export default buildNavItems



export type NavSectionTitleProps = {
    sectionTitle: string,
    roles: string[]
}

// Base type for navigation items
export type NavLinkProps = {
    id: string;
    to: string;
    label: string;
    icon: React.ElementType;
    button?: never;
    onClick?: never;
    roles: string[]
}

export type NavButtonProps = {
    id: string;
    label: string;
    icon: React.ElementType;
    button: true;
    onClick: () => void;
    roles: string[]
}

export type NavGroupProps = {
    id: string;
    to: string;
    label: string;
    icon: React.ElementType;
    roles: string[]
    button?: never;
    onClick?: never;
    children?: (NavGroupProps)[]
}

export type NavItems = (NavLinkProps | NavGroupProps | NavSectionTitleProps | NavButtonProps)[]
