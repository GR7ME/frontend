import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  CircleAlert,
  Info,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";
import { useState } from "react";

import downTrend from "@/assets/downtrend.svg";
import upTrend from "@/assets/uptrend.svg";
import { weekData } from "@/utils/week_data";
import { recent_logs } from "@/utils/recent_logs";
import { Separator } from "@/components/ui/separator";
import LogCard from "@/components/LogCard";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { timestamp, entries_number } = payload[0].payload;
    return (
      <div className="text-xs custom-tooltip p-4 border shadow bg-white dark:bg-white dark:text-black rounded">
        <p>{new Date(timestamp).toString()}</p>
        <p className="text-[#8884d8]">Entries: {entries_number}</p>
      </div>
    );
  }

  return null;
};

const severityIcons = {
  warn: <CircleAlert className="w-4 h-4 text-yellow-700" />,
  error: <TriangleAlert className="w-4 h-4 text-red-700" />,
  info: <Info className="w-4 h-4 text-gray-700" />,
};

const DashboardPage = () => {
  const [data, setData] = useState(() => recent_logs);
  const [products, setProducts] = useState([]);
  const [isuptrend, setIsUptrend] = useState(false);
  // const Total = countTotal(data);
  // console.log(Total);

  console.log(products);
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="w-full flex justify-between gap-2">
        <Card className="w-max">
          <CardHeader>
            <div className="flex gap-4">
              <div className="flex gap-4 h-max">
                <CardTitle className="text-xl">Total Logs</CardTitle>
                <div
                  className={cn(
                    "border flex gap-2 px-1 rounded items-center opacity-75 dark:opacity-100",
                    isuptrend
                      ? "text-green-700 border-green-700 bg-green-100 dark:bg-white dark:border-white"
                      : "text-red-700 border-red-700 bg-red-100 dark:bg-white dark:border-white",
                  )}
                >
                  {isuptrend ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <Label className="dark:text-red">75%</Label>
                </div>
              </div>
              <div>
                <img src={isuptrend ? upTrend : downTrend} alt="downtrend" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col">
            <CardDescription>
              <Label className="text-4xl">90,000</Label>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-2 border rounded p-2">
        <Label className="text-xl">Analytics</Label>
        <Separator />
        <div className="flex gap-2">
          <div className="w-full h-64 my-4">
            <ResponsiveContainer>
              <LineChart
                data={weekData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey={(data) => {
                    const new_data = new Date(data.timestamp);
                    return new_data.getDate();
                  }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="entries_number"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="border rounded p-4">
            <div>
              <Label className="text-xl">Recent Logs</Label>
              <Separator className="my-2"/>
              <div className="flex flex-col gap-2">
                {data && data.map((item) => <LogCard data={item} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
