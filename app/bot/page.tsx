"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDetectDevTools } from "./hooks/useDetectDevTools";

export default function BotPage() {
  const { status, isDetecting, toggleDetection } = useDetectDevTools(1000);

  const statusText = {
    waiting: "等待开始检测",
    open: "已打开",
    closed: "未打开",
  };

  const statusColor = {
    waiting: "text-black",
    open: "text-red-500",
    closed: "text-green-500",
  };

  return (
    <div className="flex justify-center min-h-screen pt-24">
      <div className="flex flex-col gap-4 text-left w-full max-w-md">
        <h1 className="text-5xl font-bold">Bot Detection</h1>
        <p className="text-2xl font-bold">机器人检测</p>

        {/* 开发者工具检测 */}
        <Card>
          <CardHeader>
            <CardTitle>开发者工具检测</CardTitle>
            <CardDescription>
              点击开始检测，可以实时检测是否打开了开发者工具(F12)。再次点击可以停止检测。
            </CardDescription>
          </CardHeader>

          <CardContent>
            <p className={statusColor[status]}>{statusText[status]}</p>
          </CardContent>

          <CardFooter>
            <Button
              onClick={toggleDetection}
              className={isDetecting ? "bg-red-500 hover:bg-red-600" : ""}
            >
              {isDetecting ? "停止检测" : "开始检测"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
