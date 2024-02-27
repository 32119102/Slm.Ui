import { addDialog } from "@/components/ReDialog";
import { PaginationProps } from "@pureadmin/table";
import { h, onMounted, reactive, ref, toRaw } from "vue";
import editForm from "../form/index.vue";
import { message } from "@/utils/message";
import { tenantAdd, tenantDel, tenantIsEnable, tenantPage, tenantUpdate } from "@/api/platform/tenant";
import { object } from "vue-types";
import { ElMessageBox } from "element-plus";
import { isDef } from '../../../../utils/is';

export function useTenant() {
  const loading = ref(true);
  const dataList = ref([]);
  const form = reactive({
    name: "",
  });
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true,
    pageSizes: [10, 20, 50],
  });

  const columns: TableColumnList = [
    {
      label: "租户名称",
      prop: "name",
      width: 200,
    },
    {
      label: "租户编码",
      prop: "code",
      width: 200,
    },
    {
      label: "租户类型",
      prop: "tenantType",
      minWidth: 70
    },
    {
      label: "租户配置Id",
      prop: "configId",
      minWidth: 70
    },
    {
      label: "数据库类型",
      prop: "dbType",
      minWidth: 70
    },
    {
      label: "数据库连接",
      prop: "connection",
      minWidth: 70
    },

    {
      label: "状态",
      prop: "isEnable",
      minWidth: 70,
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          v-model={scope.row.isEnable}
          active-value={true}
          inactive-value={false}
          active-text="启用"
          inactive-text="禁用"
          inline-prompt
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "修改记录",
      width: 200,
      slot: "info"
    },

    {
      label: "操作",
      fixed: "right",
      width: 210,
      slot: "operation"
    }
  ];

  function onChange({ row, index }) {
    console.log(row, index);
    ElMessageBox.confirm(
      `确认要<strong>${row.isEnable ? "启用" : "停用"}</strong><strong style='color:var(--el-color-primary)'>
      ${row.name}</strong>吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(async () => {
        await tenantIsEnable({ id: row.id })
        message(`已${row.isEnable ? "启用" : "停用"}${row.name}`, {
          type: "success"
        });
        await onSearch();


      }).catch(() => {
        row.isEnable ? (row.isEnable = false) : (row.isEnable = true);
      });
  }


  const formRef = ref();
  function openDialog(title = '新增', id?: string) {
    addDialog({
      props: {
        formInline: {
          id: id
        }
      },
      title: title,
      width: "60%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done) => {
        console.log(done);
        const FormRef = formRef.value.getRef();

        const curData = formRef.value.getModelData();
        function chores() {
          message(`更新成功`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {

            // 表单规则校验通过
            if (id) {
              // 实际开发先调用新增接口，再进行下面操作
              const isSu = await tenantUpdate(id, curData);
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              const isSu = await tenantAdd(curData);
              chores();
            }
          }
        });
      }
    });
  };


  async function handleDelete(row) {
    const result = await tenantDel(row.id);
    if (!result) {
      message(`删除失败`, { type: "warning" });
      return;
    }
    message(`删除成功`, { type: "success" });
    await onSearch();

  }

  async function onSearch() {
    loading.value = true;
    let params = Object.assign(form, {
      page: {
        index: pagination.currentPage,
        size: pagination.pageSize
      }
    });
    const data = await tenantPage(toRaw(params));
    // console.log(data, 1111, toRaw(params));
    dataList.value = data.rows;
    pagination.total = data.total;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function handleSizeChange(val: number) {
    await onSearch();
  }

  async function handleCurrentChange(val: number) {
    await onSearch();
  }


  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }
  onMounted(() => {
    console.log(2222);
    onSearch();
  });

  return {
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
    handleCurrentChange
  };
}