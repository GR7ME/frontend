type Logs = {
  timestamp: string;
  message: string;
  ingestionTime: number;
};

interface KibanaEvent extends Logs {
  process: {
    pid: number;
    uptime: number;
  };
  trace: {
    id: string;
  };
  transaction: {
    id: string;
  };
}


type Kibanalogs = {
  logGroupName: string;
  logStreamName: string;
  logEvents: KibanaEvent[];
};


type elasticlogs = {
  logGroupName: string;
  logStreamName: string;
  logEvents: Logs[]
}

export const awslogs = [
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:05.850+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-observability.logs.alerts-default-index-template] for index patterns [.internal.alerts-observability.logs.alerts-default-*]",
        ingestionTime: 1623324425850,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:05.889+05:45",
        message:
          "[WARN ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-observability.uptime.alerts-default-index-template] for index patterns [.internal.alerts-observability.uptime.alerts-default-*]",
        ingestionTime: 1623324425889,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:11.506+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-observability.slo.alerts-default-index-template] for index patterns [.internal.alerts-observability.slo.alerts-default-*]",
        ingestionTime: 1623324431506,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:15.969+05:45",
        message:
          "[WARN ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-ml.anomaly-detection-health.alerts-default-index-template] for index patterns [.internal.alerts-ml.anomaly-detection-health.alerts-default-*]",
        ingestionTime: 1623324435969,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.009+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-ml.anomaly-detection.alerts-default-index-template] for index patterns [.internal.alerts-ml.anomaly-detection.alerts-default-*]",
        ingestionTime: 1623324436009,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.022+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-transform.health.alerts-default-index-template] for index patterns [.internal.alerts-transform.health.alerts-default-*]",
        ingestionTime: 1623324436022,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.038+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-observability.apm.alerts-default-index-template] for index patterns [.internal.alerts-observability.apm.alerts-default-*]",
        ingestionTime: 1623324436038,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.052+05:45",
        message:
          "[ERROR ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-stack.alerts-default-index-template] for index patterns [.internal.alerts-stack.alerts-default-*]",
        ingestionTime: 1623324436052,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.066+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-observability.uptime.alerts-default-index-template] for index patterns [.internal.alerts-observability.uptime.alerts-default-*]",
        ingestionTime: 1623324436066,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.072+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-observability.metrics.alerts-default-index-template] for index patterns [.internal.alerts-observability.metrics.alerts-default-*]",
        ingestionTime: 1623324436072,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.134+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-observability.logs.alerts-default-index-template] for index patterns [.internal.alerts-observability.logs.alerts-default-*]",
        ingestionTime: 1623324436134,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.224+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-security.alerts-default-index-template] for index patterns [.internal.alerts-security.alerts-default-*]",
        ingestionTime: 1623324436224,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.269+05:45",
        message:
          "[INFO ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-observability.threshold.alerts-default-index-template] for index patterns [.internal.alerts-observability.threshold.alerts-default-*]",
        ingestionTime: 1623324436269,
      },
      {
        logGroupName: "elasticlogs",
        logStreamName: "gr7me",
        owner: "1",
        timestamp: "2024-06-10T12:47:16.431+05:45",
        message:
          "[ERROR ][o.e.c.m.MetadataIndexTemplateService] [gr7me] updating index template [.alerts-ml.anomaly-detection-health.alerts-default-index-template] for index patterns [.internal.alerts-ml.anomaly-detection-health.alerts-default-*]",
        ingestionTime: 1623324436431,
      },
];



export const kibanalogs = [
      {
        logGroupName: "kibana",
        logStreamName: "kibana-1",
        owner: "1",
        timestamp: "2024-06-10T12:47:23.182+05:45",
        message: "Fleet Usage: {\"agents_enabled\":true,\"agents\":{\"total_enrolled\":0,\"healthy\":0,\"unhealthy\":0,\"offline\":0,\"inactive\":0,\"unenrolled\":0,\"total_all_statuses\":0,\"updating\":0},\"fleet_server\":{\"total_all_statuses\":0,\"total_enrolled\":0,\"healthy\":0,\"unhealthy\":0,\"offline\":0,\"updating\":0,\"inactive\":0,\"unenrolled\":0,\"num_host_urls\":0},\"license_issued_to\":\"elasticsearch\"}",
        ingestionTime: 1623324436182
      },
      {
        logGroupName: "kibana",
        logStreamName: "kibana-1",
        owner: "1",
        timestamp: "2024-06-10T13:02:26.278+05:45",
        message: "Fleet Usage: {\"agents_enabled\":true,\"agents\":{\"total_enrolled\":0,\"healthy\":0,\"unhealthy\":0,\"offline\":0,\"inactive\":0,\"unenrolled\":0,\"total_all_statuses\":0,\"updating\":0},\"fleet_server\":{\"total_all_statuses\":0,\"total_enrolled\":0,\"healthy\":0,\"unhealthy\":0,\"offline\":0,\"updating\":0,\"inactive\":0,\"unenrolled\":0,\"num_host_urls\":0},\"license_issued_to\":\"elasticsearch\"}",
        ingestionTime: 1623325946278
      },
      {
        logGroupName: "kibana",
        logStreamName: "kibana-1",
        owner: "1",
        timestamp: "2024-06-10T13:17:29.292+05:45",
        message: "Fleet Usage: {\"agents_enabled\":true,\"agents\":{\"total_enrolled\":0,\"healthy\":0,\"unhealthy\":0,\"offline\":0,\"inactive\":0,\"unenrolled\":0,\"total_all_statuses\":0,\"updating\":0},\"fleet_server\":{\"total_all_statuses\":0,\"total_enrolled\":0,\"healthy\":0,\"unhealthy\":0,\"offline\":0,\"updating\":0,\"inactive\":0,\"unenrolled\":0,\"num_host_urls\":0},\"license_issued_to\":\"elasticsearch\"}",
        ingestionTime: 1623326849292
      },
      {
        logGroupName: "kibana",
        logStreamName: "kibana-1",
        owner: "1",
        timestamp: "2024-06-10T13:32:32.414+05:45",
        message: "Fleet Usage: {\"agents_enabled\":true,\"agents\":{\"total_enrolled\":0,\"healthy\":0,\"unhealthy\":0,\"offline\":0,\"inactive\":0,\"unenrolled\":0,\"total_all_statuses\":0,\"updating\":0},\"fleet_server\":{\"total_all_statuses\":0,\"total_enrolled\":0,\"healthy\":0,\"unhealthy\":0,\"offline\":0,\"updating\":0,\"inactive\":0,\"unenrolled\":0,\"num_host_urls\":0},\"license_issued_to\":\"elasticsearch\"}",
        ingestionTime: 1623327752414
      },
      {
        logGroupName: "kibana",
        logStreamName: "kibana-1",
        owner: "1",
        timestamp: "2024-06-10T13:47:08.416+05:45",
        message: "no endpoint installation found",
        ingestionTime: 1623328428416
      },
      {
        logGroupName: "kibana",
        logStreamName: "kibana-1",
        owner: "1",
        timestamp: "2024-06-10T13:47:11.397+05:45",
        message: "Running Fleet Usage telemetry send task",
        ingestionTime: 1623328431397
      }
    ]