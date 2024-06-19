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
import { useEffect, useState } from "react";

import downTrend from "@/assets/downtrend.svg";
import upTrend from "@/assets/uptrend.svg";
import { weekData } from "@/utils/week_data";
import { Separator } from "@/components/ui/separator";
import LogCard from "@/components/LogContainer/LogContainer";
import { api } from "@/lib/api-client";


const DashboardPage = () => {
  const [data, setData] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);

  useEffect(() => {
    const getRecentLogs = async () => {
      const result = await api.get("/cloudwatch/recent-logs");
      setData(result.data);
    };

    getRecentLogs();

    const getTotalLogs = async () => {
      const result = await api.get("/cloudwatch/total-logs-count/");
      setTotalLogs(result.data.total_logs_count);
    };

    getTotalLogs();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="w-full flex flex-wrap justify-between gap-2">
        <Card className="flex-grow min-w-[150px] p-2">
          <CardContent className="flex flex-col p-4">
            <CardDescription className="flex flex-col items-center">
              <Label className="text-6xl md:text-8xl text-black">{totalLogs}</Label>
              <Label className="text-xs">Total Logs</Label>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="flex-grow min-w-[150px] p-2">
          <CardContent className="flex flex-col p-4 ">
            <CardDescription className="flex flex-col items-center">
              <Label className="text-6xl md:text-8xl text-yellow-800">{totalLogs}</Label>
              <Label className="text-xs">Warn</Label>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="flex-grow min-w-[150px] p-2">
          <CardContent className="flex flex-col p-4">
            <CardDescription className="flex flex-col items-center">
              <Label className="text-6xl md:text-8xl text-red-800">{totalLogs}</Label>
              <Label className="text-xs">Error</Label>
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="flex-grow min-w-[150px] p-2">
          <CardContent className="flex flex-col p-4">
            <CardDescription className="flex flex-col items-center">
              <Label className="text-6xl md:text-8xl text-green-800">{totalLogs}</Label>
              <Label className="text-xs">Info</Label>
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col gap-2 border rounded p-2">
        <Label className="text-xl">Analytics</Label>
        <Separator />
        <div className="flex flex-col gap-2 xl:flex-row">
          <div className="w-full xl:flex-1 h-64 my-4">
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
          <div className="border rounded p-4 w-full xl:flex-1">
            <div>
              <Label className="text-xl">Recent Logs</Label>
              <Separator className="my-2" />
              <div className="flex flex-col gap-2">
                {data && data.map((item, index) => <LogCard key={index} data={item} />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
