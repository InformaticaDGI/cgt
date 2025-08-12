
import authRoles from "./authRoles.ts";
import { MdAddCircle, MdBarChart, MdDashboard, MdFolder, MdHome, MdLogout, MdPeople, MdSettings, MdTimeline, MdViewList, MdWork } from "react-icons/md";
import { FaCalendarCheck } from "react-icons/fa6";

const createNavItems = (logout: () => void): NavItems => [
  {
    id: "home",
    to: "/mapa",
    label: "Inicio",
    icon: MdHome,
    roles: authRoles.Public,
  },
  {
    sectionTitle: "Indicadores",
    roles: authRoles.Public,
    icon: MdDashboard,
  },
  {
    id: "indicators-programs",
    to: "/indicadores",
    label: "Programas",
    icon: MdBarChart,
    roles: authRoles.Public,
  },
  {
    id: "indicatorsACA",
    to: "/indicadoresACA",
    label: "ACA",
    icon: MdBarChart,
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
    sectionTitle: "ACA",
    roles: authRoles.Usuario,
    icon: FaCalendarCheck,
  },
  {
    id: "create-aca",
    to: "/aca/crear",
    label: "Registrar",
    icon: MdAddCircle,
    roles: authRoles.Usuario,
  },
  {
    id: "aca-projects",
    to: "/aca",
    label: "Ver",
    icon: MdViewList,
    roles: authRoles.Usuario,
  },
  {
    sectionTitle: "Programas",
    roles: authRoles.Usuario,
    icon: MdWork,
  },
  {
    id: "create-program",
    to: "/crear-programa",
    label: "Registrar",
    icon: MdAddCircle,
    roles: authRoles.Usuario,
  },

  {
    sectionTitle: "Proyectos",
    roles: authRoles.Public,
    icon: MdFolder,
  },

  {
    id: "projects",
    to: "/proyectos",
    label: "Ver",
    icon: MdViewList,
    roles: authRoles.Public,
  },
  {
    id: "create-project",
    to: "/crear-proyecto",
    label: "Registrar",
    icon: MdAddCircle,
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
    icon: MdPeople,
  },
  {
    id: "list-contacts",
    to: "/contactos",
    label: "Ver",
    icon: MdViewList,
    roles: authRoles.Public,
  },
  {
    id: "create-contact",
    to: "/contactos/crear",
    label: "Registrar",
    icon: MdAddCircle,
    roles: authRoles.Public,
  },

  {
    sectionTitle: "Opciones",
    roles: authRoles.Public,
    icon: MdSettings,
  },
  {
    id: "logs",
    to: "/registro-actividad",
    label: "Registro de Actividad",
    icon: MdTimeline,
    roles: authRoles.Admin,
  },

  {
    id: "exit",
    label: "Salir",
    icon: MdLogout,
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
