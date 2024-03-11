<script setup lang="ts">
import ReCol from "@/components/ReCol";
import type { FormProps } from "#/formModel";
import { onMounted, ref } from "vue";
import { formRules } from "../utils/rule";
import { FormRoleProps } from "../utils/types";
import { roleGet } from "@/api/platform/role";
import Menu from "@iconify-icons/ep/menu";
import { menuTreeTable } from "@/api/platform/menu";

import { useRenderIcon } from "@/components/ReIcon/src/hooks";

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
const menuData = ref([]);

onMounted(async () => {
  console.log("加载", id);
  menuData.value = await menuTreeTable({});
  if (id) {
    modelData.value = await roleGet(id);
    treeRef?.value.setCheckedKeys(modelData.value.menuIds);
  }
});

const ruleFormRef = ref();
function getRef() {
  return ruleFormRef.value;
}
function getModelData() {
  modelData.value.menuIds = treeRef?.value.getCheckedKeys();
  return modelData.value;
}

// 叶子节点同行显示样式
const treeNodeClass = (node: any) => {
  let addClass = true; // 添加叶子节点同行显示样式
  for (const key in node.children) {
    // 如果存在子节点非叶子节点，不添加样式
    if (node.children[key].children?.length ?? 0 > 0) {
      addClass = false;
      break;
    }
  }
  return addClass ? "penultimate-node" : "";
};

const treeRef = ref();
function getCheckedKeys() {
  return treeRef?.value.getCheckedKeys();
}
defineExpose({ getRef, getModelData, getCheckedKeys });
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
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="菜单权限" name="menuIds">
          <el-tree
            class="w-full"
            ref="treeRef"
            :data="menuData"
            node-key="id"
            show-checkbox
            :props="{
              children: 'children',
              label: 'title',
              class: treeNodeClass
            }"
            :icon="useRenderIcon(Menu)"
            highlight-current
            default-expand-all
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
:deep(.penultimate-node) {
  .el-tree-node__children {
    padding-left: 40px;
    white-space: pre-wrap;
    line-height: 100%;

    .el-tree-node {
      display: inline-block;
    }

    .el-tree-node__content {
      padding-left: 5px !important;
      padding-right: 5px;
    }
  }
}
</style>
