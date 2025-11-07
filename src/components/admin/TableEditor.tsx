"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface TableEditorProps {
  onInsert: (html: string) => void;
}

export function TableEditor({ onInsert }: TableEditorProps) {
  const { toast } = useToast();
  const [rows, setRows] = React.useState(2);
  const [cols, setCols] = React.useState(3);
  const [tableData, setTableData] = React.useState<
    { id: string; values: { id: string; value: string }[] }[]
  >(() =>
    Array(2)
      .fill(null)
      .map(() => ({
        id: crypto.randomUUID(),
        values: Array(3)
          .fill(null)
          .map(() => ({ id: crypto.randomUUID(), value: "" })),
      })),
  );

  const updateCell = (rowId: string, colId: string, value: string) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === rowId
          ? {
              ...row,
              values: row.values.map((cell) =>
                cell.id === colId ? { ...cell, value } : cell,
              ),
            }
          : row,
      ),
    );
  };

  const addRow = () => {
    setTableData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        values: Array(cols)
          .fill(null)
          .map(() => ({ id: crypto.randomUUID(), value: "" })),
      },
    ]);
    setRows(rows + 1);
  };

  const addCol = () => {
    setTableData((prev) =>
      prev.map((row) => ({
        ...row,
        values: [...row.values, { id: crypto.randomUUID(), value: "" }],
      })),
    );
    setCols(cols + 1);
  };

  const removeRow = (rowId: string) => {
    if (rows <= 1) return;
    setTableData((prev) => prev.filter((row) => row.id !== rowId));
    setRows(rows - 1);
  };

  const handleInsert = () => {
    let html =
      '<table class="w-full border-collapse border border-slate-300 my-4"><tbody>';

    for (const [rowIdx, row] of tableData.entries()) {
      html += "<tr>";
      for (const cell of row.values) {
        const isBorder =
          rowIdx === 0
            ? "border border-slate-400 bg-slate-100"
            : "border border-slate-300";
        html += `<td class="${isBorder} p-2 font-semibold">${
          cell.value || "&nbsp;"
        }</td>`;
      }
      html += "</tr>";
    }

    html += "</tbody></table>";
    onInsert(html);
    toast({
      title: "সাফল্য",
      description: "টেবিল যোগ করা হয়েছে।",
    });
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
      <h3 className="font-semibold text-sm">Insert Table</h3>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">Rows</Label>
          <Input
            type="number"
            min="1"
            value={rows}
            onChange={(e) => {
              const newRows = Number.parseInt(e.target.value) || 1;
              const diff = newRows - rows;
              if (diff > 0) {
                setTableData([
                  ...tableData,
                  ...Array(diff)
                    .fill(null)
                    .map(() => ({
                      id: crypto.randomUUID(),
                      values: Array(cols)
                        .fill(null)
                        .map(() => ({ id: crypto.randomUUID(), value: "" })),
                    })),
                ]);
              } else {
                setTableData(tableData.slice(0, newRows));
              }
              setRows(newRows);
            }}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Columns</Label>
          <Input
            type="number"
            min="1"
            value={cols}
            onChange={(e) => {
              const newCols = Number.parseInt(e.target.value) || 1;
              const diff = newCols - cols;
              const newData = tableData.map((row) => ({
                ...row,
                values: [
                  ...row.values,
                  ...Array(Math.max(0, diff))
                    .fill(null)
                    .map(() => ({ id: crypto.randomUUID(), value: "" })),
                ].slice(0, newCols),
              }));
              setTableData(newData);
              setCols(newCols);
            }}
          />
        </div>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {tableData.map((row, rowIdx) => (
          <div key={row.id} className="flex gap-2 items-start">
            <div className="flex gap-2 flex-1">
              {row.values.map((cell, colIdx) => (
                <Input
                  key={cell.id}
                  value={cell.value}
                  onChange={(e) => updateCell(row.id, cell.id, e.target.value)}
                  placeholder={`R${rowIdx + 1}C${colIdx + 1}`}
                  className="text-xs"
                />
              ))}
            </div>
            {rows > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeRow(row.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={addRow} className="flex-1">
          <Plus className="mr-2 h-4 w-4" />
          Add Row
        </Button>
        <Button variant="outline" onClick={addCol} className="flex-1">
          <Plus className="mr-2 h-4 w-4" />
          Add Column
        </Button>
      </div>

      <Button onClick={handleInsert} className="w-full">
        Insert Table
      </Button>
    </div>
  );
}
