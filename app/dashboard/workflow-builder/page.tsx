'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  MarkerType,
  type Connection,
  type Edge,
  type Node,
  type NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';
import DashboardLayout from '../../components/DashboardLayout';
import toast from 'react-hot-toast';
import { workflowService } from '../../services/api';
import UpgradeModal from '../../components/UpgradeModal';

interface Workflow {
  _id: string;
  name: string;
  nodes: Node[];
  edges: Edge[];
  runCount: number;
  updatedAt: string;
}

// ─── SVG Icons (Matching Theme) ───────────────────────────────────────────────

const Icons = {
  file: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  pencil: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
    </svg>
  ),
  user: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  sparkles: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  ),
  shield: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.744c0 3.848 1.812 7.271 4.61 9.412m9.782-16.446A11.959 11.959 0 0120.402 6 11.99 11.99 0 0121 9.744c0 3.848-1.812 7.271-4.61 9.412m0 0L12 21.375l-4.61-2.521m0 0a11.95 11.95 0 01-3.14-d.452m16.5 0a11.95 11.95 0 01-3.14 1.452" />
    </svg>
  ),
  magnifyingGlass: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
  ),
  globe: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 18c-4.97 0-9-4.03-9-9s4.03-9 9-9m0 18c4.97 0 9-4.03 9-9s-4.03-9-9-9" />
    </svg>
  ),
  status: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  folders: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
    </svg>
  ),
  lock: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  ),
  bell: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  ),
  clipboard: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  plus: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  ),
  save: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  play: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
    </svg>
  ),
  stop: (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.244 2.077H7.5A2.25 2.25 0 015.25 18V7.5z" />
    </svg>
  ),
  documentText: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5-3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
};

// ─── Node Definitions (Monochrome) ───────────────────────────────────────────

const TRIGGER_NODES = [
  { type: 'trigger', subtype: 'file_upload', label: 'Envio de arquivo' },
  { type: 'trigger', subtype: 'document_signed', label: 'Documento assinado' },
  { type: 'trigger', subtype: 'new_client', label: 'Novo cliente' },
];

const ACTION_NODES = [
  { type: 'action', subtype: 'summarize', label: 'Resumo com IA' },
  { type: 'action', subtype: 'risk_analysis', label: 'Análise de riscos' },
  { type: 'action', subtype: 'draft_reply', label: 'Redigir resposta' },
  { type: 'action', subtype: 'extract_clauses', label: 'Extrair cláusulas' },
  { type: 'action', subtype: 'translate', label: 'Traduzir' },
  { type: 'action', subtype: 'checklist', label: 'Compliance' },
];

const OUTPUT_NODES = [
  { type: 'output', subtype: 'save_vault', label: 'Salvar no cofre' },
  { type: 'output', subtype: 'email_client', label: 'Enviar e-mail ao cliente' },
];

const IconMap: Record<string, React.ReactNode> = {
  file_upload: Icons.file,
  schedule: Icons.calendar,
  document_signed: Icons.pencil,
  new_client: Icons.user,
  summarize: Icons.sparkles,
  risk_analysis: Icons.shield,
  draft_reply: Icons.documentText,
  extract_clauses: Icons.magnifyingGlass,
  translate: Icons.globe,
  checklist: Icons.status,
  save_vault: Icons.folders,
  email_client: Icons.email,
  notify: Icons.bell,
  add_to_registry: Icons.clipboard,
};

// ─── Custom Node Component ────────────────────────────────────────────────────

function WorkflowNode({ data, selected }: { data: Record<string, unknown>; selected: boolean }) {
  const isTrigger = data.nodeType === 'trigger';
  const isOutput = data.nodeType === 'output';

  return (
    <div
      className={`bg-white border transition-all duration-300 ${selected ? 'border-cerrado-900 ring-4 ring-pequi-500/5 shadow-2xl scale-[1.02]' : 'border-castanha-200 shadow-[0_4px_15px_rgba(0,0,0,0.02)]'} rounded-3xl min-w-[200px] overflow-visible relative`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 100 100">
          <pattern id={`grid-node-${data.subtype}`} width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
          </pattern>
          <rect width="100" height="100" fill={`url(#grid-node-${data.subtype})`} />
        </svg>
      </div>

      {!isTrigger && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-cerrado-900 !border-[3px] !border-white !-left-1.5"
          style={{ zIndex: 10 }}
        />
      )}

      <div className="p-5 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-castanha-50 border border-castanha-200 flex items-center justify-center text-ink flex-shrink-0 scale-90 group-hover:scale-100 transition-transform">
            {IconMap[data.subtype as string] || Icons.sparkles}
          </div>
          <div>
            <span className="inline-block text-[8px] font-bold uppercase tracking-[0.3em] text-castanha-400 mb-1">
              {({ trigger: 'gatilho', action: 'ação', output: 'saída' } as Record<string, string>)[data.nodeType as string] ?? (data.nodeType as string)}
            </span>
            <p className="text-[11px] font-bold text-ink leading-tight tracking-tight">{data.label as string}</p>
          </div>
        </div>
      </div>

      {!isOutput && (
        <Handle
          type="source"
          position={Position.Right}
          className="!w-3 !h-3 !bg-cerrado-900 !border-[3px] !border-white !-right-1.5"
          style={{ zIndex: 10 }}
        />
      )}
    </div>
  );
}

