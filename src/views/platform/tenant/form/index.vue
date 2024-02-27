<script setup lang="ts">
import ReCol from "@/components/ReCol";
import type { FormProps } from "#/formModel";
import { onMounted, ref } from "vue";
import { formRules } from "../utils/rule";
import { FormTenantProps } from "../utils/types";
import { tenantGet } from "@/api/platform/tenant";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null
  })
});
const id = props.formInline?.id;
const modelData = ref<FormTenantProps>({
  name: "",
  code: "",
  tenantType: 0,
  dbType: 0,
  connection: "",
  configId: "",
  isEnable: true,
  remark: ""
});

const dbTypeSel = ref([
  {
    label: "MySql",
    value: 0
  },
  {
    label: "SqlServer",
    value: 1
  },
  {
    label: "Sqlite",
    value: 2
  },
  {
    label: "Oracle",
    value: 3
  },
  {
    label: "PostgreSQL",
    value: 4
  },
  {
    label: "Dm",
    value: 5
  },
  {
    label: "Kdbndp",
    value: 6
  },
  {
    label: "Oscar",
    value: 7
  },
  {
    label: "MySqlConnector",
    value: 8
  },
  {
    label: "Access",
    value: 9
  }
]);

onMounted(async () => {
  console.log("加载", id);

  if (id) modelData.value = await tenantGet(id);
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
        <el-form-item label="租户名称" prop="name">
          <el-input v-model="modelData.name" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="租户编码" prop="code">
          <el-input v-model="modelData.code" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="租户类型" prop="tenantType">
          <el-radio-group v-model="modelData.tenantType">
            <!-- 配置租户配置Id -->
            <el-radio :label="0">ID隔离</el-radio>
            <!-- 选择数据库类型，链接字符串 -->
            <el-radio :label="1">库隔离</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="租户配置Id" prop="configId">
          <el-input v-model="modelData.configId" clearable />
        </el-form-item>
      </re-col>

      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="数据库类型" prop="dbType">
          <el-select v-model="modelData.dbType" clearable>
            <el-option
              v-for="item in dbTypeSel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="链接字符串" name="connection">
          <el-input v-model="modelData.connection" :rows="2" type="textarea" />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>
