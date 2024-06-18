import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CircleAlert, Info, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { monthlyData } from "@/utils/month_data";
import LogCard from "@/components/LogContainer/LogContainer";
import {
  getFilteredLogs,
  period_choice,
  severity_choice,
} from "@/services/log";
import { api } from "@/lib/api-client";

interface CustomTooltipProps {
  active: boolean | undefined;
  payload: { payload: { timestamp: number; entries_number: number } }[] | null | undefined;
  label: string | undefined;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
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

const LogPage = () => {
  // const [selectedTag, setSelectedTag] = useState("Query");
  const [data, setData] = useState([]);
  const [logGroupDetails, setLogGroupDetails] = useState([]);
  const [severity, setSeverity] = useState<severity_choice | "">("");
  const [period, setPeriod] = useState<period_choice | "">("");
  const [groupstream, setGroupStream] = useState("");
  const [logStreamName, setLogStreamName] = useState("");
  const [logGroupName, setLogGroupName] = useState("");

  const handlePeriod = (value: period_choice | "") => {
    setPeriod(value);
  };

  const handleSeverity = (value: severity_choice | "") => {
    setSeverity(value);
  };

  const handleGroupChange = (value: string) => {
    setGroupStream(value);
  };

  console.log("rendered");

  useEffect(() => {
    const getLogDetails = async () => {
      const response = await api.get("cloudwatch/logs/grouped/");
      console.log(response.data)
      setLogGroupDetails(response.data)
    };
    getLogDetails()
    if (groupstream) {
      const [group, stream] = groupstream.split(":");
      setLogGroupName(group || "");
      setLogStreamName(stream || "");
    }
  }, [groupstream]);

  useEffect(() => {
    const getLogs = async () => {
      try {
        const response = await getFilteredLogs({
          period: period,
          security_info: severity,
          logGroupName: logGroupName,
          logStreamName: logStreamName,
        });
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    getLogs();
  }, [severity, period, logGroupName, logStreamName]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex ">
        <Label>Log Explorer</Label>
      </div>

      <Separator className="mt-2" />

      <div className="flex gap-2 justify-end">
        <Select onValueChange={handlePeriod}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="last_hour">Last hour</SelectItem>
              <SelectItem value="last_day">Last day</SelectItem>
              <SelectItem value="last_week">Last week</SelectItem>
              <SelectItem value="last_month">Last month</SelectItem>
              {/* <SelectItem value="LSY">Last year</SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={handleSeverity}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="INFO">
                <div className="flex justify-center items-center gap-2">
                  <Info className="w-4 h-4 text-gray-700" />
                  Info
                </div>
              </SelectItem>
              <SelectItem value="WARN">
                <div className="flex justify-center items-center gap-2">
                  <CircleAlert className="w-4 h-4 text-yellow-700" />
                  Warning
                </div>
              </SelectItem>
              <SelectItem value="ERROR">
                <div className="flex justify-center items-center gap-2">
                  <TriangleAlert className="w-4 h-4 text-red-700" />
                  Error
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select onValueChange={handleGroupChange}>
          <SelectTrigger className="w-max">
            <SelectValue placeholder="Log Groups" />
          </SelectTrigger>
          <SelectContent>
            {logGroupDetails &&  logGroupDetails.map((data) =>
              <SelectGroup className="text-sm font-light">
                <SelectLabel>{data?.logGroupName}</SelectLabel>
                {data?.logStreams.map((value) => (
                  <SelectItem
                    key={value.logStreamName}
                    value={`${data?.logGroupName}:${value.logStreamName}`}
                  >
                    {value.logStreamName}
                  </SelectItem>
                ))}
              </SelectGroup>
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col mt-2 border rounded p-2">
        <Label className="text-sm font-normal opacity-75">
          Displaying 29,000 records
        </Label>
        <div className="w-full h-44 my-4">
          <ResponsiveContainer>
            <BarChart
              data={monthlyData}
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
              <Tooltip
                content={
                  <CustomTooltip
                    active={undefined}
                    payload={undefined}
                    label={undefined}
                  />
                }
              />
              <Legend />
              <Bar
                legendType="circle"
                dataKey="entries_number"
                fill="#8884d8"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Separator />
        {data && data.map((item) => <LogCard data={item} />)}
      </div>
    </div>
  );
};

export default LogPage;
