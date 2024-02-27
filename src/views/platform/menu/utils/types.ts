interface FormMenuProps {
  id?: string;
  parentId?: string;
  parentIds?: string[];
  title: string;
  path: string;
  name: string;
  component: string;
  type: number;
  redirect: string;
  icon: string;
  sort: number;
  isHide: boolean;
  isFrame: boolean;
  frameSrc: string;
  isKeepAlive: boolean;
  isAffix: boolean;
  isEnable: boolean;
  remark: string;
 buttonProps: FormButtonProps[];
}


interface FormButtonProps {
  id?: string;
  title: string;
  buttonCode: string;
  apiId?: string;
  sort: number;
  role:string
}

export type { FormMenuProps,FormButtonProps };