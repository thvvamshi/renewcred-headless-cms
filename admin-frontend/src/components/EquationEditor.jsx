import { Sigma } from "lucide-react";

export default function EquationEditor({ data, onChange }) {
  return (
    <div className="grid gap-3">
      <label className="text-sm font-semibold">
        LaTeX
        <textarea
          value={data.latex || ""}
          onChange={(event) => onChange({ ...data, latex: event.target.value })}
          className="mt-2 min-h-24 w-full rounded-md border border-line px-3 py-2.5 font-mono text-sm"
          placeholder="E_{reduction}=E_{baseline}-E_{project}"
        />
      </label>
      <label className="text-sm font-semibold">
        Caption
        <input
          value={data.caption || ""}
          onChange={(event) => onChange({ ...data, caption: event.target.value })}
          className="mt-2 w-full rounded-md border border-line px-3 py-2.5"
        />
      </label>
      <div className="inline-flex items-center gap-2 rounded-md bg-shell px-3 py-2 font-mono text-sm text-muted">
        <Sigma size={16} />
        {data.latex || "No equation"}
      </div>
    </div>
  );
}
