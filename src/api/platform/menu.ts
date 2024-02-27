import { FormCascaderOption } from "#/formModel";
import { http } from "@/utils/http";
import { sysHttp } from "@/utils/http/axios";
import { FormMenuProps } from "@/views/platform/menu/utils/types";
enum Api {
  menuAdd = "/Menu/Add",
  menuCascader = "/Menu/CascaderSelect",
  menuTreeTable = "/Menu/TreeTable",
  menuInfo = "/Menu/Get/",
  menuLeft = "/Menu/GetLeftMenu"
}

export const menuTreeTable = params => {
  return sysHttp.get<any[]>({ url: Api.menuTreeTable, params });
};

export const menuInfo = (id: string) => {
  console.log(Api.menuInfo + id);
  return sysHttp.get<FormMenuProps>({ url: `/Menu/Get/${id}` });
};

export const menuCascader = () => {
  return sysHttp.get<FormCascaderOption[]>({ url: Api.menuCascader });
};

export const mentLeft = () => {
  return sysHttp.get<any[]>({ url: Api.menuLeft });
};

export const menuAdd = (data: FormMenuProps) => {
  return sysHttp.post<boolean>({ url: Api.menuAdd, data });
};
