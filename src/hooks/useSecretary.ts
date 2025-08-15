import { useQuery } from "@tanstack/react-query";
import { config } from "../config";
import { useAuthStorage } from "../store/auth-storage";
import axios from "axios";

const useSecretary = (props: UseSecretaryProps = {}) => {
  const { user } = useAuthStorage();
  if (!user) return [];
  const {
    role: { name },
    institution,
  } = user;

  const isAdmin = name === "Admin" || name === "Superusuario";
  const isUserSecretary = user.metadata.typeUser === "secretary";

  return useQuery({
    queryKey: ["secretaries", props.rootOnly, props.parentId],
    queryFn: () =>
      getQueryFn({
        ...props,
        isAdmin,
        isUserSecretary,
        institution: institution.toString(),
      }),
    enabled: getEnabled(props),
    initialData: [],
  });
};

type UseSecretaryProps = {
  rootOnly?: boolean;
  parentId?: string;
  isAdmin?: boolean;
  isUserSecretary?: boolean;
  institution?: string;
};

const fetchRootSecretaries = async ({
  isAdmin,
  isUserSecretary,
  institution,
}: UseSecretaryProps): Promise<SecretaryOption[]> => {
  const url = `${config.apiUrl}/secretaries/root/list`;
  const params: { code?: string; childrenCode?: string } = {};
  if (!isAdmin) {
    if (isUserSecretary) {
      params.code = institution;
    } else {
      params.childrenCode = institution;
    }
  }

  const response = await axios.get(url, {
    params: params,
  });
  return response.data.map((secretary: Secretary) => ({
    value: secretary.id,
    label: secretary.name,
  }));
};

const fetchSecretaries = async ({
  parentId,
  isAdmin,
  isUserSecretary,
  institution,
}: UseSecretaryProps): Promise<SecretaryOption[]> => {
  const url = `${config.apiUrl}/secretaries/${parentId}/hierarchy`;
  const params: { code?: string } = {};
  if (!isAdmin) {
    if (!isUserSecretary) {
      params.code = institution;
    }
  }

  const response = await axios.get(url, {
    params: params,
  });

  return response.data.children.map((secretary: Secretary) => ({
    value: secretary.id,
    label: secretary.name,
  }));
};

const getQueryFn = (props: UseSecretaryProps) => {
  if (props.rootOnly) {
    return fetchRootSecretaries({
      isAdmin: props.isAdmin ?? false,
      institution: props.institution ?? "",
      isUserSecretary: props.isUserSecretary ?? false,
    });
  } else if (props.parentId) {
    return fetchSecretaries(props);
  }
  return [];
};

const getEnabled = (props: UseSecretaryProps) => {
  if (!props.parentId && !props.rootOnly) {
    return false;
  }
  return true;
};

export type Secretary = {
  id: string;
  name: string;
  parentId: string;
  canHaveProjects: boolean;
  createdAt: string;
  updatedAt: string;
};

export type SecretaryOption = {
  value: string;
  label: string;
};

export default useSecretary;
