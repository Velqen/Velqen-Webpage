import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { RecordItem } from "@/types/transactions";
import { useDeviceSize } from "@/hooks/useDeviceSize";

const TransactionOverview = () => {
  const { isSmallDevice } = useDeviceSize();
  const [userData, setUserData] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>("");
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--velqen-orange")
    .trim();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/fetchSupaBaseTransaction");
        const result = await res.json();
        if (result.error) throw new Error(result.error);
        setUserData(result.data || []);
      } catch (err) {
        setError("Failed to fetch your data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Extract all unique years from transactions
  const years = Array.from(
    new Set(userData.map((item) => format(parseISO(item.date), "yyyy")))
  ).sort();

  // ✅ If no year selected yet, pick the latest
  useEffect(() => {
    if (!selectedYear && years.length > 0) {
      setSelectedYear(years[years.length - 1]);
    }
  }, [years, selectedYear]);

  // ✅ Filter by year, then group by month
  const monthlyData = userData
    .filter((item) => format(parseISO(item.date), "yyyy") === selectedYear)
    .reduce<Record<number, number>>((acc, item) => {
      const month = parseISO(item.date).getMonth(); // 0 = Jan, 11 = Dec
      acc[month] = (acc[month] || 0) + item.amount_rm;
      return acc;
    }, {});

  const formattedChartData = Object.entries(monthlyData)
    .sort(([a], [b]) => Number(a) - Number(b)) // sort by month index
    .map(([monthIndex, total]) => ({
      month: format(new Date(2020, Number(monthIndex)), "MMM"),
      total,
    }));

  return (
    <div className="p-4 my-20 space-y-6 text-white">
      {loading ? (
        <p>Loading your data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : userData.length > 0 ? (
        <div className="space-y-4">
          {/* ✅ Year selector */}
          <div>
            <label htmlFor="year" className="font-medium mr-2 text-white">
              Select Year:
            </label>
            <select
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* ✅ Monthly Bar Chart */}
          <div className="h-96 bg-black p-8 rounded-2xl">
            <h2 className="text-lg font-medium mb-4">
              Monthly Spending – {selectedYear}
            </h2>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={formattedChartData}
                margin={{ right: 20, left: 15, bottom: 30 }} // ✅ Give breathing room
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis
                  dataKey="month"
                  stroke="#ccc"
                  tick={{ fill: "#fff", fontSize: 18 }} // ✅ X-axis text white
                />
                {!isSmallDevice && (
                  <YAxis
                    width={50}
                    stroke="#ccc"
                    tick={{ fill: "#fff", fontSize: 15 }}
                  />
                )}
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#222",
                    borderColor: "#555",
                  }}
                  labelStyle={{ color: "#fff" }} // ✅ Tooltip label white
                  itemStyle={{ color: "#fff" }} // ✅ Tooltip content white
                />
                <Bar dataKey="total" fill={primaryColor} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p>No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionOverview;
