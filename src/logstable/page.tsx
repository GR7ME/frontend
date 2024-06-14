import { log , columns } from "./columns"
import { DataTable } from "./data-table"

const getData = (): log[] => {

    return [
    {
      log_id: "102938",
      message: "System boot completed",
      timestamp: "2024-06-10T01:00:00Z",
      severity: "INFO",
    },
    {
      log_id: "293847",
      message: "User 'john' logged in",
      timestamp: "2024-06-10T01:05:32Z",
      severity: "INFO",
    },
    {
      log_id: "394857",
      message: "Failed password for 'admin' from 192.168.1.1 port 22 ssh2",
      timestamp: "2024-06-10T01:08:15Z",
      severity: "WARN",
    },
    {
      log_id: "485769",
      message: "Disk space running low on /dev/sda1",
      timestamp: "2024-06-10T01:12:45Z",
      severity: "WARN",
    },
    {
      log_id: "576980",
      message: "Package 'nginx' installed successfully",
      timestamp: "2024-06-10T01:15:30Z",
      severity: "INFO",
    },
    {
      log_id: "667091",
      message: "Kernel panic - not syncing: Fatal exception",
      timestamp: "2024-06-10T01:20:05Z",
      severity: "ERROR",
    },
    {
      log_id: "758102",
      message: "User 'mary' added to group 'sudo'",
      timestamp: "2024-06-10T01:25:18Z",
      severity: "INFO",
    },
    {
      log_id: "849213",
      message: "SSH connection from 203.0.113.5 established",
      timestamp: "2024-06-10T01:30:47Z",
      severity: "INFO",
    },
    {
      log_id: "930324",
      message: "Firewall rule added: allow 80/tcp",
      timestamp: "2024-06-10T01:35:50Z",
      severity: "INFO",
    },
    {
      log_id: "021435",
      message: "User 'john' logged out",
      timestamp: "2024-06-10T01:40:23Z",
      severity: "INFO",
    },
    {
      log_id: "112546",
      message: "Cron job 'backup.sh' started",
      timestamp: "2024-06-10T01:45:10Z",
      severity: "INFO",
    },
    {
      log_id: "203657",
      message: "Network interface 'eth0' link down",
      timestamp: "2024-06-10T01:50:30Z",
      severity: "ERROR",
    },
    {
      log_id: "294768",
      message: "Network interface 'eth0' link up",
      timestamp: "2024-06-10T01:52:00Z",
      severity: "INFO",
    },
    {
      log_id: "385879",
      message: "Unauthorized access attempt detected",
      timestamp: "2024-06-10T01:55:45Z",
      severity: "WARN",
    },
    {
      log_id: "476980",
      message: "System update completed",
      timestamp: "2024-06-10T02:00:00Z",
      severity: "INFO",
    },
    {
      log_id: "567091",
      message: "High memory usage detected",
      timestamp: "2024-06-10T02:05:30Z",
      severity: "WARN",
    },
    {
      log_id: "658102",
      message: "User 'admin' logged in",
      timestamp: "2024-06-10T02:10:00Z",
      severity: "INFO",
    },
    {
      log_id: "749213",
      message: "Failed to start service 'mysql'",
      timestamp: "2024-06-10T02:15:20Z",
      severity: "ERROR",
    },
    {
      log_id: "830324",
      message: "Service 'apache2' restarted",
      timestamp: "2024-06-10T02:20:10Z",
      severity: "INFO",
    },
    {
      log_id: "921435",
      message: "Configuration file '/etc/nginx/nginx.conf' modified",
      timestamp: "2024-06-10T02:25:00Z",
      severity: "INFO",
    },
    {
      log_id: "012546",
      message: "User 'mary' changed password",
      timestamp: "2024-06-10T02:30:45Z",
      severity: "INFO",
    },
    {
      log_id: "103657",
      message: "Database backup completed",
      timestamp: "2024-06-10T02:35:30Z",
      severity: "INFO",
    },
    {
      log_id: "194768",
      message: "User 'john' account locked due to multiple failed login attempts",
      timestamp: "2024-06-10T02:40:15Z",
      severity: "WARN",
    },
    {
      log_id: "285879",
      message: "Service 'docker' started",
      timestamp: "2024-06-10T02:45:00Z",
      severity: "INFO",
    },
    {
      log_id: "376980",
      message: "CPU temperature high",
      timestamp: "2024-06-10T02:50:45Z",
      severity: "WARN",
    },
    {
      log_id: "467091",
      message: "User 'admin' logged out",
      timestamp: "2024-06-10T02:55:30Z",
      severity: "INFO",
    },
    {
      log_id: "558102",
      message: "Filesystem check completed on /dev/sda1",
      timestamp: "2024-06-10T03:00:00Z",
      severity: "INFO",
    },
    {
      log_id: "649213",
      message: "Kernel module 'ext4' loaded",
      timestamp: "2024-06-10T03:05:20Z",
      severity: "INFO",
    },
    {
      log_id: "730324",
      message: "Failed to mount NFS share",
      timestamp: "2024-06-10T03:10:45Z",
      severity: "ERROR",
    },
    {
      log_id: "821435",
      message: "User 'mary' added SSH key",
      timestamp: "2024-06-10T03:15:30Z",
      severity: "INFO",
    }
  ]  

}

const LogTable = () => {
  const data = getData()

  return (
      <DataTable columns={columns} data={data} />
  )
}

export default LogTable;