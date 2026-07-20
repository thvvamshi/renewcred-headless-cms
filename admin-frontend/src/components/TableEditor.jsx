import { Plus, Trash2 } from "lucide-react";

export default function TableEditor({ data, onChange }) {
  const headers = data.headers?.length ? data.headers : ["Column 1", "Column 2"];
  const rows = data.rows?.length ? data.rows : [["", ""]];

  function updateHeader(index, value) {
    onChange({ ...data, headers: headers.map((cell, cellIndex) => (cellIndex === index ? value : cell)), rows });
  }

  function updateCell(rowIndex, cellIndex, value) {
    onChange({
      ...data,
      headers,
      rows: rows.map((row, index) =>
        index === rowIndex ? row.map((cell, currentCellIndex) => (currentCellIndex === cellIndex ? value : cell)) : row
      )
    });
  }

  function addColumn() {
    onChange({
      ...data,
      headers: [...headers, `Column ${headers.length + 1}`],
      rows: rows.map((row) => [...row, ""])
    });
  }

  function addRow() {
    onChange({ ...data, headers, rows: [...rows, headers.map(() => "")] });
  }

  function removeRow(index) {
    onChange({ ...data, headers, rows: rows.filter((_, rowIndex) => rowIndex !== index) });
  }

  return (
    <div className="space-y-3">
      <input
        value={data.caption || ""}
        onChange={(event) => onChange({ ...data, caption: event.target.value, headers, rows })}
        className="w-full rounded-md border border-line px-3 py-2.5"
        placeholder="Table caption"
      />
      <div className="overflow-x-auto rounded-md border border-line">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-shell">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="border-b border-line p-2 text-left">
                  <input
                    value={header}
                    onChange={(event) => updateHeader(index, event.target.value)}
                    className="w-full rounded border border-line px-2 py-1.5 font-semibold"
                  />
                </th>
              ))}
              <th className="w-12 border-b border-line" />
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((_, cellIndex) => (
                  <td key={cellIndex} className="border-b border-line p-2">
                    <input
                      value={row[cellIndex] || ""}
                      onChange={(event) => updateCell(rowIndex, cellIndex, event.target.value)}
                      className="w-full rounded border border-line px-2 py-1.5"
                    />
                  </td>
                ))}
                <td className="border-b border-line p-2">
                  <button type="button" onClick={() => removeRow(rowIndex)} className="h-8 w-8 rounded border border-line text-brand" title="Remove row">
                    <Trash2 size={14} className="mx-auto" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-2">
        <button type="button" onClick={addRow} className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold">
          <Plus size={15} />
          Row
        </button>
        <button type="button" onClick={addColumn} className="inline-flex items-center gap-2 rounded-md border border-line px-3 py-2 text-sm font-semibold">
          <Plus size={15} />
          Column
        </button>
      </div>
    </div>
  );
}
