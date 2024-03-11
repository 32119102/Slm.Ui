import { onMounted, reactive, ref, h, toRaw } from "vue";
import { message } from "@/utils/message";
import { orgAdd, orgCascader, orgTreeTable } from "@/api/platform/org";
import { addDialog } from "@/components/ReDialog";
import editForm from "../form/index.vue";
import { PaginationProps } from "@pureadmin/table";
import { userAdd, userPage } from "@/api/platform/user";

export function useUser() {
  const loading = ref(true);
  const dataList = ref([]);
  const form = reactive({
    name: "",
    phone: "",
    orgId: "0"
  });

  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true,
    pageSizes: [10, 20, 50],
  });


  const treeData = ref([]);
  const treeLoading = ref(true);




  const columns: TableColumnList = [
    {
      label: "头像",
      prop: "avatar",
      width: 200,
      align: "left",
    },
    {
      label: "账号",
      prop: "account",
      width: 200,
    },
    {
      label: "姓名",
      prop: "nickName",
      width: 200,
    },

    {
      label: "手机号码",
      prop: "phone",
      minWidth: 70
    },
    {
      label: "账号类型",
      prop: "accountTypeName",
      minWidth: 70
    },
    {
      label: "角色集合",
      prop: "roleNames",
      minWidth: 70
    },
    {
      label: "所属机构",
      prop: "orgName",
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
              const isSu = await userAdd(curData);
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
    form.orgId = id;
    onSearch();
  }

  async function onTreeLoad() {

    await tree();
  }



  async function onSearch() {
    loading.value = true;
    let params = Object.assign(form, {
      page: {
        index: pagination.currentPage,
        size: pagination.pageSize
      }
    });
    const data = await userPage(toRaw(params));
    dataList.value = data.rows;
    pagination.total = data.total;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function handleSizeChange(val: number) {
    pagination.currentPage = 1;
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
    onTreeLoad,
    pagination,
    handleSizeChange,
    handleCurrentChange
  };
}