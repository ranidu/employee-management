import React from "react";
import { Button, ButtonProps } from "antd";

const Buttons = (props: ButtonProps) => {
  return (
    <Button
      type={props.type || 'primary'}
      icon={props.icon}
      onClick={props.onClick}
      htmlType={props.htmlType || "button"}
      size={props.size}
      className={props.className}
    >
      {props.title}
    </Button>
  );
};

export default Buttons;
