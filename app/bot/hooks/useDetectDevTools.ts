"use client";
import { useState, useRef, useCallback } from "react";
import { detectDevTools } from "../utils/detectDevTools";

type Status = "waiting" | "open" | "closed";

export function useDetectDevTools(intervalMs = 1000) {
  const [status, setStatus] = useState<Status>("waiting");
  const [isDetecting, setIsDetecting] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const detectingRef = useRef(false); // <- 标记当前是否正在检测

  const startDetection = useCallback(() => {
    if (detectingRef.current) return;
    setIsDetecting(true);
    detectingRef.current = true;
    setStatus("waiting");

    intervalRef.current = setInterval(async () => {
      if (!detectingRef.current) return; // 已停止检测则不更新状态

      const isOpen = await detectDevTools();
      if (!detectingRef.current) return; // 再次检查
      setStatus(isOpen ? "open" : "closed");
    }, intervalMs);
  }, [intervalMs]);

  const stopDetection = useCallback(() => {
    setIsDetecting(false);
    detectingRef.current = false; // <- 停止检测
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setStatus("waiting");
  }, []);

  const toggleDetection = useCallback(() => {
    if (isDetecting) stopDetection();
    else startDetection();
  }, [isDetecting, startDetection, stopDetection]);

  return {
    status,
    isDetecting,
    startDetection,
    stopDetection,
    toggleDetection,
  };
}
