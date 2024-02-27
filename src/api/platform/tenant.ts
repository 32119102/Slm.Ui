import { http } from "@/utils/http";
import { sysHttp } from "@/utils/http/axios";
import { FormTenantProps } from "@/views/platform/tenant/utils/types";
enum Api {
  tenantAdd = "/Tenant/Add",
  tenantPage = "/Tenant/GetPage"
}

export const tenantPage = (data: object) => {
  return sysHttp.get<any>({ url: Api.tenantPage, data });
};

export const tenantAdd = (data: FormTenantProps) => {
  return sysHttp.post<string>({ url: Api.tenantAdd, data });
};

export const tenantGet = (id: string) => {
  return sysHttp.get<FormTenantProps>({ url: `/Tenant/Get/${id}` });
};

export const tenantDel = (id: string) => {
  return sysHttp.delete<boolean>({ url: `/Tenant/Del/${id}` });
};

export const tenantUpdate = (id: string, data: FormTenantProps) => {
  return sysHttp.put<boolean>({ url: `/Tenant/Update/${id}`, data });
};

export const tenantIsEnable = (data: object) => {
  return sysHttp.post<string>({ url: "/Tenant/IsEnable", data });
};
