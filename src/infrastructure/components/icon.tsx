import React from "react";

export interface IconProps {
  color: string;
  icon: string;
}
const Icon = (props: IconProps) => {
  return <i className={`text-${props.color} ${props.icon}`}></i>;
};

export default Icon;
