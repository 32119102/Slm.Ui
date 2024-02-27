import { addDialog } from "@/components/ReDialog";
import { PaginationProps } from "@pureadmin/table";
import { h, onMounted, reactive, ref, toRaw } from "vue";
import editForm from "../form/index.vue";
import dataScopeForm from "../form/dataScope.vue";
import { message } from "@/utils/message";
import { roleAdd, roleDel, rolePage, roleUpdate } from "@/api/platform/role";
import { ElMessageBox } from "element-plus";
import { constantRoutes } from '../../../../router/index';
import type { DataScopeProps } from "./types";


export function useRole() {
  const loading = ref(true);
  const dataList = ref([]);
  const form = reactive({
    name: "",
    code: "",
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
      label: "角色名称",
      prop: "name",
      width: 200,
    },
    {
      label: "角色编码",
      prop: "code",
      width: 200,
    },
    {
      label: "数据范围",
      prop: "dataScopeName",
      minWidth: 70
    },
    {
      label: "排序",
      prop: "sort",
      minWidth: 70
    },
    {
      label: "状态",
      prop: "isEnable",
      minWidth: 70
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
              const isSu = await roleUpdate(id, curData);
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              const isSu = await roleAdd(curData);
              chores();
            }
          }
        });
      }
    });
  };


  async function handleDelete(row) {
    const result = await roleDel(row.id);
    if (!result) {
      message(`删除失败`, { type: "warning" });
      return;
    }
    message(`删除成功`, { type: "success" });
    await onSearch();

  }
  const dataScopeRef = ref();


  /**
   * 数据权限分配
   * @param id 角色id
   */
  async function handleDataScope(id: string, dataScope?: number) {
    console.log('数据权限分配');

    addDialog({
      props: {
        formInline: {
          dataScope: dataScope
        }
      },
      title: '编辑数据范围',
      width: "20%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(dataScopeForm, { ref: dataScopeRef }),
      beforeSure: (done, { options }) => {


        const curData = options.props.formInline;
        if (curData.dataScope == 5) {
          const keys = dataScopeRef.value.getCheckedKeys();
          console.log("keys", keys);
        }
        console.log("curIds", curData);
        // 根据实际业务使用curData.ids和row里的某些字段去调用修改角色接口即可
        function chores() {
          message(`更新成功`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
      }
    });
  }




  async function onSearch() {
    loading.value = true;
    let params = Object.assign(form, {
      page: {
        index: pagination.currentPage,
        size: pagination.pageSize
      }
    });
    const data = await rolePage(toRaw(params));
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
    handleCurrentChange,
    handleDataScope
  };
}