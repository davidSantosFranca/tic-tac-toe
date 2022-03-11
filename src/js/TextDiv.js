import React from 'react';

export function TextDiv(props) {
  return (
    <div
      id={props.id}
      className={props.className}
      onClick={props.onClick}
    >
      {props.text}
    </div>);
}
