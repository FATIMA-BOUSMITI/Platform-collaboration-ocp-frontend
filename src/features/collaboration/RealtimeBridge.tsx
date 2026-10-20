import { refreshUnreadCount, useUnreadCount } from "../notifications/inbox";
import { useEffect } from "react";
import { Client } from "@stomp/stompjs";
import { toast } from "sonner";
import { useAuthStore, decodeUserFromToken } from "../auth/AuthStore";
import { getValidAccessToken } from "../../api/axiosClient";
import { dispatchRealtime, useRealtime } from "./realtime";
export default function RealtimeBridge() {
  const userId = useAuthStore((s) => s.user?.userId);
  useEffect(() => {
    toast.dismiss();
    useRealtime.setState({connected:false,signal:null});
    useUnreadCount.getState().set(0);
    if (!userId) {
      useUnreadCount.getState().set(0);
      return;
    }
    void refreshUnreadCount().catch(() => {});
    let active = true;
    let renewal: ReturnType<typeof setTimeout> | undefined;
    let retry: ReturnType<typeof setTimeout> | undefined;
    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:9000/api";
    const url = new URL("/ws", new URL(apiURL, window.location.origin));
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    const client = new Client({
      brokerURL: import.meta.env.VITE_WS_URL || url.href,
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      connectionTimeout: 10000,
    });
    client.beforeConnect = async () => {
      clearTimeout(retry);
      try {
        const token=await getValidAccessToken();
        if(!active||useAuthStore.getState().user?.userId!==userId)return;
        client.connectHeaders={Authorization:"Bearer "+token};
        clearTimeout(renewal);
        renewal=setTimeout(()=>{if(active)void client.deactivate().then(()=>{if(active)client.activate();});},Math.max(1000,decodeUserFromToken(token).exp*1000-Date.now()-30000));
      } catch {
        useRealtime.getState().setConnected(false);
        await client.deactivate();
        if(active&&useAuthStore.getState().user?.userId===userId)retry=setTimeout(()=>{if(active)client.activate();},5000);
      }
    };
    client.onConnect = () => {
      if (!active) return;
      useRealtime.getState().setConnected(true);
      dispatchRealtime({ kind: "connected" });
      for (const queue of ["messages", "notifications"])
        client.subscribe("/user/queue/" + queue, (message) => {
          if(!active||useAuthStore.getState().user?.userId!==userId)return;
          try {
            const signal = JSON.parse(message.body);
            dispatchRealtime(signal);
            if (
              signal.kind === "notification" ||
              signal.kind === "notification-state"
            )
              void refreshUnreadCount().catch(() => {});
            if (signal.kind === "notification" && signal.notification)
              toast(signal.notification.title, {
                description: signal.notification.body,
                action: signal.notification.link?.startsWith("/")
                  ? {
                      label: "Ouvrir",
                      onClick: () =>
                        window.location.assign(signal.notification.link),
                    }
                  : undefined,
              });
          } catch {
            /* Ignore malformed frames; HTTP remains the canonical history. */
          }
        });
    };
    client.onWebSocketClose = () => {
      if (active) useRealtime.getState().setConnected(false);
    };
    client.onStompError = () => {
      if (active) useRealtime.getState().setConnected(false);
    };
    client.activate();
    return () => {
      active = false;
      clearTimeout(renewal);
      clearTimeout(retry);
      useRealtime.getState().setConnected(false);
      void client.deactivate();
    };
  }, [userId]);
  return null;
}
