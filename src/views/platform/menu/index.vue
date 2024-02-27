<script setup lang="ts" name="sysMenu">
import { ref } from "vue";
import { useMenu } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { IconifyIconOnline } from "@/components/ReIcon";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";

const formRef = ref();
const tableRef = ref();
const {
  form,
  loading,
  onSearch,
  resetForm,
  columns,
  openDialog,
  dataList,
  handleDelete
} = useMenu();
</script>

<template>
  <div class="main">
    <el-card
      shadow="hover"
      class="card-search-form"
      :body-style="{ paddingBottom: '0' }"
    >
      <el-form ref="formRef" :inline="true" :model="form">
        <el-form-item label="部门名称：" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入部门名称"
            clearable
          />
        </el-form-item>

        <el-form-item label="状态：" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态" clearable>
            <el-option label="启用" :value="1" />
            <el-option label="停用" :value="0" />
          </el-select>
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
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <PureTableBar
      title="菜单列表"
      :columns="columns"
      :tableRef="tableRef?.getTableRef()"
      @refresh="onSearch"
    >
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
          ref="tableRef"
          adaptive
          :adaptiveConfig="{ offsetBottom: 32 }"
          align-whole="center"
          row-key="id"
          showOverflowTooltip
          table-layout="auto"
          default-expand-all
          :loading="loading"
          :size="size"
          :data="dataList"
          :columns="dynamicColumns"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
        >
          <template #title="{ row }">
            <IconifyIconOnline
              :icon="row.icon"
              class="inline mr-1 align-[-2px]"
            />
            <span>{{ row.title }}</span>
          </template>
          <template #type="{ row }">
            <el-tag type="warning" v-if="row.type === 0">目录</el-tag>
            <el-tag v-else-if="row.type === 1">菜单</el-tag>
            <el-tag type="info" v-else>按钮</el-tag></template
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
</template>

<style lang="scss" scoped></style>
