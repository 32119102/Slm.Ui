import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { hasCNChars } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
  type: [{ required: true, trigger: "blur" }],
  title: [{ required: true, message: "菜单名称不能为空", trigger: "blur" }],
  name: [
    {
      required: true,

      trigger: "blur",
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("路由名称不能为空"));
        } else if (hasCNChars(value)) {
          callback(new Error("路由名称不能包含中文"));
        } else {
          callback();
        }
      }
    }
  ],
  path: [{ required: true, message: "路由不能为空", trigger: "blur" }],
  component: [{ required: true, message: "组件不能为空", trigger: "blur" }]
});
