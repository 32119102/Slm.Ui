<script setup lang="ts" name="sysRole">
import { ref } from "vue";
import { useRole } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { IconifyIconOnline } from "@/components/ReIcon";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";
import More from "@iconify-icons/ep/more-filled";
import Role from "@iconify-icons/ri/admin-line";

const formRef = ref();
const tableRef = ref();
const {
  form,
  loading,
  onSearch,
  resetForm,
  columns,
  dataList,
  pagination,
  openDialog,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleDataScope,
  handleDeleteDr,
  handleGrantMenu,
  handleGrantApi
} = useRole();
</script>

<template>
  <div class="main">
    <el-card
      shadow="hover"
      class="card-search-form"
      :body-style="{ paddingBottom: '0' }"
    >
      <el-form ref="formRef" :inline="true" :model="form">
        <el-form-item label="角色名称：" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入角色名称"
            clearable
          />
        </el-form-item>

        <el-form-item label="角色编码：" prop="code">
          <el-input
            v-model="form.code"
            placeholder="请输入角色编码"
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
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <PureTableBar title="租户管理" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog()"
        >
          新增角色
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          align-whole="center"
          showOverflowTooltip
          table-layout="auto"
          :loading="loading"
          :size="size"
          adaptive
          :data="dataList"
          :columns="dynamicColumns"
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
          @page-size-change="handleSizeChange"
          @page-current-change="handleCurrentChange"
        >
          <template #info="{ row }">
            <el-popover placement="bottom" width="280" trigger="hover">
              <template #reference>
                <el-text type="primary">
                  <IconifyIconOnline
                    icon="ep:info-filled"
                    class="inline align-[-2px]"
                  />
                  详情
                </el-text>
              </template>
              <el-descriptions direction="vertical" :column="2" border>
                <el-descriptions-item width="140">
                  <template #label>
                    <el-text>
                      <IconifyIconOnline
                        icon="ep:user-filled"
                        class="inline align-[-2px]"
                      />创建者
                    </el-text>
                  </template>
                  <el-tag>{{ row.creator ?? "无" }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <el-text>
                      <IconifyIconOnline
                        icon="ep:calendar"
                        class="inline align-[-2px]"
                      />创建时间
                    </el-text>
                  </template>
                  <el-tag>{{ row.created ?? "无" }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <el-text>
                      <IconifyIconOnline
                        icon="ep:user-filled"
                        class="inline align-[-2px]"
                      />修改者
                    </el-text>
                  </template>
                  <el-tag>{{ row.lastmodifier ?? "无" }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <el-text>
                      <IconifyIconOnline
                        icon="ep:calendar"
                        class="inline align-[-2px]"
                      />修改时间
                    </el-text>
                  </template>
                  <el-tag>{{ row.lastmodified ?? "无" }}</el-tag>
                </el-descriptions-item>
                <el-descriptions-item>
                  <template #label>
                    <el-text>
                      <IconifyIconOnline
                        icon="ep:tickets"
                        class="inline align-[-2px]"
                      />备注
                    </el-text>
                  </template>
                  {{ row.remark }}
                </el-descriptions-item>
              </el-descriptions>
            </el-popover>
          </template>

          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              type="primary"
              :size="size"
              link
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('修改', row.id)"
              >修改</el-button
            >
            <el-popconfirm
              :title="`是否确认删除这条数据吗`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  type="danger"
                  link
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                  >删除</el-button
                >
              </template>
            </el-popconfirm>
            <el-dropdown class="ml-3">
              <el-button
                type="primary"
                :size="size"
                link
                :icon="useRenderIcon(More)"
              />
              <!-- <span class="el-dropdown-link"> </span> -->
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    :icon="useRenderIcon(Role)"
                    @click="handleGrantMenu(row.id)"
                  >
                    授权菜单
                  </el-dropdown-item>
                  <el-dropdown-item
                    :icon="useRenderIcon(Role)"
                    @click="handleGrantApi(row.id)"
                  >
                    授权接口
                  </el-dropdown-item>
                  <el-dropdown-item
                    :icon="useRenderIcon(Role)"
                    @click="handleDataScope(row.id)"
                  >
                    数据范围
                  </el-dropdown-item>
                  <el-dropdown-item
                    :icon="useRenderIcon(Delete)"
                    @click="handleDeleteDr(row)"
                  >
                    删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
