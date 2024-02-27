<script setup lang="ts">
import ReCol from "@/components/ReCol";
import type { FormProps } from "#/formModel";
import { onMounted, ref } from "vue";
import { formRules } from "../utils/rule";
import { FormRoleProps } from "../utils/types";
import { roleGet } from "@/api/platform/role";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null
  })
});
const id = props.formInline?.id;
const modelData = ref<FormRoleProps>({
  name: "",
  code: "",
  isEnable: true,
  remark: "",
  sort: 100
});

onMounted(async () => {
  console.log("加载", id);

  if (id) modelData.value = await roleGet(id);
});

const ruleFormRef = ref();
function getRef() {
  return ruleFormRef.value;
}
function getModelData() {
  return modelData.value;
}
defineExpose({ getRef, getModelData });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="modelData"
    :rules="formRules"
    label-width="140px"
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="modelData.name" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="modelData.code" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="modelData.sort" :min="1" class="!w-full" />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="状态" prop="isEnable">
          <el-radio-group v-model="modelData.isEnable">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="备注" name="remark">
          <el-input v-model="modelData.remark" :rows="2" type="textarea" />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>
