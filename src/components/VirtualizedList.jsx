import React from 'react';
import VirtualList from 'react-tiny-virtual-list';

export default function VirtualizedList(props) {
  return (
    <VirtualList
      id={props.id}
      width="100%"
      height={props.height}
      itemCount={props.items.length}
      itemSize={props.itemHeight}
      onScroll={props.onScroll ? props.onScroll : null}
      renderItem={props.renderItem}
    />
  );
}
