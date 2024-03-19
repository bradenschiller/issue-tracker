"use client";

import type { Issue } from "../lib/schema";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import IssuesPage from "./issues/page";

type Status = "OPEN" | "IN_PROGRESS" | "CLOSED";

const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    header: "Issue Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Create At",
  },
];

function StatusTableRow({ cell, ...restProps }) {
  console.log("Calling StatusTableRow");
  const StatusText = {
    ["OPEN"]: "✅ Open",
    ["IN_PROGRESS"]: "📈 In Progress",
    ["CLOSED"]: "❌ Closed",
  };

  const statusColor = {
    ["OPEN"]: "bg-white",
    ["IN_PROGRESS"]: "bg-blue-500",
    ["CLOSED"]: "bg-red-500",
  }[cell.getValue() as Status];

  return (
    <TableCell {...restProps}>
      <span
        className={`flex space-x-1 ${statusColor} px-2 py-1 rounded-lg shadow border-green-500 border justify-center`}
      >
        {StatusText[cell.getValue() as Status]}
      </span>
    </TableCell>
  );
}

export default function DataTable({ data }) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log("TABLE: ", table.getHeaderGroups());

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id === "status") {
                    return <StatusTableRow key={cell.column.id} cell={cell} />;
                  } else {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
