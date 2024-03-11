<script setup lang="ts">
import ReCol from "@/components/ReCol";
import type { FormProps } from "#/formModel";
import { onMounted, ref } from "vue";
import { formRules } from "../utils/rule";
import { orgGet, orgCascader } from "@/api/platform/org";
import { FormUserProps } from "../utils/types";
import { userGet } from "@/api/platform/user";
import { roleSelect } from "@/api/platform/role";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: null
  })
});
const id = props.formInline?.id;
const modelData = ref<FormUserProps>({
  account: "",
  realName: "",
  nickName: "",
  email: "",
  phone: "",
  orgId: 0,
  sort: 100,
  isEnable: false,
  remark: ""
});

const orgCascaderOptions = ref([]);
const roleOptions = ref([]);

onMounted(async () => {
  console.log("加载", id);
  orgCascaderOptions.value = await orgCascader();
  roleOptions.value = await roleSelect();
  if (id) modelData.value = await userGet(id);
});

const ruleFormRef = ref();
function getRef() {
  return ruleFormRef.value;
}
function getModelData() {
  return modelData.value;
}

function addUser2Org() {
  if (modelData.value.orgIds == undefined) modelData.value.orgIds = [];
  modelData.value.orgIds?.push("");
}

// 删除附属机构行
const deleteExtOrgRow = (k: number) => {
  modelData.value.orgIds?.splice(k, 1);
};

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
        <el-form-item prop="account" label="账号名称">
          <el-input
            v-model="modelData.account"
            clearable
            placeholder="账号名称"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item prop="nickName" label="昵称">
          <el-input v-model="modelData.nickName" clearable placeholder="昵称" />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item prop="phone" label="手机号码">
          <el-input
            v-model="modelData.phone"
            clearable
            placeholder="手机号码"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item prop="realName" label="真实姓名">
          <el-input
            v-model="modelData.realName"
            clearable
            placeholder="真实姓名"
          />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item prop="roleIds" label="角色集合">
          <el-select
            v-model="modelData.roleIds"
            multiple
            clearable
            placeholder="角色集合"
            collapse-tags
            collapse-tags-tooltip
            filterable
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item prop="accountType" label="账号类型">
          <el-select
            v-model="modelData.accountType"
            placeholder="账号类型"
            collapse-tags
            collapse-tags-tooltip
          >
            <el-option label="系统管理员" :value="2" />
            <el-option label="普通账号" :value="1" />
          </el-select>
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="modelData.email" clearable placeholder="邮箱" />
        </el-form-item>
      </re-col>

      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="modelData.sort" :min="1" class="!w-full" />
        </el-form-item>
      </re-col>

      <el-divider border-style="dashed" content-position="center">
        <div style="color: #b1b3b8">机构组织</div>
      </el-divider>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="上级机构" prop="pid">
          <el-cascader
            class="w-full"
            clearable
            filterable
            v-model="modelData.orgId"
            :options="orgCascaderOptions"
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
      <el-divider border-style="dashed" content-position="center">
        <div style="color: #b1b3b8">附属机构</div>
      </el-divider>
      <re-col :value="24" :xs="24" :sm="24">
        <el-button icon="ele-Plus" type="primary" plain @click="addUser2Org">
          增加附属机构
        </el-button>
        <span style="font-size: 12px; color: gray; padding-left: 5px">
          具有相应组织机构的数据权限
        </span>
      </re-col>
      <re-col :value="24" :xs="24" :sm="24">
        <template
          v-if="modelData.orgIds != undefined && modelData.orgIds.length > 0"
        >
          <el-row :gutter="35" v-for="(v, k) in modelData.orgIds" :key="k">
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mb20">
              <el-form-item
                label="机构"
                :prop="`orgIds[${k}]`"
                :rules="[
                  { required: true, message: `机构不能为空`, trigger: 'blur' }
                ]"
              >
                <template #label>
                  <el-button
                    icon="ele-Delete"
                    type="danger"
                    circle
                    plain
                    size="small"
                    @click="deleteExtOrgRow(k)"
                  />
                  <span class="ml5">机构</span>
                </template>
                <el-cascader
                  :options="orgCascaderOptions"
                  :props="{
                    emitPath: false,
                    checkStrictly: true,
                    expandTrigger: 'hover'
                  }"
                  placeholder="机构组织"
                  clearable
                  v-model="modelData.orgIds[k]"
                >
                  <template #default="{ node, data }">
                    <span>{{ data.label }}</span>
                    <span v-if="!node.isLeaf">
                      ({{ data.children.length }})
                    </span>
                  </template>
                </el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <el-empty :image-size="50" description="空数据" v-else></el-empty>
      </re-col>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped></style>
