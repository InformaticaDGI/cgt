import { BsBarChartFill } from "react-icons/bs";
import {
  FaFolderOpen,
  FaFolderPlus,
  /*FaUsersGear, */ FaUserPlus,
  FaUsers,
} from "react-icons/fa6";
import { IoIosExit } from "react-icons/io";
import authRoles from "./authRoles.ts";
import { FaClipboardList, FaCogs, FaHome } from "react-icons/fa";
import { BsFillClipboard2PlusFill } from "react-icons/bs";
import { TbActivity } from "react-icons/tb";

const createNavItems = (logout: () => void): NavItems => [
  {
    id: "home",
    to: "/mapa",
    label: "Inicio",
    icon: FaHome,
    roles: authRoles.Public,
  },
  {
    sectionTitle: "Indicadores",
    roles: authRoles.Public,
    icon: BsBarChartFill,
  },
  {
    id: "indicators-programs",
    to: "/indicadores",
    label: "Programas",
    icon: BsBarChartFill,
    roles: authRoles.Public,
  },
  {
    id: "indicatorsACA",
    to: "/indicadoresACA",
    label: "ACA",
    icon: BsBarChartFill,
    roles: authRoles.Public,
  },
  // {
  //     id: 'map',
  //     to: '/mapa',
  //     label: 'Inicio',
  //     icon: FaHome,
  //     roles: authRoles.Public
  // },
  // {
  //     id: 'dashboard',
  //     to: '/indicadores',
  //     label: 'Indicadores',
  //     icon: BsBarChartFill,
  //     roles: authRoles.Public
  // },

  {
    sectionTitle: "Programas",
    roles: authRoles.Usuario,
    icon: FaClipboardList,
  },
  {
    id: "create-program",
    to: "/crear-programa",
    label: "Crear Programa",
    icon: BsFillClipboard2PlusFill,
    roles: authRoles.Usuario,
  },

  {
    sectionTitle: "Proyectos",
    roles: authRoles.Public,
    icon: FaFolderOpen,
  },

  {
    id: "projects",
    to: "/proyectos",
    label: "Ver Proyectos",
    icon: FaFolderOpen,
    roles: authRoles.Public,
  },
  {
    id: "create-project",
    to: "/crear-proyecto",
    label: "Crear Proyecto",
    icon: FaFolderPlus,
    roles: authRoles.Usuario,
  },

  // {
  //     id: 'paysheet',
  //     to: '/nomina',
  //     label: 'Nomina',
  //     icon: FaUsersGear,
  //     roles: authRoles.Public
  // },

  {
    sectionTitle: "Contactos",
    roles: authRoles.Public,
    icon: FaUsers,
  },
  {
    id: "list-contacts",
    to: "/contactos",
    label: "Ver Contactos",
    icon: FaUsers,
    roles: authRoles.Public,
  },
  {
    id: "create-contact",
    to: "/contactos/crear",
    label: "Crear Contacto",
    icon: FaUserPlus,
    roles: authRoles.Public,
  },

  {
    sectionTitle: "Opciones",
    roles: authRoles.Public,
    icon: FaCogs,
  },
  {
    id: "logs",
    to: "/registro-actividad",
    label: "Registro de Actividad",
    icon: TbActivity,
    roles: authRoles.Admin,
  },

  {
    id: "exit",
    label: "Salir",
    icon: IoIosExit,
    button: true,
    onClick: () => {
      logout();
    },
    roles: authRoles.Public,
  },
];
const resolveRoles = (currentRole: string, navItems: NavItems) => {
  const NavItemsResult = navItems.filter((navItem) => {
    if (navItem.roles.includes("*")) return true;
    return navItem.roles.includes(currentRole);
  });

  return NavItemsResult;
};

export const buildNavItems = (currentRole: string, logout: () => void) => {
  const navItems = createNavItems(logout);
  const validNavItems = resolveRoles(currentRole, navItems);
  return validNavItems;
};

export default buildNavItems;

export type NavSectionTitleProps = {
  sectionTitle: string;
  roles: string[];
  icon: React.ElementType | null;
  to?: string;
};

// Base type for navigation items
export type NavLinkProps = {
  id: string;
  to: string;
  label: string;
  icon: React.ElementType | null;
  button?: never;
  onClick?: never;
  roles: string[];
};

export type NavButtonProps = {
  id: string;
  label: string;
  icon: React.ElementType | null;
  button: true;
  onClick: () => void;
  roles: string[];
};

export type NavGroupProps = {
  id: string;
  to: string;
  label: string;
  icon: React.ElementType | null;
  roles: string[];
  button?: never;
  onClick?: never;
  children?: NavGroupProps[];
};

export type NavItems = (
  | NavLinkProps
  | NavGroupProps
  | NavSectionTitleProps
  | NavButtonProps
)[];
