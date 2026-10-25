'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { api } from '../../services/api';

// Notification interface
interface Notification {
  _id: string;
  type: 'system' | 'account' | 'document' | 'alert';
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
  relatedId?: string;
}

interface NotificationsResponse {
  success: boolean;
  notifications: Notification[];
  meta: {
    total: number;
    unreadCount: number;
    offset: number;
    limit: number;
  };
}

export default function NotificationsPage() {
  // State for notifications
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'system' | 'account' | 'document' | 'alert'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError(null);

        // Build query parameters based on filter
        let queryParams = '';
        if (filter === 'unread') {
          queryParams = '?read=false';
        } else if (filter !== 'all') {
          queryParams = `?type=${filter}`;
        }

        const response = await api.get<NotificationsResponse>(`/notifications${queryParams}`);

        if (response.data.success) {
          setNotifications(response.data.notifications);
          setUnreadCount(response.data.meta.unreadCount);
        } else {
          setError('Failed to fetch notifications');
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Failed to fetch notifications. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [filter]);

  // Format the timestamp
  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  // Get the icon for the notification type
  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'system':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'account':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        );
      case 'document':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        );
    }
  };

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      const response = await api.put(`/notifications/${id}/read`);

      if (response.data.success) {
        setNotifications(prev => prev.map(notification => {
          if (notification._id === id) {
            return { ...notification, read: true };
          }
          return notification;
        }));

        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      const response = await api.put('/notifications/read-all');

      if (response.data.success) {
        setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
        setUnreadCount(0);
      }
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  // Delete a notification
  const deleteNotification = async (id: string) => {
    try {
      const response = await api.delete(`/notifications/${id}`);

      if (response.data.success) {
        const notificationToDelete = notifications.find(n => n._id === id);
        setNotifications(prev => prev.filter(notification => notification._id !== id));

        if (notificationToDelete && !notificationToDelete.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  // Clear all notifications
  const clearAllNotifications = async () => {
    try {
      const response = await api.delete('/notifications');

      if (response.data.success) {
        setNotifications([]);
        setUnreadCount(0);
      }
    } catch (err) {
      console.error('Error clearing all notifications:', err);
    }
  };

  return (
    <DashboardLayout title="Notifications">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-[#e7e5e1] pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">Neural Log</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tight text-[#10101A]">Notifications</h1>
            <p className="text-[#525252] mt-3 font-medium opacity-60">
              There are {unreadCount} unread transmissions in your archival queue.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={markAllAsRead}
              className="px-6 py-3 bg-[#F9F8F6] border border-[#e7e5e1] hover:bg-white hover:shadow-xl text-[#10101A] rounded-2xl transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-30"
              disabled={unreadCount === 0}
            >
              Acknowledge All
            </button>
            <button
              onClick={clearAllNotifications}
              className="px-6 py-3 rounded-2xl transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-30 btn-primary-gradient"
              disabled={notifications.length === 0}
            >
              Purge Archive
            </button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex overflow-x-auto space-x-3 mb-12 pb-4 scrollbar-hide">
          {['all', 'unread', 'system', 'account', 'document', 'alert'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab as 'all' | 'unread' | 'system' | 'account' | 'document' | 'alert')}
              className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap border transition-all duration-300 ${filter === tab
                ? 'btn-primary-gradient border-transparent shadow-xl'
                : 'bg-white border-[#e7e5e1] text-[#A0A0A0] hover:bg-[#F9F8F6] hover:border-black/10'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-t-gray-800"></div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-6 rounded-xl mb-8 flex items-center shadow-sm">
            <svg className="w-6 h-6 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Notifications list */}
        {!loading && !error && (
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification._id}
                  className={`bg-white border rounded-[2rem] p-8 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group mb-6 ${notification.read ? 'border-[#e7e5e1] opacity-70' : 'border-[#10101A] shadow-xl'
                    }`}
                >
                  <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                    <svg width="150" height="150" viewBox="0 0 100 100">
                      <pattern id={`grid-notif-${notification._id}`} width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                      </pattern>
                      <rect width="100" height="100" fill={`url(#grid-notif-${notification._id})`} />
                    </svg>
                  </div>

                  {!notification.read && (
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-black"></div>
                  )}

                  <div className="flex">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mr-8 transition-all duration-500 flex-shrink-0 ${notification.read ? 'bg-[#F9F8F6]' : 'bg-[#10101A] text-white shadow-xl rotate-3 group-hover:rotate-0'
                      }`}>
                      <div className="scale-125">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={`text-xl font-medium tracking-tight transition-all duration-500 ${notification.read ? 'text-[#10101A]/60' : 'text-[#10101A]'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="text-[#A0A0A0] text-[10px] font-bold uppercase tracking-[0.2em]">
                            {formatTimestamp(notification.createdAt)}
                          </span>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="text-[#A0A0A0] hover:text-black transition-colors duration-300 p-2 bg-[#F9F8F6] rounded-xl hover:shadow-md"
                                title="Mark as read"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification._id)}
                              className="text-[#A0A0A0] hover:text-[#E84C3D] transition-colors duration-300 p-2 bg-[#F9F8F6] rounded-xl hover:shadow-md"
                              title="Delete transmission"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className={`text-base font-medium leading-relaxed mb-6 opacity-60 ${notification.read ? 'text-[#525252]' : 'text-[#10101A]'}`}>
                        {notification.message}
                      </p>

                      {notification.relatedId && (
                        <div className="flex">
                          <a
                            href={`/dashboard/${notification.type === 'document' ? 'docs' : 'chats'}/${notification.relatedId}`}
                            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-black border-b border-black/10 hover:border-black pb-1 transition-all"
                          >
                            <span>Open Log</span>
                            <svg className="w-4 h-4 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm">
                <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-inner">
                  <svg className="w-12 h-12 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">All Clear!</h3>
                <p className="text-foreground/40 max-w-sm mx-auto font-medium">
                  {filter === 'all'
                    ? "You don't have any notifications at the moment. We'll let you know when something important happens."
                    : `No ${filter} notifications found matching your current filter.`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}