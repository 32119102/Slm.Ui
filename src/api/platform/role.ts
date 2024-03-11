import { FormSelectOption } from "#/formModel";
import { http } from "@/utils/http";
import { sysHttp } from "@/utils/http/axios";
import { FormRoleProps } from "@/views/system/role/utils/types";

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
