import React from "react";

import { DeleteIcon, StyledSimpleListItem, MoveIcon } from "./../home/StyledComponents";

export default ({ item, removeItem, idx, onDragStart, onDragOver, onDragEnd }) => {
  return (
    <StyledSimpleListItem
      // key={item.Title}
      onDragOver={e => onDragOver(e, idx)}
      title={item}>
      <MoveIcon
        draggable
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
