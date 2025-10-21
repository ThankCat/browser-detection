"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
  },
];
export default function ClientHintsPage() {
  return (
    <div>
      <div className="flex justify-center min-h-screen pt-24">
        <div className="flex flex-col gap-4 text-left w-full max-w-xl lg:max-w-5xl">
          <h1 className="text-5xl font-bold">Client Hints</h1>
          <p className="text-ms">
            Client Hints 是一组 HTTP 标头和 JavaScript API,
            允许网络浏览器向网络服务器发送有关客户端设备和浏览器的详细信息。它们旨在成为
            User-Agent
            的后继者，并为网络服务器提供一种标准化的方式来优化客户端内容，而无需依赖不可靠的基于
            User-Agent 字符串的检测或浏览器指纹识别技术
          </p>
          <Table>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell className="text-right">
                    {invoice.paymentStatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
