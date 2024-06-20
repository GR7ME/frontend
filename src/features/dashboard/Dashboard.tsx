import { Card, CardContent, CardDescription } from "@/components/ui/card";
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
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import LogCard from "@/components/logcontainer/LogContainer";
import {
  SeverityCountData,
  SeverityTextColor,
} from "@/types/SeverityColorType";
import { getSeverityLogs } from "./api/get-severity-logs";
import { getRecentLogs } from "./api/get-recent-logs";
import { getTotalLogs } from "./api/get-total-logs";
import { useToken } from "@/hooks/useToken";
import { getLastWeekLogs } from "./api/get-last-seven-days-logs";

const text_color: SeverityTextColor = {
  warn: "text-yellow-800",
  info: "text-green-800",
  error: "text-red-800",
};

const DashboardPage = () => {
  const [recentLogs, setRecentLogs] = useState([]);
  const [weekData, setWeekData] = useState([]);
  const [severityCountData, setSeverityCountData] = useState<SeverityCountData>(
    {
      warn: 0,
      info: 0,
      error: 0,
    },
  );
  const [totalLogs, setTotalLogs] = useState(0);
  const { token } = useToken();

  useEffect(() => {
    const setDatas = async () => {
      setRecentLogs(await getRecentLogs(token));
      setSeverityCountData(await getSeverityLogs(token));
      setTotalLogs(await getTotalLogs(token));
      setWeekData(await getLastWeekLogs(token));
    };
    setDatas();
  }, [token]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="w-full flex flex-wrap justify-between gap-2">
        <Card className="flex-grow min-w-[150px] p-2">
          <CardContent className="flex flex-col p-4">
            <CardDescription className="flex flex-col items-center">
              <Label className="text-6xl md:text-8xl text-black dark:text-white">
                {totalLogs}
              </Label>
              <Label className="text-xs">Total Logs</Label>
            </CardDescription>
          </CardContent>
        </Card>
        {severityCountData &&
          Object.entries(severityCountData).map((item,index) => {
            return (
              <Card className="flex-grow min-w-[150px] p-2" key={index}>
                <CardContent className="flex flex-col p-4">
                  <CardDescription className="flex flex-col items-center">
                    <Label
                      className={cn(
                        "text-6xl md:text-8xl",
                        text_color[
                          item[0].toLowerCase() as keyof SeverityTextColor
                        ],
                      )}
                    >
                      {item[1]}
                    </Label>
                    <Label className="text-xs">{item[0]}</Label>
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
      </div>
      <div className="flex flex-col gap-2 border rounded p-2">
        <Label className="text-xl">Analytics</Label>
        <Separator />
        <div className="flex flex-col gap-4 xl:flex-row justify-center">
          <div className="w-full xl:flex-1 h-72 rounded p-4">
            <Label className="text-xl opacity-75">Last 7 days</Label>
            <Separator className="my-2" />
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
                  dataKey="log_count"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="border rounded p-4 w-full xl:flex-1">
            <div>
              <Label className="text-xl opacity-75">Recent Logs</Label>
              <Separator className="my-2" />
              <div className="flex flex-col gap-2">
                {recentLogs &&
                  recentLogs.map((item, index) => (
                    <LogCard key={index} data={item} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
