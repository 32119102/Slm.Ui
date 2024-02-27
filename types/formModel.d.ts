interface FormKey {
  id: string | null;
}

interface FormProps {
  formInline: FormKey;
}

interface FormCascaderOption {
  value: string;
  label: string;
  disabled: boolean;
  children: FormCascaderOption[];
  data: object;
}

interface FormSelectOption {
  value: string;
  label: string;
  disabled: boolean;
  data: object;
}

interface EnumSearch {
  moduleCode: string;
  enumName: string;
}

export type {
  FormProps,
  FormKey,
  FormCascaderOption,
  FormSelectOption,
  EnumSearch
};
