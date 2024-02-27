<script setup lang="ts">
import ReCol from "@/components/ReCol";
import { formRules } from "../utils/rule";
import { FormButtonProps, FormMenuProps } from "../utils/types";
import { onMounted, ref } from "vue";
import type { FormProps } from "#/formModel";
import { menuCascader, menuInfo } from "@/api/platform/menu";
import { apiCascader } from "@/api/platform/api";
import { IconSelect } from "@/components/ReIcon";
import { VxeTableInstance, VxeTablePropTypes } from "vxe-table";
import { getPathByKey } from "@/utils/tree";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ep/delete";
import { hasCNChars } from "@pureadmin/utils";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null
  })
});
const id = props.formInline?.id;
const modelData = ref<FormMenuProps>({
  title: "",
  path: "",
  name: "",
  component: "",
  type: 0,
  redirect: "",
  icon: "",
  sort: 0,
  isHide: false,
  isFrame: false,
  frameSrc: "",
  isKeepAlive: false,
  isAffix: false,
  isEnable: true,
  remark: "",
  buttonProps: []
});

const menuCascaderOptions = ref([]);

const apiCascaderOption = ref([]);

onMounted(async () => {
  console.log("加载", id);
  menuCascaderOptions.value = await menuCascader();
  apiCascaderOption.value = await apiCascader();
  if (id) modelData.value = await menuInfo(id);
});

function changeType(value) {
  console.log("菜单类型更改", value);
}
const getTail = item => {
  if (item.children && item.children.length > 0) {
    return item.children.map(m => getTail(m));
  } else {
    return [item];
  }
};

const formatApi = (row: FormButtonProps) => {
  if (!row.apiId) return;
  let pathList = getPathByKey(row.apiId, apiCascaderOption.value);
  let pathUrl = pathList.map(item => item.label).join(" / ");
  return pathUrl;
};

const tableRef = ref<VxeTableInstance<FormButtonProps>>();
const insertEvent = async () => {
  const $table = tableRef.value;
  if ($table) {
    await $table.insert({ sort: 1 });
  }
};

const validRules = ref<VxeTablePropTypes.EditRules>({
  title: [{ required: true, message: "名称不能为空" }],
  buttonCode: [
    {
      required: true,
      message: "编码不能为空"
    },
    {
      validator({ cellValue }) {
        if (cellValue === "") {
        } else if (hasCNChars(cellValue)) {
          return new Error("编码不能包含中文");
        }
      }
    }
  ]
});

const removeEvent = async (row: FormButtonProps) => {
  const $table = tableRef.value;
  if ($table) {
    $table.remove(row);
  }
};

const ruleFormRef = ref();
function getRef() {
  return ruleFormRef.value;
}
function getModelData() {
  return modelData.value;
}
function getTableRef() {
  return tableRef.value;
}
defineExpose({ getRef, getModelData, getTableRef });

const props1 = {
  emitPath: false,
  checkStrictly: true
};
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
        <el-form-item label="上级菜单" prop="">
          <el-cascader
            class="w-full"
            clearable
            filterable
            v-model="modelData.parentId"
            :options="menuCascaderOptions"
            :props="{
              emitPath: false,
              checkStrictly: true
            }"
          >
          </el-cascader>
        </el-form-item>
      </re-col>

      <re-col :value="24" :xs="24" :sm="24">
        <el-form-item label="菜单类型" prop="type">
          <el-radio-group v-model="modelData.type" @change="changeType">
            <el-radio :label="0">目录</el-radio>
            <el-radio :label="1">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="菜单名称" prop="title">
          <el-input v-model="modelData.title" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="路由名称" prop="name">
          <el-input v-model="modelData.name" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="路由路径" prop="path">
          <el-input v-model="modelData.path" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="组件路径" prop="component">
          <el-input v-model="modelData.component" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="图标" prop="icon">
          <IconSelect v-model="modelData.icon" class="w-full" />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="重定向" prop="redirect">
          <el-input v-model="modelData.redirect" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="链接地址" prop="frameSrc">
          <el-input v-model="modelData.frameSrc" clearable />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="modelData.sort" :min="1" class="!w-full" />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否隐藏" prop="isHide">
          <el-radio-group v-model="modelData.isHide" @change="changeType">
            <el-radio :label="true">隐藏</el-radio>
            <el-radio :label="false">不隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否缓存" prop="isKeepAlive">
          <el-radio-group v-model="modelData.isKeepAlive" @change="changeType">
            <el-radio :label="true">缓存</el-radio>
            <el-radio :label="false">不缓存</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否固定" prop="isAffix">
          <el-radio-group v-model="modelData.isAffix" @change="changeType">
            <el-radio :label="true">固定</el-radio>
            <el-radio :label="false">不固定</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="内外嵌" prop="isFrame">
          <el-radio-group v-model="modelData.isFrame" @change="changeType">
            <el-radio :label="true">外嵌</el-radio>
            <el-radio :label="false">内嵌</el-radio>
          </el-radio-group>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="是否启用" prop="isEnable">
          <el-radio-group v-model="modelData.isEnable" @change="changeType">
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

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="insertEvent">新增</vxe-button>
      </template>
    </vxe-toolbar>
    <vxe-table
      border
      show-overflow
      keep-source
      ref="tableRef"
      :data="modelData.buttonProps"
      :edit-rules="validRules"
      :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
    >
      <vxe-column field="title" title="名称" width="200" :edit-render="{}">
        <template #edit="{ row }">
          <el-input v-model="row.title" clearable />
        </template>
      </vxe-column>
      <vxe-column field="buttonCode" title="编码" width="300" :edit-render="{}">
        <template #edit="{ row }">
          <el-input v-model="row.buttonCode" clearable />
        </template>
      </vxe-column>

      <vxe-column field="apiId" title="权限" :edit-render="{}">
        <template #default="{ row }">
          <span>{{ formatApi(row) }}</span>
        </template>
        <template #edit="{ row }">
          <el-cascader
            v-model="row.apiId"
            :options="apiCascaderOption"
            :props="props1"
            class="w-9/12"
            clearable
          />
        </template>
      </vxe-column>
      <vxe-column field="sort" title="排序" width="160" :edit-render="{}">
        <template #edit="{ row }">
          <el-input-number v-model="row.sort" :min="1" class="!w-full" />
        </template>
      </vxe-column>
      <vxe-column title="操作" width="100" show-overflow>
        <template #default="{ row }">
          <el-popconfirm title="确认要删除吗?" @confirm="removeEvent(row)">
            <template #reference>
              <el-button link type="danger" :icon="useRenderIcon(Delete)"
                >删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </vxe-column>
    </vxe-table>
  </el-form>
</template>
