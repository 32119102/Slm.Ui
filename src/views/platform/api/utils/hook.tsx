import { onMounted, reactive, ref, h } from "vue";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import editForm from "../form/index.vue";
import { apiSync, apiTreeTable, apiAdd } from "@/api/platform/api";


export function useApi() {
  const loading = ref(true);
  const dataList = ref([]);
  const form = reactive({
    label: "",
  });


  const columns: TableColumnList = [
    {
      label: "接口名称",
      prop: "label",
      width: 200,
      align: "left",
    },

    {
      label: "接口地址",
      prop: "path",
      minWidth: 200
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
        console.log(curData)
        return;
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
              chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              const isSu = await apiAdd(curData);
              chores();
            }
          }
        });
      }
    });
  };




  async function onSearch() {
    loading.value = true;
    dataList.value = await apiTreeTable(form);
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

  async function handleSyanc() {
    loading.value = true;
    const isSu = await apiSync();
    message(`同步成功`, {
      type: "success"
    });
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  onMounted(() => {
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
    handleDelete,
    handleSyanc
  };
}
