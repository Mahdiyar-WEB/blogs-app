import React from "react";

function Table({ children, className = "" }) {
  return (
    <div
      dir="rtl"
      className={`
        overflow-hidden
        rounded-2xl
        border border-secondary-200
        bg-white
        shadow-md
        shadow-secondary-200/60
        ${className}
      `}
    >
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full min-w-[900px] text-right text-sm [&_th]:border-b [&_th]:border-secondary-200 [&_th]:bg-primary-800/80 [&_th]:px-5 [&_th]:py-4 [&_th]:text-xs [&_th]:font-semibold [&_th]:text-white [&_th]:whitespace-nowrap [&_td]:border-b [&_td]:border-secondary-100 [&_td]:px-5 [&_td]:py-4 [&_td]:text-secondary-700 [&_td]:whitespace-nowrap [&_tbody_tr:last-child_td]:border-b-0">
          {children}
        </table>
      </div>
    </div>
  );
}

function TableHeader({ children }) {
  return (
    <thead>
      <tr>{children}</tr>
    </thead>
  );
}

function TableBody({ children }) {
  return <tbody className="divide-y divide-secondary-100">{children}</tbody>;
}

function TableRow({ children, className = "" }) {
  return (
    <tr
      className={`
        transition-colors
        duration-200
        hover:bg-primary-50/40

        ${className}
      `}
    >
      {children}
    </tr>
  );
}

function TableHead({ children, className = "" }) {
  return (
    <th
      className={`
        px-5
        py-4
        text-xs
        font-semibold
        whitespace-nowrap
        text-secondary-500
        ${className}
      `}
    >
      {children}
    </th>
  );
}

function TableCell({ children, className = "" }) {
  return (
    <td
      className={`
        px-5
        py-4
        whitespace-nowrap
        text-secondary-700
        ${className}
      `}
    >
      {children}
    </td>
  );
}

function TableSkeletonRow() {
  return (
    <Table.Row>
      {Array.from({ length: 8 }).map((_, index) => (
        <Table.Cell key={index}>
          <div className="h-5 w-20 rounded-md bg-secondary-200 animate-pulse" />
        </Table.Cell>
      ))}
    </Table.Row>
  );
}

Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Head = TableHead;
Table.Cell = TableCell;
Table.SkeletonRow = TableSkeletonRow;

export default Table;
