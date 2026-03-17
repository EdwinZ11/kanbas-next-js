"use client";
export default function PassingFunctions({
  theFunctionAction,
}: {
  theFunctionAction: () => void;
}) {
  return (
    <div>
      <h2>Passing Functions</h2>
      <button onClick={theFunctionAction} className="btn btn-primary">
        Invoke the Function
      </button>
      <hr />
    </div>
  );
}
