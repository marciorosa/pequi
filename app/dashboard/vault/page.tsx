'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/DashboardLayout';
import { vaultService } from '../../services/api';
import UpgradeModal from '../../components/UpgradeModal';

// ─── Types ────────────────────────────────────────────────────────────────────
interface VaultFile {
  _id: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  s3Key: string;
  s3Url: string;
  uploadedAt: string;
  chatSessions?: ChatSession[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatSession {
  _id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

interface VaultFolder {
  _id: string;
  name: string;
  description?: string;
  files: VaultFile[];
  isLocked: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const FOLDER_COLORS = [
  '#1a1a1a', '#2563eb', '#7c3aed', '#059669', '#dc2626',
  '#d97706', '#0891b2', '#be185d',
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────
const Icons = {
  folder: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  ),
  folderOpen: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.933l.857-6a2.25 2.25 0 00-1.883-2.541m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
    </svg>
  ),
  lock: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  lockOpen: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  file: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  image: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  pdf: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  video: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  audio: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  ),
  upload: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  ),
  download: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  trash: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  pencil: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  plus: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  spinner: (
    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  ),
  warning: (
    <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  ),
  storage: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
  ),
  chat: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  ),
  history: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  send: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
    </svg>
  ),
  save: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  sparkles: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  close: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

const getFileIcon = (mime: string) => {
  if (mime.startsWith('image/')) return Icons.image;
  if (mime === 'application/pdf') return Icons.pdf;
  if (mime.startsWith('video/')) return Icons.video;
  if (mime.startsWith('audio/')) return Icons.audio;
  return Icons.file;
};

// ─── Modal wrapper ────────────────────────────────────────────────────────────
const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }} // Blurred Backdrop
    onClick={onClose}
  >
    <div onClick={(e) => e.stopPropagation()}>{children}</div>
  </div>
);