const nodeTypes: NodeTypes = { workflowNode: WorkflowNode };

// ─── Main Component ───────────────────────────────────────────────────────────

export default function WorkflowBuilderPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeTab, setActiveTab] = useState<'canvas' | 'library'>('canvas');
  const [workflowName, setWorkflowName] = useState('Nova automação');
  const [isRunning, setIsRunning] = useState(false);
  const [, setIsSaving] = useState(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [testFile, setTestFile] = useState<File | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  // Load workflows
  const fetchWorkflows = useCallback(async () => {
    try {
      setLoading(true);
      const data = await workflowService.getWorkflows();
      setWorkflows(data.workflows || []);
    } catch (e: any) {
      if (e.response?.status === 403 || e.status === 403) {
        setShowUpgradeModal(true);
      } else {
        toast.error(e.response?.data?.message || 'Falha ao carregar os fluxos');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, animated: true, markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#1a1a1a', strokeWidth: 1.5 } }, eds)
      ),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const nodeData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const bounds = reactFlowWrapper.current?.getBoundingClientRect();
      if (!bounds) return;

      const position = {
        x: event.clientX - bounds.left - 85,
        y: event.clientY - bounds.top - 35,
      };

      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: 'workflowNode',
        position,
        data: { ...nodeData, nodeType: nodeData.type },
      };

      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const addNodeToCenter = (nodeData: any) => {
    setNodes((nds) => {
      // Posiciona o novo nó abaixo do mais baixo do canvas, para não encavalar
      const NODE_SPACING_Y = 140;
      const lowestY = nds.length ? Math.max(...nds.map((nd) => nd.position.y)) : null;
      const newNode: Node = {
        id: `node_${Date.now()}`,
        type: 'workflowNode',
        position: { x: 250, y: lowestY === null ? 80 : lowestY + NODE_SPACING_Y },
        data: { ...nodeData, nodeType: nodeData.type },
      };
      return [...nds, newNode];
    });
    toast.success(`${nodeData.label} adicionado ao canvas`);
  };

  const handleRun = async () => {
    if (!activeWorkflowId) {
      toast.error('Salve o fluxo antes de executá-lo');
      return;
    }

    try {
      setIsRunning(true);
      await workflowService.runWorkflow(activeWorkflowId, {
        isSimulation: !!testFile,
        simulationFile: testFile,
        fileName: testFile?.name
      });
      toast.success(testFile ? `Simulação iniciada com ${testFile.name}` : 'Execução do fluxo iniciada');

      // Simulate stopping after a few seconds
      setTimeout(() => setIsRunning(false), 3000);
    } catch (e: any) {
      if (e.response?.status === 403 || e.status === 403) {
        setShowUpgradeModal(true);
      } else {
        toast.error(e.response?.data?.message || 'Falha ao iniciar o fluxo');
      }
      setIsRunning(false);
    }
  };

  const handleSave = async () => {
    if (nodes.length === 0) {
      toast.error('Adicione pelo menos um nó');
      return;
    }

    try {
      setIsSaving(true);
      const workflowData = {
        name: workflowName,
        nodes,
        edges,
        status: 'active' as const,
      };

      if (activeWorkflowId) {
        await workflowService.updateWorkflow(activeWorkflowId, workflowData);
        toast.success('Fluxo atualizado');
      } else {
        const res = await workflowService.createWorkflow(workflowData);
        setActiveWorkflowId(res.workflow._id);
        toast.success('Fluxo criado');
      }
      fetchWorkflows();
    } catch (e: any) {
      if (e.response?.status === 403 || e.status === 403) {
        setShowUpgradeModal(true);
      } else {
        toast.error(e.response?.data?.message || 'Falha ao salvar o fluxo');
      }
    } finally {
      setIsSaving(false);
    }
  };

  const updateNodeConfig = (id: string, config: Record<string, unknown>) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          return {
            ...node,
            data: {
              ...node.data,
              config: { ...node.data.config, ...config },
            },
          };
        }
        return node;
      })
    );
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  const loadWorkflow = (wf: Workflow) => {
    setNodes(wf.nodes || []);
    setEdges(wf.edges || []);
    setWorkflowName(wf.name);
    setActiveWorkflowId(wf._id);
    setActiveTab('canvas');
  };

  const deleteWorkflow = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Tem certeza de que deseja excluir este fluxo?')) return;

    try {
      await workflowService.deleteWorkflow(id);
      toast.success('Fluxo excluído');
      if (activeWorkflowId === id) {
        setNodes([]);
        setEdges([]);
        setWorkflowName('Nova automação');
        setActiveWorkflowId(null);
      }
      fetchWorkflows();
    } catch (e: any) {
      toast.error(e.response?.data?.message || 'Falha ao excluir o fluxo');
    }
  };

  return (
    <DashboardLayout
      title="Automações"
      actions={
        <div className="flex items-center gap-3">
          <div className="flex bg-castanha-50 rounded-xl p-0.5 md:p-1 border border-castanha-100">
            <button
              onClick={() => setActiveTab('canvas')}
              className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition ${activeTab === 'canvas' ? 'btn-primary-gradient shadow-sm' : 'text-foreground/30 hover:text-foreground'
                }`}
            >
              Canvas
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition ${activeTab === 'library' ? 'btn-primary-gradient shadow-sm' : 'text-foreground/30 hover:text-foreground'
                }`}
            >
              Biblioteca
            </button>
          </div>
        </div>
      }
    >
      <div className="h-[calc(100vh-12rem)] md:h-[calc(100vh-15rem)] min-h-[600px] flex flex-col overflow-hidden">
        {activeTab === 'canvas' ? (
          <div className="flex flex-col lg:flex-1 lg:flex-row gap-4 lg:gap-6 overflow-hidden h-full">
            {/* Sidebar Palette */}
            <aside className="w-full lg:w-64 bg-white border border-castanha-100 rounded-3xl p-4 md:p-6 flex flex-col shadow-sm max-h-[300px] lg:max-h-full flex-shrink-0 lg:overflow-hidden">
              <div className="mb-6">
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="w-full text-sm font-bold text-foreground bg-transparent border-b border-castanha-100 pb-2 outline-none focus:border-foreground transition mb-4"
                  placeholder="Nome do fluxo"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleRun}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition ${isRunning
                      ? 'bg-red-50 text-red-500 border border-red-100'
                      : 'btn-primary-gradient shadow-lg'
                      }`}
                  >
                    {isRunning ? Icons.stop : Icons.play}
                    {isRunning ? 'Parar' : 'Executar'}
                  </button>
                  <button
                    onClick={handleSave}
                    className="p-2.5 md:p-3 rounded-2xl border border-castanha-100 text-foreground/40 hover:text-foreground hover:bg-castanha-50 transition"
                  >
                    {Icons.save}
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto lg:overflow-y-auto space-y-6 md:space-y-6 flex flex-col lg:block">
                <div className="flex lg:block gap-4 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
                  <div className="flex-shrink-0 lg:w-full">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/20 mb-3">Gatilhos</p>
                    <div className="flex lg:flex-col gap-2 lg:gap-3">
                      {TRIGGER_NODES.map((n) => (
                        <div
                          key={n.subtype}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/reactflow', JSON.stringify(n));
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onClick={() => addNodeToCenter(n)}
                          className="flex items-center gap-3 p-2.5 md:p-3 bg-castanha-50 border border-transparent rounded-2xl cursor-grab active:cursor-grabbing hover:border-castanha-200 transition min-w-[120px] lg:min-w-0"
                        >
                          <div className="text-foreground/40">{IconMap[n.subtype] || Icons.sparkles}</div>
                          <span className="text-[10px] md:text-[11px] font-bold text-foreground/70">{n.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 lg:w-full lg:mt-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/20 mb-3">Ações de IA</p>
                    <div className="flex lg:flex-col gap-2 lg:gap-3">
                      {ACTION_NODES.map((n) => (
                        <div
                          key={n.subtype}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/reactflow', JSON.stringify(n));
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onClick={() => addNodeToCenter(n)}
                          className="flex items-center gap-3 p-2.5 md:p-3 bg-castanha-50 border border-transparent rounded-2xl cursor-grab active:cursor-grabbing hover:border-castanha-200 transition min-w-[120px] lg:min-w-0"
                        >
                          <div className="text-foreground/40">{IconMap[n.subtype] || Icons.sparkles}</div>
                          <span className="text-[10px] md:text-[11px] font-bold text-foreground/70">{n.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex-shrink-0 lg:w-full lg:mt-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/20 mb-3">Saídas</p>
                    <div className="flex lg:flex-col gap-2 lg:gap-3">
                      {OUTPUT_NODES.map((n) => (
                        <div
                          key={n.subtype}
                          draggable
                          onDragStart={(e) => {
                            e.dataTransfer.setData('application/reactflow', JSON.stringify(n));
                            e.dataTransfer.effectAllowed = 'move';
                          }}
                          onClick={() => addNodeToCenter(n)}
                          className="flex items-center gap-3 p-2.5 md:p-3 bg-castanha-50 border border-transparent rounded-2xl cursor-grab active:cursor-grabbing hover:border-castanha-200 transition min-w-[120px] lg:min-w-0"
                        >
                          <div className="text-foreground/40">{IconMap[n.subtype] || Icons.sparkles}</div>
                          <span className="text-[10px] md:text-[11px] font-bold text-foreground/70">{n.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Canvas */}
            <div className="flex-1 bg-white border border-castanha-200 rounded-[2.5rem] overflow-hidden relative shadow-2xl" ref={reactFlowWrapper}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                nodeTypes={nodeTypes}
                fitView
                defaultEdgeOptions={{
                  animated: true,
                  markerEnd: { type: MarkerType.ArrowClosed, color: '#10101A' },
                  style: { stroke: '#10101A', strokeWidth: 1.5 },
                }}
              >
                <Background variant={BackgroundVariant.Dots} gap={32} size={1} color="#e7e5e1" />
                <Controls showInteractive={false} className="bg-white border-castanha-200 shadow-2xl rounded-2xl overflow-hidden" />
              </ReactFlow>

              {nodes.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 rounded-[2rem] bg-castanha-50 border border-castanha-200 flex items-center justify-center text-ink/10 mb-8 relative">
                    <div className="absolute inset-0 opacity-[0.05]">
                      <svg width="100%" height="100%">
                        <pattern id="grid-empty" width="10" height="10" patternUnits="userSpaceOnUse">
                          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-empty)" />
                      </svg>
                    </div>
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                    </svg>
                  </div>
                  <h3 className="text-[10px] font-bold text-castanha-400 uppercase tracking-[0.4em]">Fluxo vazio</h3>
                  <p className="text-[11px] text-castanha-400 mt-3 font-medium opacity-60">Arraste e solte componentes para iniciar o fluxo</p>
                </div>
              )}
            </div>

            {/* Node Settings Drawer */}
            {selectedNode && (
              <div className="absolute lg:relative inset-x-4 bottom-4 lg:inset-auto lg:w-80 bg-white border border-castanha-100 rounded-[2.5rem] p-6 md:p-8 overflow-y-auto animate-in slide-in-from-bottom md:slide-in-from-right duration-500 shadow-2xl lg:shadow-xl lg:ml-2 z-20 max-h-[80%] lg:max-h-full">
                <div className="flex items-center justify-between mb-6 md:mb-10">
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-widest">Configurações</h3>
                  <button
                    onClick={() => setSelectedNodeId(null)}
                    className="p-2 rounded-xl hover:bg-castanha-50 text-foreground/20 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-8 relative z-10">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/40 block mb-4">Nome</label>
                    <input
                      type="text"
                      value={selectedNode.data.label}
                      className="w-full bg-castanha-50 border border-castanha-200 rounded-2xl px-6 py-5 text-[11px] font-bold text-ink outline-none focus:border-cerrado-900/10 focus:bg-white transition-all shadow-inner placeholder:opacity-30"
                      onChange={(e) => {
                        setNodes(nds => nds.map(n => n.id === selectedNodeId ? { ...n, data: { ...n.data, label: e.target.value } } : n))
                      }}
                    />
                  </div>

                  {/* File Upload Trigger Config */}
                  {(selectedNode.data.subtype === 'file_upload' || selectedNode.data.subtype === 'document_signed') && (
                    <div className="space-y-6">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40 block mb-3">
                          {selectedNode.data.subtype === 'file_upload' ? 'Arquivo para simulação' : 'Simular documento assinado'}
                        </label>
                        <div className="relative group">
                          <input
                            type="file"
                            className="hidden"
                            id="trigger-file-upload"
                            onChange={(e) => setTestFile(e.target.files?.[0] || null)}
                          />
                          <label
                            htmlFor="trigger-file-upload"
                            className="flex flex-col items-center justify-center border-2 border-dashed border-castanha-100 rounded-[2rem] p-8 hover:bg-castanha-50 hover:border-castanha-200 transition-all cursor-pointer"
                          >
                            <div className="w-12 h-12 rounded-2xl bg-white border border-castanha-100 flex items-center justify-center text-foreground/20 mb-3 group-hover:scale-110 transition-transform">
                              {Icons.file}
                            </div>
                            <span className="text-[10px] font-bold text-foreground line-clamp-1 px-4">
                              {testFile ? testFile.name : 'Selecionar PDF'}
                            </span>
                          </label>
                        </div>
                        {selectedNode.data.subtype === 'document_signed' && (
                          <p className="text-[9px] text-foreground/30 mt-4 leading-relaxed italic">
                            * Em produção, este gatilho se conecta aos webhooks do DocuSign/Hellosign. Para esta simulação, selecione um documento que fará o papel do &quot;Arquivo assinado&quot;.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Summarize Config */}
                  {selectedNode.data.subtype === 'summarize' && (
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40 block">Nível de detalhe</label>
                      {['concise', 'balanced', 'extensive'].map(lvl => (
                        <button
                          key={lvl}
                          onClick={() => updateNodeConfig(selectedNode.id, { level: lvl })}
                          className={`w-full text-left px-5 py-3.5 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${selectedNode.data.config?.level === lvl ? 'btn-primary-gradient border-transparent shadow-lg' : 'bg-white text-foreground/40 border-castanha-100 hover:border-castanha-300'}`}
                        >
                          {({ concise: 'conciso', balanced: 'equilibrado', extensive: 'detalhado', standard: 'padrão', deep_scan: 'análise profunda', formal: 'formal', conciliatory: 'conciliador', aggressive: 'incisivo' } as Record<string, string>)[lvl] ?? lvl}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Email Config */}
                  {selectedNode.data.subtype === 'email_client' && (
                    <div className="space-y-6">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40 block mb-3">Destinatário</label>
                        <input
                          type="email"
                          placeholder="cliente@escritorio.com.br"
                          value={selectedNode.data.config?.recipient || ''}
                          className="w-full bg-castanha-50 border border-transparent rounded-2xl px-4 py-3.5 text-[11px] font-bold text-foreground outline-none focus:border-foreground/10 focus:bg-white transition-all shadow-inner"
                          onChange={(e) => updateNodeConfig(selectedNode.id, { recipient: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40 block mb-3">Assunto</label>
                        <input
                          type="text"
                          placeholder="ex.: Revisão de contrato"
                          value={selectedNode.data.config?.subject || ''}
                          className="w-full bg-castanha-50 border border-transparent rounded-2xl px-4 py-3.5 text-[11px] font-bold text-foreground outline-none focus:border-foreground/10 focus:bg-white transition-all shadow-inner"
                          onChange={(e) => updateNodeConfig(selectedNode.id, { subject: e.target.value })}
                        />
                      </div>
                      <div className="pt-2">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={selectedNode.data.config?.useDocuSign || false}
                              onChange={(e) => updateNodeConfig(selectedNode.id, { useDocuSign: e.target.checked })}
                            />
                            <div className="w-10 h-6 bg-castanha-100 rounded-full peer peer-checked:bg-foreground transition-all"></div>
                            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-all shadow-sm"></div>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 group-hover:text-foreground transition-colors">Solicitar assinatura digital</span>
                        </label>
                        <p className="text-[8px] text-foreground/20 mt-2 uppercase tracking-tight italic">Usa o DocuSign para garantir validade jurídica</p>
                      </div>
                    </div>
                  )}

                  {/* Risk Analysis Config */}
                  {selectedNode.data.subtype === 'risk_analysis' && (
                    <div className="space-y-3">
                      <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40 block">Profundidade da análise</label>
                      {['standard', 'deep_scan'].map(depth => (
                        <button
                          key={depth}
                          onClick={() => updateNodeConfig(selectedNode.id, { depth })}
                          className={`w-full text-left px-5 py-3.5 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${selectedNode.data.config?.depth === depth ? 'btn-primary-gradient border-transparent shadow-lg' : 'bg-white text-foreground/40 border-castanha-100 hover:border-castanha-300'}`}
                        >
                          {({ concise: 'conciso', balanced: 'equilibrado', extensive: 'detalhado', standard: 'padrão', deep_scan: 'análise profunda', formal: 'formal', conciliatory: 'conciliador', aggressive: 'incisivo' } as Record<string, string>)[depth] ?? depth.replace('_', ' ')}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Draft Reply Config */}
                  {selectedNode.data.subtype === 'draft_reply' && (
                    <div className="space-y-6">
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40 block mb-3">Tom</label>
                        {['formal', 'conciliatory', 'aggressive'].map(tone => (
                          <button
                            key={tone}
                            onClick={() => updateNodeConfig(selectedNode.id, { tone })}
                            className={`w-full text-left px-5 py-3 rounded-2xl border text-[10px] font-bold uppercase tracking-widest mb-2 transition-all ${selectedNode.data.config?.tone === tone ? 'btn-primary-gradient border-transparent shadow-lg' : 'bg-white text-foreground/40 border-castanha-100 hover:border-castanha-200'}`}
                          >
                            {({ concise: 'conciso', balanced: 'equilibrado', extensive: 'detalhado', standard: 'padrão', deep_scan: 'análise profunda', formal: 'formal', conciliatory: 'conciliador', aggressive: 'incisivo' } as Record<string, string>)[tone] ?? tone}
                          </button>
                        ))}
                      </div>
                      <div>
                        <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/40 block mb-3">Contexto/finalidade</label>
                        <textarea
                          placeholder="ex.: Responder a uma notificação de inadimplemento"
                          value={selectedNode.data.config?.purpose || ''}
                          className="w-full bg-castanha-50 border border-transparent rounded-2xl px-4 py-3.5 text-[11px] font-bold text-foreground outline-none focus:border-foreground/10 focus:bg-white transition-all shadow-inner h-24 resize-none"
                          onChange={(e) => updateNodeConfig(selectedNode.id, { purpose: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-20 pt-10 border-t border-castanha-50">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-castanha-50 flex items-center justify-center text-foreground/20">
                      {IconMap[selectedNode.data.subtype as string]}
                    </div>
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-foreground/40">Nó do sistema</p>
                      <p className="text-[10px] font-mono truncate max-w-[120px] text-foreground/20 italic">{selectedNode.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Real Library Tab */
          <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
            {loading ? (
              <div className="flex justify-center py-20">{Icons.plus}</div> // Spinner placeholder
            ) : workflows.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-[2.5rem] bg-castanha-50 border border-castanha-100 flex items-center justify-center text-foreground/10 mb-6 font-bold text-4xl">📄</div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Biblioteca vazia</h2>
                <p className="text-sm text-foreground/40 max-w-sm mb-10">Você ainda não salvou nenhum fluxo de automação. Crie o primeiro no canvas.</p>
                <button
                  onClick={() => setActiveTab('canvas')}
                  className="px-8 py-4 rounded-[1.5rem] text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl transition btn-primary-gradient"
                >
                  Criar fluxo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workflows.map((wf) => (
                  <div
                    key={wf._id}
                    onClick={() => loadWorkflow(wf)}
                    className="bg-white border border-castanha-100 p-6 rounded-[2.5rem] hover:shadow-xl hover:border-foreground/10 transition cursor-pointer group animate-in fade-in slide-in-from-bottom-4 duration-500"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-castanha-50 flex items-center justify-center text-foreground/40 font-bold group-hover:bg-foreground group-hover:text-white transition-all duration-300">
                        {Icons.sparkles}
                      </div>
                      <button
                        onClick={(e) => deleteWorkflow(wf._id, e)}
                        className="p-2 text-foreground/10 hover:text-red-500 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </button>
                    </div>
                    <h4 className="font-bold text-foreground text-lg mb-2">{wf.name}</h4>
                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-foreground/20">
                      <span>{wf.nodes.length} etapas</span>
                      <span>{wf.runCount} execuções</span>
                    </div>
                    <p className="mt-4 text-[10px] font-bold text-foreground/20 uppercase tracking-widest">
                      Última atualização: {new Date(wf.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <UpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        title="Criador de Fluxos"
        description="Crie automações jurídicas personalizadas e sequências de IA com nosso motor de fluxos avançado. Faça upgrade para o Pro para ter acesso completo."
      />

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </DashboardLayout>
  );
}