import { FormSelectOption } from "#/formModel";
import { http } from "@/utils/http";
import { sysHttp } from "@/utils/http/axios";
import {
  FormRoleProps,
  GrantDataScopePros
} from "@/views/system/role/utils/types";
import { resultType } from "../../utils/http/types";

export const rolePage = (data: object) => {
  return sysHttp.get<any>({ url: `/Role/GetPage`, data });
};

export const roleAdd = (data: FormRoleProps) => {
  return sysHttp.post<string>({ url: `/Role/Add`, data });
};

export const roleGet = (id: string) => {
  return sysHttp.get<FormRoleProps>({
    url: `/Role/Get/${id}`
  });
};

export const roleDel = (id: string) => {
  return sysHttp.delete<boolean>({ url: `/Role/Del/${id}` });
};

export const roleUpdate = (id: string, data: FormRoleProps) => {
  return sysHttp.put<boolean>({ url: `/Role/Update/${id}`, data });
};

export const roleSelect = () => {
  return sysHttp.get<FormSelectOption[]>({ url: `/Role/GetSelect` });
};

export const roleGetGrantRoleApi = (id: string) => {
  return sysHttp.get<string[]>({
    url: `/Role/GetGrantRoleApi/${id}`
  });
};

export const roleGrantRoleApi = (id: string, data: object) => {
  return sysHttp.post<string>({ url: `/Role/GrantRoleApi/${id}`, data });
};

export const roleGetGrantDataScope = (id: string) => {
  return sysHttp.get<GrantDataScopePros>({
    url: `/Role/GetGrantDataScope/${id}`
  });
};

export const roleGrantDataScope = (id: string, data: GrantDataScopePros) => {
  return sysHttp.post<string>({ url: `/Role/GrantDataScope/${id}`, data });
};
