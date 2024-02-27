<script setup lang="ts" name="sysMenu333">
import { useMenu } from "./utils/hook";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Refresh from "@iconify-icons/ep/refresh";
import { ref } from "vue";

const formRef = ref();
const { form, loading, onSearch, resetForm } = useMenu();
</script>

<template>
  <div class="main">
    <el-form class="search-form" ref="formRef" :inline="true" :model="form">
      <el-form-item label="部门名称：" prop="name">
        <el-input v-model="form.name" placeholder="请输入部门名称" clearable />
      </el-form-item>
      <el-form-item label="部门名称：">
        <el-input placeholder="请输入部门名称" clearable />
      </el-form-item>
      <el-form-item label="部门名称：">
        <el-input placeholder="请输入部门名称" clearable />
      </el-form-item>
      <el-form-item label="部门名称：">
        <el-input placeholder="请输入部门名称" clearable />
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
        <el-form-item label="部门名称：">
          <el-input placeholder="请输入部门名称" clearable />
        </el-form-item>
        <el-form-item label="部门名称：">
          <el-input placeholder="请输入部门名称" clearable />
        </el-form-item>
        <el-form-item label="部门名称：">
          <el-input placeholder="请输入部门名称" clearable />
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
  </div>
</template>

<style lang="scss" scoped>
.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>
