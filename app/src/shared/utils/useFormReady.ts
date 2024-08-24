import { FormInstance } from 'antd';
import { Dispatch, SetStateAction, useEffect } from 'react';

export function useFormReady(
  form: FormInstance,
  allFields: any,
  setReady: Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    form
      ?.validateFields({ validateOnly: true })
      .then(() => setReady(() => true))
      .catch(() => setReady(() => false));
  }, [form, allFields]);
}
