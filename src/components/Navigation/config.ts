import { BsBarChartFill, BsDatabaseFillAdd } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";
import { FaMapLocationDot } from "react-icons/fa6";
import { MdShield } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { IoIosExit } from "react-icons/io";

const NavItems: NavItems = [
        {
            id: 'dashboard',
            to: '/',
            label: 'Indicadores',
            icon: BsBarChartFill,
            roles: ['*']
        },
        {
            id: 'registry',
            to: '/registro',
            label: 'Registro',
            icon: BsDatabaseFillAdd,
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
            sectionTitle: 'Cuenta'
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
            to: '/salir',
            label: 'Salir',
            icon: IoIosExit,
            roles: ['*']
        }
    ]

export default NavItems


export type NavSectionTitleProps = {
    sectionTitle: string
}

export type NavLinkProps = {
    id: string;
    to: string;
    label: string;
    icon: React.ElementType;
    roles?: string[]
}

export type NavGroupProps = {
    id: string;
    to: string;
    label: string;
    icon: React.ElementType;
    roles?: string[]
    children?: (NavGroupProps | NavLinkProps)[]
}

export type NavItems = (NavLinkProps | NavGroupProps | NavSectionTitleProps)[]
