"use client";

import React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { usePlatform } from "@/lib/platform-context";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  Trash2,
  CheckCheck,
} from "lucide-react";

export default function PlatformNotifications() {
  const { userId, hasConvexUser } = usePlatform();

  const notifications = useQuery(
    api.notifications.getByUser,
    hasConvexUser && userId ? { userId: userId as any } : "skip"
  );

  const markRead = useMutation(api.notifications.markAsRead);
  const markAllRead = useMutation(api.notifications.markAllAsRead);

  const unreadCount = (notifications || []).filter((n) => !n.read).length;

  const handleMarkAllRead = async () => {
    if (!userId) return;
    await markAllRead({ userId: userId as any });
  };

  const handleMarkRead = async (notifId: string) => {
    await markRead({ notificationId: notifId as any });
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "verification_result":
        return <CheckCircle2 className="w-5 h-5 text-up" />;
      case "order_filled":
        return <CheckCircle2 className="w-5 h-5 text-brand-500" />;
      case "retirement_complete":
        return <CheckCircle2 className="w-5 h-5 text-brand-500" />;
      case "project_created":
        return <Info className="w-5 h-5 text-info" />;
      case "document_uploaded":
        return <Info className="w-5 h-5 text-info" />;
      default:
        return <Bell className="w-5 h-5 text-ink-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-brand-500 font-bold uppercase tracking-widest font-mono">
              Alerts
            </span>
            <Bell className="w-4 h-4 text-brand-500" />
          </div>
          <h1 className="text-2xl font-bold text-ink-900">Notifications</h1>
          <p className="text-sm text-ink-500 mt-1">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "All caught up!"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="px-4 py-2 bg-brand-50 text-brand-500 border border-brand-500/20 rounded-lg text-sm font-medium hover:bg-brand-100 transition-colors flex items-center gap-2"
          >
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>

      {!notifications || notifications.length === 0 ? (
        <div className="bg-white border border-ink-300 rounded-lg p-12 text-center">
          <Bell className="w-12 h-12 text-ink-300 mx-auto mb-3" />
          <p className="text-sm font-semibold text-ink-900">No notifications yet</p>
          <p className="text-xs text-ink-500 mt-1">
            Notifications will appear here when activity happens
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((notif) => (
            <div
              key={notif._id}
              onClick={() => !notif.read && handleMarkRead(notif._id)}
              className={`bg-white border rounded-lg p-4 flex items-start gap-4 transition-colors cursor-pointer ${
                notif.read
                  ? "border-ink-300"
                  : "border-brand-500/30 bg-brand-50/30 hover:bg-brand-50/50"
              }`}
            >
              <div className="mt-0.5">{getIcon(notif.type)}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold text-ink-900">
                    {notif.title}
                  </p>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-brand-500 flex-shrink-0" />
                  )}
                </div>
                <p className="text-sm text-ink-500 mt-0.5">{notif.message}</p>
                <p className="text-xs text-ink-500 mt-1">
                  {new Date(notif.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}