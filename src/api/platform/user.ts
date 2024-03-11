import { http } from "@/utils/http";
import { sysHttp } from "@/utils/http/axios";

export const userPage = (data: object) => {
  return sysHttp.get<any>({ url: `/User/GetPage`, data });
};

export const userAdd = (data: any) => {
  return sysHttp.post<string>({ url: `/User/Add`, data });
};

export const userGet = (id: string) => {
  return sysHttp.get<any>({ url: `/User/Get/${id}` });
};

export const userDel = (id: string) => {
  return sysHttp.delete<boolean>({ url: `/User/Del/${id}` });
};

export const userUpdate = (id: string, data: any) => {
  return sysHttp.put<boolean>({ url: `/User/Update/${id}`, data });
};

export const userIsEnable = (data: object) => {
  return sysHttp.post<string>({ url: "/User/IsEnable", data });
};
