import { EnumType } from "typescript";

interface FormUserProps {
  account: string;
  realName: string;
  nickName: string;
  sex?: number;
  age?: number;
  email: string;
  phone: string;
  orgId: number;
  accountType?: number;
  sort: number;
  isEnable: boolean;
  remark: string;
  roleIds?: Array<string> | null;
  orgIds?: Array<string> | null;
}

export type { FormUserProps };
