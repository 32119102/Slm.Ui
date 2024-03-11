import { reactive } from "vue";
import type { FormRules } from "element-plus";
import { hasCNChars } from "@pureadmin/utils";

/** 自定义表单规则校验 */
export const formRules = reactive<FormRules>({
  name: [{ required: true, message: "机构名称不能为空", trigger: "blur" }],
  code: [{ required: true, message: "机构编码不能为空", trigger: "blur" }]
});
