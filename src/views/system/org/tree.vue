<script setup lang="ts">
import { FormCascaderOption } from "#/formModel";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import moreFilled from "@iconify-icons/ep/more-filled";
import { ref, watch, watchEffect } from "vue";
import type { ElTree } from "element-plus";

// const defaultProps = {
//   children: "children",
//   label: "label"
// };

const props = defineProps({
  treeLoading: Boolean,
  treeData: Array,
  checkedKeys: [],
  isShowCheck: Boolean
});

// const props = withDefaults(defineProps(), {
//   treeLoading: false,
//   treeData: [],
//   checkedKeys: [16179761868229]
// });

watch(
  () => props.treeLoading,
  newValue => {
    console.log(newValue, 9888);
  }
);

const treeRef = ref<InstanceType<typeof ElTree>>();

const filterNode = (value: string, data: FormCascaderOption) => {
  if (!value) return true;
  return data.label.includes(value);
};

const handleCommand = async (command: string | number | object) => {
  if ("expandAll" == command) {
    for (let i = 0; i < treeRef.value!.store._getAllNodes().length; i++) {
      treeRef.value!.store._getAllNodes()[i].expanded = true;
    }
  } else if ("collapseAll" == command) {
    for (let i = 0; i < treeRef.value!.store._getAllNodes().length; i++) {
      treeRef.value!.store._getAllNodes()[i].expanded = false;
    }
  } else if ("refresh" == command) {
    emits("tree-load");
  } else if ("rootNode" == command) {
    emits("tree-select", { id: 0 });
  }
};

// 与父组件的交互逻辑
const emits = defineEmits(["tree-select", "tree-load"]);
const nodeClick = (node: any) => {
  console.log(node, 1111);
  emits("tree-select", { id: node.value });
};

// 获取已经选择
const getCheckedKeys = () => {
  return treeRef.value!.getCheckedKeys();
};

const setCheckedKeys = (orgData: []) => {
  treeRef.value!.setCheckedKeys(orgData);
};

// 导出对象
defineExpose({ getCheckedKeys, setCheckedKeys });
</script>

<template>
  <el-card
    shadow="hover"
    :body-style="{ paddingBottom: '0' }"
    v-loading="props.treeLoading"
  >
    <template #header>
      <div class="card-header">
        <div class="flex">
          <div class="flex-1">
            <el-input placeholder="机构名称" />
          </div>
          <div>
            <el-dropdown @command="handleCommand">
              <el-button
                style="margin-left: 8px; width: 34px"
                :icon="useRenderIcon(moreFilled)"
              >
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="expandAll"
                    >全部展开</el-dropdown-item
                  >
                  <el-dropdown-item command="collapseAll"
                    >全部折叠</el-dropdown-item
                  >
                  <el-dropdown-item command="rootNode">根节点</el-dropdown-item>
                  <el-dropdown-item command="refresh">刷新</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </template>
    <el-tree
      class="mb-11"
      ref="treeRef"
      :data="props.treeData"
      node-key="value"
      size="small"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      @node-click="nodeClick"
      :show-checkbox="isShowCheck"
      highlight-current
      check-strictly
      :default-checked-keys="props.checkedKeys"
    >
      <template #default="{ node }">
        <IconifyIconOnline icon="ep:school" class="inline align-[-2px]" />
        {{ node.label }}
      </template>
    </el-tree>
  </el-card>
</template>

<style lang="scss" scoped></style>
