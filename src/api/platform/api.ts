import { sysHttp } from "@/utils/http/axios";
import { FormCascaderOption } from "#/formModel";
import { FormApiProps } from "@/views/platform/api/utils/types";
enum Api {
  apiCascader = "/Api/CascaderSelect"
}

export const apiTreeTable = params => {
  return sysHttp.get<any[]>({ url: `/Api/TreeTable`, params });
};

export const apiSync = () => {
  return sysHttp.get<boolean>({ url: `/Api/Sync` });
};

export const apiGet = (id: string) => {
  return sysHttp.get<FormApiProps>({ url: `/Api/Get/${id}` });
};

export const apiAdd = (data: FormApiProps) => {
  return sysHttp.post<boolean>({ url: `/Api/Add`, data });
};

/**
 * @description: Get user menu based on id
 */

export const apiCascader = () => {
  return sysHttp.get<FormCascaderOption[]>({ url: Api.apiCascader });
};
