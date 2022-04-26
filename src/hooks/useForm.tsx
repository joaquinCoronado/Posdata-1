import {useState, useRef} from 'react';

export const useForm = <T extends Object>(initState: T) => {
  const [state, setState] = useState(initState);
  const initialState = useRef<T>(initState).current;
  const onChange = (value: string, field: keyof T) => {
    if (field === null && value === 'clean') {
      setState(initialState);
      return;
    }
    setState({
      ...state,
      [field]: value,
    });
  };

  return {
    ...state,
    form: state,
    onChange,
  };
};
