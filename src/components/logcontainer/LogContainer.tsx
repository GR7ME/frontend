import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import LogCard from "../logcard/LogCard";
import { Severity } from "@/types/Log-type";
import { jsonData } from "@/types/logs";

const bordercolor: Record<Severity, string> = {
  WARN: "border-yellow-400",
  ERROR: "border-red-700",
  INFO: "border-green-700",
};

const LogContainer = ({ data }: jsonData) => {
  const [isClicked, setIsClicked] = useState(false);
  const [severity, setSeverity] = useState<Severity>("INFO");

  const contentRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");
  const onClicked = () => {
    setIsClicked(!isClicked);
  };

  useEffect(() => {
    const regexResult = data.message.match(/(WARN|INFO|ERROR)/);
    const extractedSeverity = regexResult
      ? (regexResult[0] as Severity)
      : "INFO";
    setSeverity(extractedSeverity);

    if (isClicked) {
      setMaxHeight(`${contentRef.current?.scrollHeight}px`);
    } else {
      setMaxHeight("0px");
    }
  }, [data.message, isClicked]);

  return (
    data && (
      <div
        className={cn(
          "border-l-4",
          bordercolor[severity],
          "flex flex-col w-full max-w-full h-max p-2 text-black gap-2 dark:text-white cursor-pointer text-sm transition-all duration-300",
        )}
        onClick={onClicked}
      >
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1">
            {isClicked ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
            <span className="truncate">{data.timestamp}</span>
          </div>
          <div className="flex-grow truncate md:truncate w-64">
            {data.message}
          </div>
        </div>
        <div
          ref={contentRef}
          className={cn(
            "overflow-hidden transition-max-height duration-300 ease-in-out",
            isClicked ? "max-h-[500px]" : "max-h-0",
          )}
          style={{ maxHeight }}
        >
          <LogCard key={data.id} severity={severity} jsonData={data} />
        </div>
      </div>
    )
  );
};

export default LogContainer;
