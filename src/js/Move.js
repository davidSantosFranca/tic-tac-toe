import React from 'react';

export function Move(props) {
  const move = props.move;
  const step = props.step;
  const desc = step ?
    'Move #' + step + ' - (' + move.details + ')' :
    'Game start!';
  return (
    <li
      key={step}
      className={props.className}
    >
      <div
        id={"move-div-"+step}
        className={props.className}
        onClick={() => props.onClick(step)}
      >
        {desc}
      </div>
    </li>);
}
