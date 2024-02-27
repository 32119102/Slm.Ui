import { EnumSearch, FormSelectOption } from "#/formModel";
import { http } from "@/utils/http";
import { sysHttp } from "@/utils/http/axios";

export const enumSelect = (data: EnumSearch) => {
  return sysHttp.get<FormSelectOption[]>({
    url: "/Common/EnumOptions",
    data: data
  });
};
