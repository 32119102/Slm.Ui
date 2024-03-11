<script setup lang="ts">
import ReCol from "@/components/ReCol";
import { onMounted, ref } from "vue";
import { enumSelect } from "@/api/platform/common";
import { DataScopeProps, GrantDataScopePros } from "../utils/types";
import { FormSelectOption } from "#/formModel";
import OrgTree from "@/views/system/org/tree.vue";
import { useOrg } from "../../org/utils/hook";
import type { FormProps } from "#/formModel";
import { roleGetGrantDataScope } from "@/api/platform/role";
import { nextTick } from "process";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null
  })
});

const newFormInline = ref(props.formInline);

const modelData = ref<GrantDataScopePros>({
  dataScope: 4
});

const dataScopeOptions = ref([]);
const { treeData, treeLoading, onTreeLoad } = useOrg();

const treeRef = ref();
onMounted(async () => {
  dataScopeOptions.value = await enumSelect({
    moduleCode: "sys",
    enumName: "DataScopeEnum"
  });

  modelData.value = await roleGetGrantDataScope(newFormInline.value.id);
  nextTick(() => {
    if (modelData.value.dataScope == 5) {
      console.log(treeRef?.value);
      treeRef?.value.setCheckedKeys(modelData.value.orgIds);
    }
  });
});

function getModelData() {
  modelData.value.orgIds = treeRef?.value.getCheckedKeys();
  return modelData.value;
}

defineExpose({ getModelData });
</script>

<template>
  <el-form :model="newFormInline" label-position="top">
    <el-row :gutter="30">
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="角色名称:" prop="name">
          <el-select
            v-model="modelData.dataScope"
            placeholder="请选择"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in dataScopeOptions"
              :key="index"
              :value="item.value"
              :label="item.label"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item>
      </re-col>

      <!-- 机构选择 -->

      <el-col :value="24" :xs="24" :sm="24" v-show="modelData.dataScope === 5">
        <el-form-item label="机构列表：">
          <OrgTree
            ref="treeRef"
            class="w-full"
            :treeData="treeData"
            :treeLoading="treeLoading"
            @tree-load="onTreeLoad"
            :isShowCheck="true"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>
