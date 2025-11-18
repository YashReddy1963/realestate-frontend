import { FormEvent, useEffect, useMemo, useState } from "react";
import { LineChart, MultiLineChart } from "@/components/RealEstate/ChartContainer";

const Index = () => {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [chartType, setChartType] = useState<"line" | "multi_line" | "">("");
  const [chartData, setChartData] = useState<any>(null);
  const [tableData, setTableData] = useState<Record<string, string | number>[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const examplePrompts = [
    "Summarize property demand in Wakad",
    "Compare rent trends for Aundh and Akurdi",
  ];
  const highlightStats = [
    { label: "Avg. ROI", value: "18.4%" },
    { label: "Active Markets", value: "42" },
    { label: "Data Points", value: "120K+" }
  ];
  const locationOptions = useMemo(() => {
    return Array.from(
      new Set(
        tableData
          .map((row) => row["final location"])
          .filter((value): value is string => typeof value === "string")
      )
    );
  }, [tableData]);

  useEffect(() => {
    if (!selectedLocation && locationOptions.length > 0) {
      setSelectedLocation(locationOptions[0]);
    }
  }, [locationOptions, selectedLocation]);

  const sendQuery = async () => {
    const res = await fetch("https://realestate-backend-5hg5.onrender.com/api/query/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const data = await res.json();

    setSummary(data.summary);
    setChartType(data.chart_type);
    setChartData(data.chart_data);
    setTableData(data.table_data);
    setSelectedLocation("")
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }
    setIsLoading(true);
    try {
      await sendQuery();
    } finally {
      setIsLoading(false);
    }
  };

  const renderChart = () => {
    if (chartType === "line") {
      return <LineChart data={chartData} />;
    }
    if (chartType === "multi_line") {
      return <MultiLineChart data={chartData} />;
    }
    return null;
  };

  const downloadCSV = () => {
    if (!selectedLocation) {
      alert("Please select a location before downloading the CSV.")
      return;
    }
    window.open(`https://realestate-backend-5hg5.onrender.com/api/download/?location=${selectedLocation}`);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.25),_transparent_60%)]" />
        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        <div className="absolute -left-32 top-10 h-48 w-48 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -right-24 bottom-16 h-56 w-56 rounded-full bg-teal-400/30 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
        <main className="mx-auto flex w-full max-w-5xl flex-col gap-10">
          <section className="rounded-[32px] border border-white/10 bg-white/95 p-8 shadow-2xl shadow-slate-900/30 backdrop-blur dark:bg-slate-900/90 dark:text-white animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:bg-white/10 dark:text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Real Estate AI
              </p>
              <div className="space-y-3">
                <h1 className="text-3xl font-semibold leading-tight text-slate-900 dark:text-white sm:text-4xl">
                Mini Real Estate Analysis Chatbot
                </h1>
                <p className="text-base text-slate-600 dark:text-slate-200">
                  Ask about any micro-market, compare investment corridors, or download curated data for your reports — all powered by your private analytics stack.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-inner shadow-slate-200/40 transition duration-300 hover:border-emerald-300 hover:shadow-emerald-100 dark:border-white/10 dark:bg-slate-900 dark:shadow-none"
            >
              <label htmlFor="chat-query" className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Ask the analyst
              </label>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  id="chat-query"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-60 dark:border-white/10 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-400"
                  placeholder="e.g. Compare rental yields between Baner & Aundh"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-5 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/40 transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 disabled:opacity-60"
                  disabled={isLoading}
                >
                  {isLoading ? "Analyzing..." : "Generate insight"}
                </button>
              </div>
            </form>

            <div className="mt-8 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Sample prompts
              </p>
              <div className="grid gap-3 md:grid-cols-2">
                {examplePrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setQuery(prompt)}
                    className="text-left rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-white hover:text-slate-900 dark:border-white/10 dark:bg-slate-800 dark:text-slate-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlightStats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-slate-800"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">{item.label}</p>
                  <p className="text-2xl font-semibold text-slate-900 dark:text-white">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 space-y-6">
              {summary && (
                <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Executive summary</h2>
                    <span className="text-xs font-semibold uppercase tracking-widest text-emerald-500">
                      Fresh insight
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-200">{summary}</p>
                </section>
              )}

              {chartType && chartData && (
                <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Market visual</h2>
                  <div className="mt-4">{renderChart()}</div>
                </section>
              )}

              {tableData.length > 0 && (
                <section className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-800">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Filtered dataset</h2>
                      <p className="text-sm text-slate-500 dark:text-slate-300">Download and extend your analysis.</p>
                    </div>
                    {locationOptions.length > 0 && (
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <select
                          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-100 dark:border-white/10 dark:bg-slate-900 dark:text-white"
                          value={selectedLocation}
                          onChange={(event) => setSelectedLocation(event.target.value)}
                        >
                          <option value="">Select location</option>
                          {locationOptions.map((loc) => (
                            <option key={loc} value={loc}>
                              {loc}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={downloadCSV}
                          className="rounded-xl border border-emerald-200/60 px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm transition hover:bg-emerald-50 dark:border-emerald-500/30 dark:text-emerald-200"
                        >
                          Download CSV
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm text-slate-600 dark:text-slate-200">
                        <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:bg-slate-900/60">
                          <tr>
                            {Object.keys(tableData[0]).map((col) => (
                              <th key={col} className="px-4 py-3">
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, rowIdx) => (
                            <tr
                              key={rowIdx}
                              className="border-t border-slate-100/80 last:border-b-0 dark:border-white/5"
                            >
                              {Object.values(row).map((value, cellIdx) => (
                                <td key={cellIdx} className="px-4 py-3">
                                  {value as string | number}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
