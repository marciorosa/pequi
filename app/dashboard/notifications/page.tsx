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
          setError('Falha ao carregar as notificações');
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError('Falha ao carregar as notificações. Tente novamente mais tarde.');
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
      return 'Agora mesmo';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `há ${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `há ${hours} ${hours === 1 ? 'hora' : 'horas'}`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `há ${days} ${days === 1 ? 'dia' : 'dias'}`;
    } else {
      return date.toLocaleDateString('pt-BR', { month: 'short', day: 'numeric', year: 'numeric' });
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
    <DashboardLayout title="Notificações">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-castanha-200 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cerrado-950/5 border border-cerrado-900/5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-cerrado-950/40 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40">Registro neural</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tight text-ink">Notificações</h1>
            <p className="text-castanha-600 mt-3 font-medium opacity-60">
              Há {unreadCount} mensagens não lidas na sua fila de arquivo.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={markAllAsRead}
              className="px-6 py-3 bg-castanha-50 border border-castanha-200 hover:bg-white hover:shadow-xl text-ink rounded-2xl transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-30"
              disabled={unreadCount === 0}
            >
              Marcar todas como lidas
            </button>
            <button
              onClick={clearAllNotifications}
              className="px-6 py-3 rounded-2xl transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-30 btn-primary-gradient"
              disabled={notifications.length === 0}
            >
              Limpar arquivo
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
                : 'bg-white border-castanha-200 text-castanha-400 hover:bg-castanha-50 hover:border-cerrado-900/10'
                }`}
            >
              {({ all: 'todas', unread: 'não lidas', system: 'sistema', account: 'conta', document: 'documentos', alert: 'alertas' } as Record<string, string>)[tab] ?? tab}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-castanha-100 border-t-gray-800"></div>
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
                  className={`bg-white border rounded-[2rem] p-8 transition-all duration-500 hover:shadow-2xl relative overflow-hidden group mb-6 ${notification.read ? 'border-castanha-200 opacity-70' : 'border-cerrado-900 shadow-xl'
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
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-cerrado-900"></div>
                  )}

                  <div className="flex">
                    <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mr-8 transition-all duration-500 flex-shrink-0 ${notification.read ? 'bg-castanha-50' : 'bg-cerrado-900 text-white shadow-xl rotate-3 group-hover:rotate-0'
                      }`}>
                      <div className="scale-125">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={`text-xl font-medium tracking-tight transition-all duration-500 ${notification.read ? 'text-ink/60' : 'text-ink'}`}>
                          {notification.title}
                        </h3>
                        <div className="flex items-center gap-4">
                          <span className="text-castanha-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                            {formatTimestamp(notification.createdAt)}
                          </span>
                          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="text-castanha-400 hover:text-ink transition-colors duration-300 p-2 bg-castanha-50 rounded-xl hover:shadow-md"
                                title="Marcar como lida"
                              >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification._id)}
                              className="text-castanha-400 hover:text-[#E84C3D] transition-colors duration-300 p-2 bg-castanha-50 rounded-xl hover:shadow-md"
                              title="Excluir mensagem"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      <p className={`text-base font-medium leading-relaxed mb-6 opacity-60 ${notification.read ? 'text-castanha-600' : 'text-ink'}`}>
                        {notification.message}
                      </p>

                      {notification.relatedId && (
                        <div className="flex">
                          <a
                            href={`/dashboard/${notification.type === 'document' ? 'docs' : 'chats'}/${notification.relatedId}`}
                            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-ink border-b border-cerrado-900/10 hover:border-cerrado-900 pb-1 transition-all"
                          >
                            <span>Abrir registro</span>
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
              <div className="bg-white border border-castanha-100 rounded-3xl p-16 text-center shadow-sm">
                <div className="w-24 h-24 rounded-full bg-castanha-50 flex items-center justify-center mx-auto mb-6 border border-castanha-100 shadow-inner">
                  <svg className="w-12 h-12 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Tudo em dia!</h3>
                <p className="text-foreground/40 max-w-sm mx-auto font-medium">
                  {filter === 'all'
                    ? "Você não tem notificações no momento. Avisaremos quando algo importante acontecer."
                    : `Nenhuma notificação do tipo "${({ all: 'todas', unread: 'não lidas', system: 'sistema', account: 'conta', document: 'documentos', alert: 'alertas' } as Record<string, string>)[filter] ?? filter}" encontrada com o filtro atual.`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}