import React from 'react';

export function Move(props) {
  const move = props.move;
  const step = props.step;
  const desc = step ?
    'Move #' + step + ' - (' + move.details + ')' :
    'Game start!';
  return (
    <li
      key={move}
      className={props.className}
    >
      <button
        id={move}
        className={props.className}
        onClick={() => props.onClick(step)}
      >
        {desc}
      </button>
    </li>);
}
