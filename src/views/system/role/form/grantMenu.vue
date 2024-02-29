<script setup lang="ts">
import ReCol from "@/components/ReCol";
import { onMounted, ref } from "vue";
import { FormSelectOption } from "#/formModel";
import type { FormProps } from "#/formModel";
import { menuTreeTable } from "@/api/platform/menu";

import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Menu from "@iconify-icons/ep/menu";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null
  })
});
const id = props.formInline?.id;

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

const newFormInline = ref(props.formInline);
const menuData = ref([]);

onMounted(async () => {
  menuData.value = await menuTreeTable({});
});

const treeRef = ref();
function getCheckedKeys() {
  return treeRef?.value.getCheckedKeys();
}
defineExpose({ getCheckedKeys });
</script>

<template>
  <el-form :model="newFormInline" label-position="top">
    <el-row :gutter="30">
      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="">
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
