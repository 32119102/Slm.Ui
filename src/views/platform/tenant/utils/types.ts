interface FormTenantProps {
  id?: string;

  name: string;
  code: string;
  //租户类型(0.Id;1.Db;)
  tenantType: number;
  dbType: number;
  connection: string;
  configId: string;
  isEnable: boolean;
  remark: string;
}

export type { FormTenantProps };
