import React from 'react';
import { connect } from 'mini-store';

function TableHeaderRow({ row, index, height, components, onHeaderRow }) {
  const style = { height };
  const HeaderRow = components.header.row;
  const HeaderCell = components.header.cell;
  const rowProps = onHeaderRow(row.map(cell => cell.column), index);

  return (
    <HeaderRow style={style} {...rowProps}>
      {row.map((cell, i) => {
        const { column, ...cellProps } = cell;
        const customProps = column.onHeaderCell ? column.onHeaderCell(column) : {};
        return <HeaderCell {...cellProps} {...customProps} key={i} />;
      })}
    </HeaderRow>
  );
}

function getRowHeight(state, props) {
  const { fixedColumnsHeadRowsHeight } = state;
  const { columns, rows } = props;
  const headerHeight = fixedColumnsHeadRowsHeight[0];

  if (headerHeight && columns) {
    if (headerHeight === 'auto') {
      return 'auto';
    }
    return headerHeight / rows.length;
  }
  return null;
}

export default connect((state, props) => {
  return {
    height: getRowHeight(state, props),
  };
})(TableHeaderRow);
