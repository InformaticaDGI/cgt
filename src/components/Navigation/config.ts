import { BsBarChartFill } from "react-icons/bs";
import { FaChartBar, FaHammer, /*FaUsersGear, */ FaList } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdShield } from "react-icons/md";
import { IoIosExit } from "react-icons/io";
import authRoles from "./authRoles.ts"


const createNavItems: (logout: () => void) => NavItems = (logout: () => void) => [
        {
            id: 'map',
            to: '/mapa',
            label: 'Mapa',
            icon: FaMapLocationDot,
            roles: authRoles.Public
        },
        {
            id: 'dashboard',
            to: '/indicadores',
            label: 'Indicadores',
            icon: BsBarChartFill,
            roles: authRoles.Public
        },

        {
            sectionTitle: 'Registro',
            roles: authRoles.Usuario
        },
        {
            id: 'create-program',
            to: '/crear-programa',
            label: 'Crear Programa',
            icon: FaChartBar,
            roles: authRoles.Usuario
        },
        {
            id: 'create-project',
            to: '/crear-proyecto',
            label: 'Crear Proyecto',
            icon: FaHammer,
            roles: authRoles.Usuario
        },

        {
           sectionTitle: 'Gestión',
           roles: authRoles.Public
        },

                {
            id: 'projects',
            to: '/proyectos',
            label: 'Proyectos',
            icon: FaList,
            roles: authRoles.Public
        },

        // {
        //     id: 'paysheet',
        //     to: '/nomina',
        //     label: 'Nomina',
        //     icon: FaUsersGear,
        //     roles: authRoles.Public
        // },



        {
            sectionTitle: 'Cuenta',
            roles: authRoles.Public
        },
        {
            id: 'security',
            to: '/seguridad',
            label: 'Seguridad',
            icon: MdShield,
            roles: authRoles.Admin
        },
        {
            id: 'exit',
            label: 'Salir',
            icon: IoIosExit,
            button: true,
            onClick: () => {
                logout()
            },
            roles: authRoles.Public
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
