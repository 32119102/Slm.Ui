import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { hasCNChars } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
  name: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
  code: [
    {
      required: true,

      trigger: "blur",
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("租户编码不能为空"));
        } else if (hasCNChars(value)) {
          callback(new Error("租户编码不能包含中文"));
        } else {
          callback();
        }
      }
    }
  ]
});
