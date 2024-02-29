import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
  label: [{ required: true, message: "接口名称不能为空", trigger: "blur" }],

  path: [{ required: true, message: "接口地址不能为空", trigger: "blur" }]
});