// ─── Password Modal ───────────────────────────────────────────────────────────
const PasswordModal = ({
  title, subtitle, action, onConfirm, onClose, loading,
}: {
  title: string; subtitle: string; action: string;
  onConfirm: (pw: string) => void; onClose: () => void; loading: boolean;
}) => {
  const [pw, setPw] = useState('');
  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-[2.5rem] p-12 w-full max-w-md shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.03] pointer-events-none">
          <svg width="200" height="200" viewBox="0 0 100 100">
            <pattern id="grid-pw" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid-pw)" />
          </svg>
        </div>
        
        <div className="w-16 h-16 rounded-2xl bg-[#F9F8F6] border border-[#e7e5e1] flex items-center justify-center text-black mb-8 relative z-10">
          <div className="scale-125">{Icons.lock}</div>
        </div>
        <h2 className="text-3xl font-medium text-[#10101A] mb-2 tracking-tight relative z-10">{title}</h2>
        <p className="text-[10px] text-[#A0A0A0] font-bold uppercase tracking-[0.4em] mb-10 relative z-10">{subtitle}</p>
        <input
          autoFocus
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && pw && onConfirm(pw)}
          placeholder="Access Key Required"
          className="w-full border border-[#e7e5e1] bg-[#F9F8F6] rounded-2xl px-6 py-4 text-[#10101A] focus:outline-none focus:ring-4 focus:ring-black/5 mb-8 relative z-10 font-medium placeholder:opacity-30"
        />
        <div className="flex gap-4 relative z-10">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl border border-[#e7e5e1] text-[#A0A0A0] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#F9F8F6] transition-all duration-300">
            Cancel
          </button>
          <button
            onClick={() => pw && onConfirm(pw)}
            disabled={!pw || loading}
            className="flex-1 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-30 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] btn-primary-gradient"
          >
            {loading ? Icons.spinner : null}
            {loading ? 'Working…' : action}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ─── Folder Modal ─────────────────────────────────────────────────────────────
const FolderModal = ({
  initial, onConfirm, onClose, loading,
}: {
  initial?: Partial<VaultFolder>;
  onConfirm: (d: { name: string; description: string; color: string }) => void;
  onClose: () => void;
  loading: boolean;
}) => {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [color, setColor] = useState(initial?.color || '#1a1a1a');
 
  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-[2.5rem] p-12 w-full max-w-lg shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-[0.02] pointer-events-none">
          <svg width="300" height="300" viewBox="0 0 100 100">
            <pattern id="grid-folder" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
            </pattern>
            <rect width="100" height="100" fill="url(#grid-folder)" />
          </svg>
        </div>
 
        <div className="w-16 h-16 rounded-2xl bg-[#F9F8F6] border border-[#e7e5e1] flex items-center justify-center text-black mb-8 relative z-10">
          <div className="scale-125" style={{ color: color }}>{Icons.folder}</div>
        </div>
        <h2 className="text-3xl font-medium text-[#10101A] mb-2 tracking-tight relative z-10">
          {initial?._id ? 'Edit Repository' : 'Initialize Storage Node'}
        </h2>
        <p className="text-[10px] text-[#A0A0A0] font-bold uppercase tracking-[0.4em] mb-10 relative z-10">Secure Document Container</p>
 
        <div className="space-y-6 mb-10 relative z-10">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Node Designation (e.g. Case Files 2024)"
            className="w-full border border-[#e7e5e1] bg-[#F9F8F6] rounded-2xl px-6 py-5 text-[#10101A] focus:outline-none focus:ring-4 focus:ring-black/5 font-medium placeholder:opacity-30"
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Analytical Context (optional)"
            className="w-full border border-[#e7e5e1] bg-[#F9F8F6] rounded-2xl px-6 py-5 text-[#10101A] focus:outline-none focus:ring-4 focus:ring-black/5 font-medium placeholder:opacity-30"
          />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A0A0A0] mb-4">Aesthetic Identification</p>
            <div className="flex gap-4 flex-wrap">
              {FOLDER_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-9 h-9 rounded-full transition-all duration-300 ${color === c ? 'scale-110 shadow-lg ring-2 ring-black/10' : 'hover:scale-105 opacity-60 hover:opacity-100'}`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        </div>
 
        <div className="flex gap-4 relative z-10">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl border border-[#e7e5e1] text-[#A0A0A0] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#F9F8F6] transition-all duration-300">
            Cancel
          </button>
          <button
            onClick={() => name.trim() && onConfirm({ name: name.trim(), description, color })}
            disabled={!name.trim() || loading}
            className="flex-1 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] disabled:opacity-30 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] btn-primary-gradient"
          >
            {loading ? Icons.spinner : null}
            {loading ? 'Working…' : (initial?._id ? 'Synchronize' : 'Authorize Node')}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ─── Upload Modal ─────────────────────────────────────────────────────────────
const UploadModal = ({
  onConfirm, onClose, loading,
}: {
  onConfirm: (files: File[]) => void;
  onClose: () => void;
  loading: boolean;
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-[2rem] p-10 w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-foreground">
            {Icons.upload}
          </div>
          <button onClick={onClose} className="p-2 text-foreground/30 hover:bg-gray-100 rounded-xl transition">
            {Icons.close}
          </button>
        </div>
        
        <h2 className="text-2xl font-bold text-foreground mb-1">Upload Files</h2>
        <p className="text-[10px] text-foreground/40 uppercase tracking-[0.3em] mb-8">Add documents to your secure vault</p>

        <div
          className={`relative cursor-pointer rounded-[2rem] border-2 border-dashed p-10 text-center transition-all duration-300 mb-6 ${
            isDragging ? 'border-foreground bg-foreground/5' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.length) {
              setSelectedFiles(prev => [...prev, ...Array.from(e.dataTransfer.files!)]);
            }
          }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,image/*,video/*,audio/*,.txt,.csv"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.length) {
                setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
              }
              e.target.value = '';
            }}
          />
          <div>
            <p className="text-sm font-bold text-foreground mb-1">Click to browse or drag and drop</p>
            <p className="text-xs text-foreground/40">PDF, DOCX, images, video, audio, text</p>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="max-h-40 overflow-y-auto mb-6 space-y-2 pr-2 custom-scrollbar">
            {selectedFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center text-foreground/40 flex-shrink-0">
                    {Icons.file}
                  </div>
                  <div className="truncate min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{f.name}</p>
                    <p className="text-[9px] text-foreground/40 uppercase tracking-widest mt-0.5">{formatBytes(f.size)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFiles(selectedFiles.filter((_, idx) => idx !== i))}
                  className="p-1.5 text-red-400 hover:bg-red-50 rounded-lg transition ml-2 flex-shrink-0"
                >
                  {Icons.trash}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl border border-gray-100 text-foreground/50 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            onClick={() => selectedFiles.length && onConfirm(selectedFiles)}
            disabled={!selectedFiles.length || loading}
            className="flex-1 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest disabled:opacity-30 transition flex items-center justify-center gap-2 btn-primary-gradient"
          >
            {loading ? Icons.spinner : null}
            {loading ? 'Uploading…' : `Upload ${selectedFiles.length} File${selectedFiles.length !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </Modal>
  );
};

// ─── Chat with File Modal ─────────────────────────────────────────────────────
const ChatModal = ({
  file, folderId, onClose, onShowUpgrade,
}: { file: VaultFile; folderId: string; onClose: () => void; onShowUpgrade: (val: boolean) => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  // Auto-start: generate summary on open
  useEffect(() => {
    const init = async () => {
      setInitializing(true);
      const welcomeMsg: ChatMessage = {
        role: 'user',
        content: 'Please provide a summary of this document and let me know what I can ask you about it.',
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMsg]);
      try {
        const res = await vaultService.chatWithFile(
          folderId, file._id,
          welcomeMsg.content,
          [],
          true // isFirstMessage — instructs backend to download from S3
        );
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: res.response,
          timestamp: new Date().toISOString(),
        };
        setMessages([welcomeMsg, assistantMsg]);
      } catch (e: any) {
        const msg = e.response?.data?.message || e.message || 'Could not load file for analysis';
        if (e.response?.status === 403 || e.response?.status === 402 || msg.toLowerCase().includes('upgrade') || msg.toLowerCase().includes('plan')) {
          onShowUpgrade(true);
        } else {
          toast.error(msg);
        }
      } finally {
        setInitializing(false);
      }
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const userMsg: ChatMessage = { role: 'user', content: input.trim(), timestamp: new Date().toISOString() };
    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setInput('');
    setSending(true);
    try {
      const history = updatedMsgs.slice(0, -1).map(m => ({ role: m.role, content: m.content }));
      const res = await vaultService.chatWithFile(folderId, file._id, userMsg.content, history, false);
      const assistantMsg: ChatMessage = { role: 'assistant', content: res.response, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e: any) {
      const msg = e.response?.data?.message || e.message || 'Failed to get AI response';
      if (e.response?.status === 403 || e.response?.status === 402 || msg.toLowerCase().includes('upgrade') || msg.toLowerCase().includes('plan')) {
        onShowUpgrade(true);
      } else {
        toast.error(msg);
      }
    } finally {
      setSending(false);
    }
  };

  const handleSave = async () => {
    if (messages.length < 2) { toast.error('Nothing to save yet'); return; }
    setSaving(true);
    try {
      const title = `Chat — ${file.originalName} — ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      await vaultService.saveChatSession(folderId, file._id, title, messages);
      toast.success('Chat saved to vault history!');
    } catch (e: any) {
      const msg = e.response?.data?.message || e.message || 'Failed to save chat';
      if (e.response?.status === 403 || e.response?.status === 402 || msg.toLowerCase().includes('upgrade') || msg.toLowerCase().includes('plan')) {
        onShowUpgrade(true);
      } else {
        toast.error(msg);
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-[2rem] shadow-2xl w-full flex flex-col" style={{ width: 'min(90vw, 760px)', height: 'min(90vh, 680px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
              {Icons.sparkles}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">AI Document Chat</h2>
              <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] truncate max-w-[320px]">{file.originalName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              disabled={saving || messages.length < 2}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest disabled:opacity-30 transition btn-primary-gradient"
            >
              {saving ? Icons.spinner : Icons.save}
              Save Chat
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-foreground/30 hover:bg-gray-100 transition">{Icons.close}</button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-8 py-5 space-y-4">
          {initializing && (
            <div className="flex items-center gap-3 p-5 rounded-2xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white animate-pulse">
                {Icons.sparkles}
              </div>
              <div className="space-y-1.5">
                <div className="h-3 w-48 bg-violet-200 rounded animate-pulse" />
                <div className="h-3 w-64 bg-violet-100 rounded animate-pulse" />
                <div className="h-3 w-40 bg-violet-100 rounded animate-pulse" />
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white mr-3 mt-1 flex-shrink-0">
                  {Icons.sparkles}
                </div>
              )}
              <div
                className={`max-w-[78%] px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                  ? 'btn-primary-gradient rounded-tr-none'
                  : 'bg-gray-50 border border-gray-100 text-foreground rounded-tl-none'
                  }`}
                dangerouslySetInnerHTML={{ __html: msg.content }}
              />
            </div>
          ))}
          {sending && (
            <div className="flex justify-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white mr-3">
                {Icons.sparkles}
              </div>
              <div className="px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-100 flex gap-1.5 items-center">
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        <div className="px-8 pb-8 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 bg-gray-50 rounded-2xl border border-gray-100 px-4 pr-2 py-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={initializing ? 'Analyzing document…' : 'Ask anything about this document…'}
              disabled={sending || initializing}
              className="flex-1 bg-transparent text-sm text-foreground placeholder-foreground/30 outline-none py-2"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || sending || initializing}
              className="w-10 h-10 rounded-xl text-white flex items-center justify-center hover:opacity-80 disabled:opacity-30 transition flex-shrink-0 btn-primary-gradient"
            >
              {sending ? Icons.spinner : Icons.send}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

// ─── View Chat Sessions Modal ─────────────────────────────────────────────────
const ViewChatModal = ({
  file, folderId, onClose,
}: { file: VaultFile; folderId: string; onClose: () => void }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    vaultService.getChatSessions(folderId, file._id)
      .then(d => setSessions(d.sessions || []))
      .catch(() => toast.error('Could not load chat history'))
      .finally(() => setLoading(false));
  }, [folderId, file._id]);

  return (
    <Modal onClose={onClose}>
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden" style={{ width: 'min(90vw, 680px)', maxHeight: '80vh' }}>
        <div className="flex items-center justify-between px-8 pt-8 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-white">
              {Icons.history}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">Chat History</h2>
              <p className="text-[10px] text-foreground/40 uppercase tracking-[0.2em] truncate max-w-[300px]">{file.originalName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-foreground/30 hover:bg-gray-100 transition">{Icons.close}</button>
        </div>
        <div className="overflow-y-auto" style={{ maxHeight: 'calc(80vh - 100px)' }}>
          {loading ? (
            <div className="flex justify-center p-12">{Icons.spinner}</div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-16 text-foreground/20">
              <div className="text-4xl mb-3">💬</div>
              <p className="font-bold uppercase tracking-widest text-sm">No saved chats yet</p>
              <p className="text-xs mt-1">Start a chat and click &quot;Save Chat&quot; to save it here</p>
            </div>
          ) : (
            <div className="p-6 space-y-3">
              {sessions.map(session => (
                <div key={session._id} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
                    onClick={() => setOpen(open === session._id ? null : session._id)}
                  >
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground">{session.title}</p>
                      <p className="text-[10px] text-foreground/40 uppercase tracking-widest mt-0.5">
                        {formatDate(session.createdAt)} · {session.messages.length} messages
                      </p>
                    </div>
                    <svg className={`w-4 h-4 text-foreground/30 transition-transform ${open === session._id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {open === session._id && (
                    <div className="px-6 pb-5 space-y-3 border-t border-gray-50 pt-4 bg-gray-50/50">
                      {session.messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div
                            className={`max-w-[80%] px-4 py-3 rounded-xl text-xs leading-relaxed ${msg.role === 'user'
                              ? 'bg-foreground text-white rounded-tr-none'
                              : 'bg-white border border-gray-100 text-foreground rounded-tl-none'
                              }`}
                            dangerouslySetInnerHTML={{ __html: msg.content }}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VaultPage() {
  const router = useRouter();
  const [folders, setFolders] = useState<VaultFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState<VaultFolder | null>(null);
  const [unlockedFolders, setUnlockedFolders] = useState<Set<string>>(new Set());

  // Modals
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editFolder, setEditFolder] = useState<VaultFolder | null>(null);
  const [lockTarget, setLockTarget] = useState<VaultFolder | null>(null);
  const [unlockTarget, setUnlockTarget] = useState<VaultFolder | null>(null);
  const [removeLockTarget, setRemoveLockTarget] = useState<VaultFolder | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<VaultFolder | null>(null);
  const [chatFile, setChatFile] = useState<VaultFile | null>(null);
  const [viewChatFile, setViewChatFile] = useState<VaultFile | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Auth guard ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/login?from=/dashboard/vault');
    }
  }, [router]);


  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchFolders = useCallback(async () => {
    try {
      setLoading(true);
      // Guard: skip API call if no token available yet
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) {
        setFolders([]);
        return;
      }
      const data = await vaultService.getFolders();
      setFolders(data.folders || []);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Could not load vault data';
      // If it's a 401/network error, show empty state instead of crashing
      if (err.response?.status === 401) {
        setFolders([]);
      } else if (err.response?.status === 403 || err.response?.status === 402 || msg.toLowerCase().includes('upgrade') || msg.toLowerCase().includes('plan')) {
        setShowUpgradeModal(true);
      } else {
        toast.error(msg);
      }
      setFolders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchFolders(); }, [fetchFolders]);

  // Keep selectedFolder in sync with folders list
  useEffect(() => {
    if (selectedFolder) {
      const updated = folders.find((f) => f._id === selectedFolder._id);
      if (updated) setSelectedFolder(updated);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folders, selectedFolder?._id]);

  // ── Folder CRUD ────────────────────────────────────────────────────────────
  const handleCreateFolder = async (d: { name: string; description: string; color: string }) => {
    try {
      setActionLoading(true);
      const res = await vaultService.createFolder(d);
      setFolders((prev) => [res.folder, ...prev]);
      setShowCreateFolder(false);
      toast.success('Folder created');
    } catch (e: any) { 
      const msg = e.response?.data?.message || e.message || 'Failed to create folder';
      if (e.response?.status === 403 || e.status === 403 || msg.toLowerCase().includes('upgrade to pro') || msg.toLowerCase().includes('current plan')) {
        setShowUpgradeModal(true);
      } else {
        toast.error(msg); 
      }
    }
    finally { setActionLoading(false); }
  };

  const handleUpdateFolder = async (d: { name: string; description: string; color: string }) => {
    if (!editFolder) return;
    try {
      setActionLoading(true);
      const res = await vaultService.updateFolder(editFolder._id, d);
      setFolders((prev) => prev.map((f) => f._id === editFolder._id ? res.folder : f));
      setEditFolder(null);
      toast.success('Folder updated');
    } catch (e: any) { 
      const msg = e.response?.data?.message || 'Failed to update folder';
      toast.error(msg); 
    }
    finally { setActionLoading(false); }
  };

  const handleDeleteFolder = async () => {
    if (!deleteTarget) return;
    try {
      setActionLoading(true);
      await vaultService.deleteFolder(deleteTarget._id);
      setFolders((prev) => prev.filter((f) => f._id !== deleteTarget._id));
      if (selectedFolder?._id === deleteTarget._id) setSelectedFolder(null);
      setDeleteTarget(null);
      toast.success('Folder deleted');
    } catch (e: any) { 
      const msg = e.response?.data?.message || 'Failed to delete folder';
      toast.error(msg); 
    }
    finally { setActionLoading(false); }
  };

  // ── Lock / Unlock ──────────────────────────────────────────────────────────
  const handleLock = async (password: string) => {
    if (!lockTarget) return;
    try {
      setActionLoading(true);
      await vaultService.lockFolder(lockTarget._id, password);
      setFolders((prev) => prev.map((f) => f._id === lockTarget._id ? { ...f, isLocked: true } : f));
      setUnlockedFolders((prev) => { const s = new Set(prev); s.delete(lockTarget._id); return s; });
      setLockTarget(null);
      toast.success('Folder locked');
    } catch (e: unknown) { toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to lock'); }
    finally { setActionLoading(false); }
  };

  const handleUnlock = async (password: string) => {
    if (!unlockTarget) return;
    try {
      setActionLoading(true);
      await vaultService.unlockFolder(unlockTarget._id, password);
      setUnlockedFolders((prev) => new Set([...prev, unlockTarget._id]));
      setUnlockTarget(null);
      toast.success('Access granted');
    } catch (e: unknown) { toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Incorrect password'); }
    finally { setActionLoading(false); }
  };

  const handleRemoveLock = async (password: string) => {
    if (!removeLockTarget) return;
    try {
      setActionLoading(true);
      await vaultService.removeLock(removeLockTarget._id, password);
      setFolders((prev) => prev.map((f) => f._id === removeLockTarget._id ? { ...f, isLocked: false } : f));
      setUnlockedFolders((prev) => { const s = new Set(prev); s.delete(removeLockTarget._id); return s; });
      setRemoveLockTarget(null);
      toast.success('Lock removed');
    } catch (e: unknown) { toast.error((e as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Incorrect password'); }
    finally { setActionLoading(false); }
  };

  const tryOpenFolder = (folder: VaultFolder) => {
    if (folder.isLocked && !unlockedFolders.has(folder._id)) {
      setUnlockTarget(folder);
    } else {
      setSelectedFolder(folder);
    }
  };

  // ── File upload / delete / download ───────────────────────────────────────
  const handleFilesSelected = async (files: File[]) => {
    if (!selectedFolder) return;
    try {
      setUploading(true);
      const res = await vaultService.uploadFiles(selectedFolder._id, files);
      setFolders((prev) => prev.map((f) => f._id === selectedFolder._id ? res.folder : f));
      setShowUploadModal(false);
      toast.success(`${files.length} file(s) uploaded`);
    } catch (e: any) { 
      const msg = e.response?.data?.message || e.message || 'Upload failed';
      if (e.response?.status === 403 || e.status === 403 || msg.toLowerCase().includes('upgrade to pro') || msg.toLowerCase().includes('current plan')) {
        setShowUpgradeModal(true);
      } else {
        toast.error(msg); 
      }
    }
    finally { setUploading(false); }
  };

  const handleFileDelete = async (fileId: string) => {
    if (!selectedFolder) return;
    try {
      await vaultService.deleteFile(selectedFolder._id, fileId);
      setFolders((prev) =>
        prev.map((f) =>
          f._id === selectedFolder._id
            ? { ...f, files: f.files.filter((file) => file._id !== fileId) }
            : f
        )
      );
      toast.success('File removed');
    } catch (e: any) { 
      const msg = e.response?.data?.message || 'Failed to delete file';
      toast.error(msg); 
    }
  };

  const handleDownload = async (file: VaultFile) => {
    if (!selectedFolder) return;
    try {
      const { url, fileName } = await vaultService.getDownloadUrl(selectedFolder._id, file._id);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.target = '_blank';
      a.click();
    } catch { toast.error('Failed to get download link'); }
  };

  // ── Computed stats ─────────────────────────────────────────────────────────
  const totalFiles = folders.reduce((acc, f) => acc + f.files.length, 0);
  const totalSize = folders.reduce((acc, f) => acc + f.files.reduce((a, fi) => a + fi.size, 0), 0);
  const lockedCount = folders.filter((f) => f.isLocked).length;

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <DashboardLayout title="Secure Vault">
      <div className="space-y-8">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden rounded-[3rem] bg-[#F9F8F6] p-12 lg:p-20 text-[#10101A] shadow-2xl border border-[#e7e5e1]">
          <div
            className="absolute inset-0 opacity-40 pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: 'url("/landingpage/hero/hero-bgimg.png")' }}
          />
          {/* Decorative lock glyph */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none hidden lg:block">
            <svg className="w-72 h-72" fill="black" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
            </svg>
          </div>
          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="inline-flex px-4 py-1.5 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-[0.3em] border border-black/10">
              Encrypted Storage V2.0
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-[#10101A]">
              Secure Document <span className="font-light opacity-60 italic">Vault.</span>
            </h1>
            <p className="text-lg lg:text-xl text-[#10101A]/40 font-medium leading-relaxed">
              Military-grade encrypted storage for your most sensitive legal documents. Create folders, upload files to AWS S3, and protect with password-locked access.
            </p>
          </div>
        </section>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Folders', value: folders.length, icon: Icons.folder },
            { label: 'Total Files', value: totalFiles, icon: Icons.file },
            { label: 'Storage Used', value: formatBytes(totalSize), icon: Icons.storage },
            { label: 'Locked Folders', value: lockedCount, icon: Icons.lock },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-foreground mb-4">
                {s.icon}
              </div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Main ── */}
        <div className="grid lg:grid-cols-[360px_1fr] gap-6 items-start">

          {/* ── Folder Sidebar ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">Storage Nodes</h2>
              <button
                onClick={() => setShowCreateFolder(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-[10px] font-bold uppercase tracking-widest transition btn-primary-gradient"
              >
                {Icons.plus}
                New Folder
              </button>
            </div>

            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-white rounded-[2rem] border border-gray-100 animate-pulse" />
                ))}
              </div>
            ) : folders.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-12 border border-dashed border-gray-200 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-foreground/20 mx-auto">
                  {Icons.folder}
                </div>
                <p className="text-sm font-bold text-foreground/30 uppercase tracking-widest">No folders yet</p>
                <p className="text-xs text-foreground/20">Create your first storage node</p>
              </div>
            ) : (
              <div className="space-y-3">
                {folders.map((folder) => {
                  const isSelected = selectedFolder?._id === folder._id;
                  const isUnlocked = unlockedFolders.has(folder._id);
                  return (
                      <div
                        key={folder._id}
                        onClick={() => tryOpenFolder(folder)}
                        className={`group relative cursor-pointer rounded-[2rem] p-5 border transition-all duration-300 ${isSelected
                          ? 'btn-primary-gradient text-white shadow-2xl border-transparent'
                          : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-md'
                          }`}
                      >
                      {/* Colour accent bar */}
                      <div
                        className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full"
                        style={{ background: folder.color }}
                      />

                      <div className="pl-4 flex items-center gap-4">
                        {/* Folder icon */}
                        <div
                          className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors"
                          style={{ background: isSelected ? 'rgba(255,255,255,0.15)' : `${folder.color}18`, color: isSelected ? 'white' : folder.color }}
                        >
                          {folder.isLocked && !isUnlocked ? Icons.lock : Icons.folderOpen}
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`font-bold truncate text-sm ${isSelected ? 'text-white' : 'text-foreground'}`}>
                            {folder.name}
                          </p>
                          <p className={`text-[10px] uppercase tracking-widest mt-0.5 ${isSelected ? 'text-white/50' : 'text-foreground/30'}`}>
                            {folder.files.length} file{folder.files.length !== 1 ? 's' : ''} · {formatDate(folder.createdAt)}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div
                          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            title="Edit"
                            onClick={() => setEditFolder(folder)}
                            className={`p-2 rounded-xl hover:bg-black/10 transition ${isSelected ? 'text-white/70' : 'text-foreground/40'}`}
                          >
                            {Icons.pencil}
                          </button>
                          {folder.isLocked && isUnlocked ? (
                            <button
                              title="Remove lock"
                              onClick={() => setRemoveLockTarget(folder)}
                              className={`p-2 rounded-xl hover:bg-black/10 transition ${isSelected ? 'text-white/70' : 'text-foreground/40'}`}
                            >
                              {Icons.lockOpen}
                            </button>
                          ) : !folder.isLocked ? (
                            <button
                              title="Lock folder"
                              onClick={() => setLockTarget(folder)}
                              className={`p-2 rounded-xl hover:bg-black/10 transition ${isSelected ? 'text-white/70' : 'text-foreground/40'}`}
                            >
                              {Icons.lock}
                            </button>
                          ) : null}
                          <button
                            title="Delete folder"
                            onClick={() => setDeleteTarget(folder)}
                            className="p-2 rounded-xl hover:bg-red-50 text-red-400 transition"
                          >
                            {Icons.trash}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── File Panel ── */}
          <div>
            {!selectedFolder ? (
              <div className="bg-white rounded-[3rem] border border-dashed border-gray-200 p-20 text-center space-y-4">
                <div className="w-20 h-20 rounded-[2rem] bg-gray-50 border border-gray-100 flex items-center justify-center text-foreground/10 mx-auto">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-foreground/20 uppercase tracking-widest">Select a folder</h3>
                <p className="text-sm text-foreground/15">Choose a storage node from the left panel</p>
              </div>
            ) : (
              <div className="space-y-5">
                {/* Panel header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-foreground">{selectedFolder.name}</h2>
                    {selectedFolder.description && (
                      <p className="text-sm text-foreground/40 mt-0.5">{selectedFolder.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    disabled={uploading}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest disabled:opacity-40 transition btn-primary-gradient"
                  >
                    {uploading ? Icons.spinner : Icons.upload}
                    {uploading ? 'Uploading…' : 'Upload Files'}
                  </button>
                </div>

                {/* Drop zone + file list */}
                <div
                  className={`relative rounded-[2.5rem] border-2 border-dashed transition-all duration-300 min-h-[400px] ${isDragging ? 'border-foreground bg-foreground/5' : 'border-gray-100 bg-white'
                    }`}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (e.dataTransfer.files?.length) handleFilesSelected(Array.from(e.dataTransfer.files));
                  }}
                >
                  {selectedFolder.files.length === 0 ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 space-y-5">
                      <div className="w-20 h-20 rounded-[2rem] bg-gray-50 border border-gray-100 shadow-xl flex items-center justify-center text-foreground/20 group-hover:scale-110 transition-all">
                        {Icons.upload}
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-foreground/20">Drop files here</p>
                        <p className="text-xs text-foreground/15 mt-1">or click &quot;Upload Files&quot; above · PDF, DOCX, images, video, audio</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 space-y-2">
                      {selectedFolder.files.map((file) => (
                        <div
                          key={file._id}
                          className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition group"
                        >
                          {/* File type icon */}
                          <div className="w-11 h-11 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-foreground/50 flex-shrink-0">
                            {getFileIcon(file.mimeType)}
                          </div>

                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-foreground truncate">{file.originalName}</p>
                            <p className="text-[10px] text-foreground/30 uppercase tracking-widest mt-0.5">
                              {formatBytes(file.size)} · {formatDate(file.uploadedAt)}
                            </p>
                          </div>

                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
                            {/* Chat button */}
                            <button
                              title="Chat with this file"
                              onClick={() => setChatFile(file)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest hover:opacity-80 transition shadow-sm"
                            >
                              {Icons.chat}
                              Chat
                            </button>
                            {/* View Chat History button */}
                            <button
                              title="View saved chat history"
                              onClick={() => setViewChatFile(file)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-gray-100 text-foreground/60 text-[10px] font-bold uppercase tracking-widest hover:shadow-md transition"
                            >
                              {Icons.history}
                            </button>
                            <button
                              onClick={() => handleDownload(file)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-100 text-foreground text-[10px] font-bold uppercase tracking-widest hover:shadow-md transition"
                            >
                              {Icons.download}
                              Download
                            </button>
                            <button
                              onClick={() => handleFileDelete(file._id)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-red-100 text-red-400 text-[10px] font-bold uppercase tracking-widest hover:bg-red-50 transition"
                            >
                              {Icons.trash}
                            </button>
                          </div>
                        </div>
                      ))}

                      {isDragging && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-[2.5rem] bg-foreground/5 border-2 border-foreground/20">
                          <p className="text-lg font-bold text-foreground/60 uppercase tracking-widest">Drop to upload</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Modals ── */}
      {showUploadModal && (
        <UploadModal onConfirm={handleFilesSelected} onClose={() => setShowUploadModal(false)} loading={uploading} />
      )}
      {showCreateFolder && (
        <FolderModal onConfirm={handleCreateFolder} onClose={() => setShowCreateFolder(false)} loading={actionLoading} />
      )}
      {editFolder && (
        <FolderModal initial={editFolder} onConfirm={handleUpdateFolder} onClose={() => setEditFolder(null)} loading={actionLoading} />
      )}
      {lockTarget && (
        <PasswordModal
          title="Lock Folder"
          subtitle="Set a password to protect this folder"
          action="Lock Folder"
          onConfirm={handleLock}
          onClose={() => setLockTarget(null)}
          loading={actionLoading}
        />
      )}
      {unlockTarget && (
        <PasswordModal
          title="Locked Folder"
          subtitle={`Enter password to access "${unlockTarget.name}"`}
          action="Unlock"
          onConfirm={handleUnlock}
          onClose={() => setUnlockTarget(null)}
          loading={actionLoading}
        />
      )}
      {removeLockTarget && (
        <PasswordModal
          title="Remove Lock"
          subtitle="Confirm password to disable protection"
          action="Remove Lock"
          onConfirm={handleRemoveLock}
          onClose={() => setRemoveLockTarget(null)}
          loading={actionLoading}
        />
      )}
      {deleteTarget && (
        <Modal onClose={() => setDeleteTarget(null)}>
          <div className="bg-white rounded-[2rem] p-10 w-full max-w-md shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-400 mx-auto mb-6">
              {Icons.warning}
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Delete Folder</h2>
            <p className="text-sm text-foreground/50 mb-8">
              This will permanently delete <strong>{deleteTarget.name}</strong> and all {deleteTarget.files.length} file(s) from S3. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-4 rounded-2xl border border-gray-100 text-foreground/50 text-sm font-bold uppercase tracking-widest hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteFolder}
                disabled={actionLoading}
                className="flex-1 py-4 rounded-2xl bg-red-500 text-white text-sm font-bold uppercase tracking-widest hover:bg-red-600 disabled:opacity-40 transition flex items-center justify-center gap-2"
              >
                {actionLoading ? Icons.spinner : Icons.trash}
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
      {/* Chat with file modal */}
      {chatFile && selectedFolder && (
        <ChatModal
          file={chatFile}
          folderId={selectedFolder._id}
          onClose={() => setChatFile(null)}
          onShowUpgrade={setShowUpgradeModal}
        />
      )}
      {/* View saved chats modal */}
      {viewChatFile && selectedFolder && (
        <ViewChatModal
          file={viewChatFile}
          folderId={selectedFolder._id}
          onClose={() => setViewChatFile(null)}
        />
      )}
      
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
      />
    </DashboardLayout>
  );
}