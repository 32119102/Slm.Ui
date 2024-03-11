<script setup lang="ts" name="sysUser">
import { ref } from "vue";
import tree from "./tree.vue";
import { useUser } from "./utils/hooks";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";

const formRef = ref();
const {
  form,
  loading,
  onSearch,
  resetForm,
  columns,
  openDialog,
  dataList,
  handleDelete,
  treeData,
  treeLoading,
  onTreeSelect,
  onTreeLoad,
  pagination,
  handleSizeChange,
  handleCurrentChange
} = useUser();
</script>

<template>
  <div class="flex justify-between">
    <tree
      ref="treeRef"
      class="min-w-[200px] mr-2"
      :treeData="treeData"
      :treeLoading="treeLoading"
      @tree-select="onTreeSelect"
      @tree-load="onTreeLoad"
    />
    <div class="w-[calc(100%-200px)]">
      <el-card
        shadow="hover"
        class="card-search-form"
        :body-style="{ paddingBottom: '0' }"
      >
        <el-form ref="formRef" :inline="true" :model="form">
          <el-form-item label="账号：" prop="name">
            <el-input v-model="form.name" placeholder="请输入账号" clearable />
          </el-form-item>
          <el-form-item label="手机号：" prop="name">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :icon="useRenderIcon('search')"
              :loading="loading"
              @click="onSearch"
            >
              搜索
            </el-button>
            <el-button
              :icon="useRenderIcon('refresh')"
              @click="resetForm(formRef)"
            >
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <PureTableBar title="菜单列表" :columns="columns" @refresh="onSearch">
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <pure-table
            adaptive
            align-whole="center"
            showOverflowTooltip
            table-layout="auto"
            :loading="loading"
            :size="size"
            :data="dataList"
            :columns="dynamicColumns"
            :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
            :pagination="pagination"
            :paginationSmall="size === 'small' ? true : false"
            @page-size-change="handleSizeChange"
            @page-current-change="handleCurrentChange"
          >
            <template #operation="{ row }">
              <el-button
                class="reset-margin"
                link
                type="primary"
                v-if="row.type != 2"
                :size="size"
                :icon="useRenderIcon(EditPen)"
                @click="openDialog('修改', row.id)"
              >
                编辑
              </el-button>

              <el-popconfirm
                v-if="row.type != 2"
                :title="`确认要删除吗?`"
                @confirm="handleDelete(row)"
              >
                <template #reference>
                  <el-button
                    class="reset-margin"
                    link
                    type="danger"
                    :size="size"
                    :icon="useRenderIcon(Delete)"
                  >
                    删除
                  </el-button>
                </template>
              </el-popconfirm>
            </template>
          </pure-table>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
