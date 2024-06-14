import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CircleAlert, Download, Info, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex ">
        <Label>Log Explorer</Label>
        {/* <Download className="w-4 h-4 mr-2" /> */}
      </div>

      <Separator className="mt-2" />

      {/* <div>
        <ul className="text-sm flex gap-4 relative transition ease-in-out">
          <li
            onClick={() => setSelectedTag("Query")}
            className={cn(
              "cursor-pointer p-2",
              selectedTag === "Query" ? "text-blue-500 border-b-2" : "",
            )}
          >
            Query
          </li>
          <li
            onClick={() => setSelectedTag("Saved")}
            className={cn(
              "cursor-pointer p-2",
              selectedTag === "Saved" ? "text-blue-500 border-b-2" : "",
            )}
          >
            Saved
          </li>
          <li
            onClick={() => setSelectedTag("Recent")}
            className={cn(
              "cursor-pointer p-2",
              selectedTag === "Recent" ? "text-blue-500 border-b-2" : "",
            )}
          >
            Recent
          </li>
          <div className="absolute"></div>
        </ul>
      </div> */}

      {/* <div className="flex gap-4">
        <Input className="" />
        <Button>Run</Button>
      </div> */}

      <div className="flex gap-2 justify-end">
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="LSH">Last hour</SelectItem>
              <SelectItem value="LSW">Last week</SelectItem>
              <SelectItem value="LSM">Last month</SelectItem>
              <SelectItem value="LSY">Last year</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
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
        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Logs Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="spark">Pyspark</SelectItem>
              <SelectItem value="es">ElasticSearch</SelectItem>
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

      {/* <div className="w-full border">
        <LogTable />
      </div> */}
      <div className="flex flex-col gap-2">
        <Separator />
        {data && data.map((item) => <LogCard data={item} />)}
      </div>
    </div>
  );
};

export default LogPage;
