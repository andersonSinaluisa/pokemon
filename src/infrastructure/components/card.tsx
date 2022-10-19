import React, { ReactNode } from "react";
import './card.css';


export interface CardProps {
  children?: ReactNode;
}
export const Card = (props: CardProps) => {
  return <div className="card">{props.children}</div>;
};

export interface CardContentProps {
  children?: ReactNode;
  className?:string;

}
export const CardContent = (props: CardContentProps) => {
  return <div className={`card-body ${props.className}`}>{props.children}</div>;
};
export interface CardHeaderProps {
  children?: ReactNode;
}
export const CardHeader = (props: CardHeaderProps) => {
    return <div className="card-header">{props.children}</div>;
};
export interface CardActionsProps {
  children?: ReactNode;
}
export const CardActions = (props: CardActionsProps) => {
    return <div className="card-actions">{props.children}</div>;
};
