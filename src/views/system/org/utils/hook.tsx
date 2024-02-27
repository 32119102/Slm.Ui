import { onMounted, reactive, ref, h } from "vue";
import { message } from "@/utils/message";
import { orgAdd, orgCascader, orgTreeTable } from "@/api/platform/org";
import { addDialog } from "@/components/ReDialog";
import editForm from "../form/index.vue";

export function useOrg() {
  const loading = ref(true);
  const dataList = ref([]);
  const form = reactive({
    name: "",
    pid: "0"
  });
  const treeData = ref([]);
  const treeLoading = ref(true);

  const columns: TableColumnList = [
    {
      label: "机构名称",
      prop: "name",
      width: 200,
      align: "left",
    },
    {
      label: "机构名称",
      prop: "code",
      width: 200,
    },
    {
      label: "级别",
      prop: "level",
      width: 200,
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
        async function chores() {
          message(`更新成功`, {
            type: "success"
          });
          done(); // 关闭弹框
          await onSearch(); // 刷新表格数据
          await tree();
        }
        FormRef.validate(async valid => {
          if (valid) {

            // 表单规则校验通过
            if (id) {
              // 实际开发先调用新增接口，再进行下面操作
              await chores();
            } else {
              // 实际开发先调用修改接口，再进行下面操作
              const isSu = await orgAdd(curData);
              await chores();
            }
          }
        });
      }
    });
  };

  async function tree() {
    treeLoading.value = true;
    treeData.value = await orgCascader();
    setTimeout(() => {
      treeLoading.value = false;
    }, 500);

  }

  function onTreeSelect({ id }) {
    form.pid = id;
    onSearch();
  }

  async function onTreeLoad() {

    await tree();
  }

  async function onSearch() {
    loading.value = true;
    dataList.value = await orgTreeTable(form);
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

  onMounted(async () => {
    await onSearch();

    await tree();
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
    treeData,
    treeLoading,
    onTreeSelect,
    onTreeLoad
  };
}