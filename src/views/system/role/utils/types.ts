// 虽然字段很少 但是抽离出来 后续有扩展字段需求就很方便了

interface FormItemProps {
  /** 角色名称 */
  name: string;
  /** 角色编号 */
  code: string;
  /** 备注 */
  remark: string;
}
interface FormProps {
  formInline: FormItemProps;
}

interface FormRoleProps {
  /** 角色名称 */
  name: string;
  /** 角色编号 */
  code: string;
  /** 备注 */
  remark: string;
  isEnable: boolean;

  sort: number;
  menuIds?: Array<string> | null;
}

interface DataScopeProps {
  formInline: {
    dataScope: number;
  };
}

interface GrantDataScopePros {
  dataScope: number;
  orgIds?: Array<string> | null;
}

export type {
  FormItemProps,
  FormProps,
  FormRoleProps,
  DataScopeProps,
  GrantDataScopePros
};
