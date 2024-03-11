import { FormCascaderOption } from "#/formModel";
import { http } from "@/utils/http";
import { sysHttp } from "@/utils/http/axios";
import { FormOrgProps } from "@/views/system/org/utils/types";

export const orgTreeTable = params => {
  return sysHttp.get<any[]>({ url: "/Org/TreeTable", params });
};

export const orgGet = (id: string) => {
  return sysHttp.get<FormOrgProps>({ url: `/Org/Get/${id}` });
};

export const orgCascader = () => {
  return sysHttp.get<FormCascaderOption[]>({ url: "/Org/CascaderSelect" });
};

export const orgAdd = (data: object) => {
  return sysHttp.post<boolean>({ url: "/Org/Add", data });
};
