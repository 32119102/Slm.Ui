import { sysHttp } from '@/utils/http/axios';
import { FormCascaderOption} from "#/formModel";
enum Api {
  apiCascader = '/Api/CascaderSelect'
}
/**
 * @description: Get user menu based on id
 */

export const apiCascader = () => {
  return sysHttp.get<FormCascaderOption[]>({ url: Api.apiCascader });
};
