import { FormCascaderOption } from "#/formModel";
import { http } from "@/utils/http";
import { sysHttp } from "@/utils/http/axios";

export const orgTreeTable = params => {
  return sysHttp.get<any[]>({ url: "/Org/TreeTable", params });
};

export const orgGet = (id: string) => {
  return sysHttp.get<object>({ url: `/Org/Get/${id}` });
};

export const orgCascader = () => {
  return sysHttp.get<FormCascaderOption[]>({ url: "/Org/CascaderSelect" });
};

export const orgAdd = (data: object) => {
  return sysHttp.post<boolean>({ url: "/Org/Add", data });
};
