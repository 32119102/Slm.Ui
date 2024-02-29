<script setup lang="ts">
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormApiProps } from "../utils/types";
import { onMounted, ref } from "vue";
import type { FormProps } from "#/formModel";
import { apiCascader, apiGet } from "@/api/platform/api";
import Segmented from "@/components/ReSegmented";
import { httpMethodsTypeOptions } from "../utils/enums";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null
  })
});
const id = props.formInline?.id;
const modelData = ref<FormApiProps>({
  label: "",
  httpMethods: "",
  path: "",
  sort: 10,
  isEnable: true
});

const apiCascaderOption = ref([]);

onMounted(async () => {
  apiCascaderOption.value = await apiCascader();
  if (id) modelData.value = await apiGet(id);
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
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="上级接口" prop="">
          <el-cascader
            class="w-full"
            clearable
            filterable
            v-model="modelData.parentId"
            :options="apiCascaderOption"
            :props="{
              emitPath: false,
              checkStrictly: true
            }"
          >
            <template #default="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="接口名称" prop="label">
          <el-input v-model="modelData.label" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="接口描述" prop="path">
          <el-input v-model="modelData.path" clearable />
        </el-form-item>
      </re-col>

      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="接口方法" prop="httpMethods">
          <Segmented
            :options="httpMethodsTypeOptions"
            @change="
              ({ option: { value } }) => {
                modelData.httpMethods = value;
              }
            "
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="modelData.sort" :min="1" class="!w-full" />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否启用" prop="isEnable">
          <el-radio-group v-model="modelData.isEnable">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>
