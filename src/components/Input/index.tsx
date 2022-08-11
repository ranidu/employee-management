import React from "react";
import { Input, InputProps } from "antd";

const InputField = React.forwardRef((props: InputProps) => {
  return <Input {...props} />;
});

export default InputField;
