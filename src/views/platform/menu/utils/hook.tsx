import { onMounted, reactive, ref, h } from "vue";
import { message } from "@/utils/message";
import { menuAdd, menuTreeTable } from "@/api/platform/menu";
import { addDialog } from "@/components/ReDialog";
import editForm from "../form/index.vue";
import { FormMenuProps } from "./types";


export function useMenu() {
  const loading = ref(true);
  const dataList = ref([]);
  const form = reactive({
    name: "",
    status: null
  });


  const columns: TableColumnList = [
    {
      label: "菜单名称",
      prop: "title",
      width: 200,
      align: "left",
      slot: "title"
    },
    // {
    //   label: "菜单名称2",
    //   align: "left",
    //   slot: "title"
    // },
    {
      label: "类型",
      prop: "type",
      minWidth: 70,
      slot: "type"
    },
    {
      label: "路由路径",
      prop: "path",
      minWidth: 70
    },
    {
      label: "组件路径",
      prop: "component",
      minWidth: 70
    },
    {
      label: "权限标识",
      prop: "buttonCode",
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
        />
      )
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
        const formTableRef = formRef.value.getTableRef();
        function chores() {
          message(`更新成功`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(async valid => {
          if (valid) {
            const { tableData } = formTableRef.getTableData();
            curData.buttonProps = tableData;

            const errMap = await formTableRef.fullValidate(true);
            if (errMap) {
              return;
            }
            console.log("curData", curData);
            // 表单规则校验通过
            if (id) {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              const isSu = await menuAdd(curData);
              chores();
            }
          }
        });
      }
    });
  };




  async function onSearch() {
    loading.value = true;
    dataList.value = await menuTreeTable(form);
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  function resetForm(formEl) {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  }

  function handleDelete(row) {
    message(`您删除了部门名称为${row.name}的这条数据`, { type: "success" });
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
    openDialog,
    dataList,
    handleDelete
  };
}