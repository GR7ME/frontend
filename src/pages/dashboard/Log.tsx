import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CircleAlert, Download, Info, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const loggroups: string[] = ["pyspark-1", "pyspark-2"];
const loggroups1: string[] = ["elastic-1", "elastic-2"];

const logGroup = [{
  log_group_name: "Pyspark",
  log_stream_name : ["pyspark-1", "pyspark-2"]
},
{
  log_group_name: "Elastic",
  log_stream_name : ["elastic-1", "elastic-2"]
}
]

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
import LogCard from "@/components/LogCard";
import { awslogs } from "@/utils/logs_mock";

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

const LogPage = () => {
  // const [selectedTag, setSelectedTag] = useState("Query");
  const [data, setData] = useState(() => awslogs);
  const [severity,setSeverity] = useState("")
  const [period,setPeriod] = useState("")
  // const [groupname,setGroupName] = useState("")
  const [groupstream,setGroupStream] = useState("")

  const handlePeriod = (value: string) => {
    setPeriod(value)
  }
  const handleSeverity = (value: string) => {
    setSeverity(value)
  }
  const handleGroupChange = (value: string) => {
    setGroupStream(value)
    console.log(value)
  }

  useEffect(function filterapi(){
    console.log(severity,period,groupstream)
  },[severity,period,groupstream])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex ">
        <Label>Log Explorer</Label>
        {/* <Download className="w-4 h-4 mr-2" /> */}
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
              <SelectItem value="last_24_hours">Last 24 hrs</SelectItem>
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
              <SelectItem value="info">
                <div className="flex justify-center items-center gap-2">
                  <Info className="w-4 h-4 text-gray-700" />
                  Info
                </div>
              </SelectItem>
              <SelectItem value="warn">
                <div className="flex justify-center items-center gap-2">
                  <CircleAlert className="w-4 h-4 text-yellow-700" />
                  Warning
                </div>
              </SelectItem>
              <SelectItem value="error">
                <div className="flex justify-center items-center gap-2">
                  <TriangleAlert className="w-4 h-4 text-red-700" />
                  Error
                </div>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
          <Select onValueChange={handleGroupChange} >
            <SelectTrigger className="w-max">
              <SelectValue placeholder="Log Groups" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="text-sm font-light">
                <SelectLabel>Pyspark</SelectLabel>
                {logGroup[0].log_stream_name.map((value) => (
                  <SelectItem key={value} value={`${logGroup[0].log_group_name}:${value}`}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup className="text-sm font-light">
                <SelectLabel>Elastic</SelectLabel>
                {logGroup[1].log_stream_name.map((value) => (
                  <SelectItem key={value} value={`${logGroup[1].log_group_name}:${value}`}>
                    {value}
                  </SelectItem>
                ))}
              </SelectGroup>
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
