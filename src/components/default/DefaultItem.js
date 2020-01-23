import React from "react";

import { DeleteIcon, StyledSimpleListItem, MoveIcon } from "./../StyledComponents";

export default ({ item, removeItem, idx, onDragStart, onDragOver, onDragEnd }) => {
  return (
    <StyledSimpleListItem
      // key={item.Title}

      title={item}>
      <MoveIcon
        draggable
        onDragOver={e => onDragOver(e, idx)}
        onDragStart={e => onDragStart(e, idx)}
        onDragEnd={e => {
          onDragEnd(e);
        }}
      />
      {item}
      <DeleteIcon
        onClick={() => {
          removeItem(item);
        }}
      />
    </StyledSimpleListItem>
  );
};
