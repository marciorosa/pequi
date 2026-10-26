'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '../../services/api';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../contexts/AuthContext';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

interface UserProfile {
  fullName: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  image: string;
}

interface Subscription {
  plan: 'Free' | 'Pro';
  status: 'active' | 'inactive' | 'trial';
  startDate: Date;
  nextBillingDate: Date | null;
  features: string[];
}

export default function ProfilePage() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const [profile, setProfile] = useState<UserProfile>({
    fullName: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    image: '',
  });

  const [subscription, setSubscription] = useState<Subscription>({
    plan: 'Free',
    status: 'active',
    startDate: new Date(),
    nextBillingDate: null,
    features: [
      'Análise básica de documentos',
      'Assistência limitada no chat de IA',
      'Armazenamento de documentos (100 MB)',
      'Suporte por e-mail'
    ]
  });

  // Form state
  const [editedProfile, setEditedProfile] = useState<UserProfile>({ ...profile });
  // File upload state
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Sync with user data once user is available
    if (user) {
      setProfile(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
      }));
      fetchUserProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    // Reset the edited profile when toggling edit mode or when profile changes
    setEditedProfile({ ...profile });
  }, [isEditing, profile]);

  const fetchUserProfile = async () => {
    if (!user) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.getProfile();

      // Map backend user data to our profile structure
      if (response && response.user) {
        setProfile({
          fullName: response.user.name || user.name || '',
          email: response.user.email || user.email || '',
          company: response.user.company || '',
          role: response.user.role || '',
          phone: response.user.phone || '',
          image: response.user.image || '',
        });

        // If there's subscription data, update it
        if (response.subscription) {
          setSubscription({
            plan: response.subscription.plan || 'Free',
            status: response.subscription.status || 'active',
            startDate: new Date(response.subscription.startDate || Date.now()),
            nextBillingDate: response.subscription.nextBillingDate ? new Date(response.subscription.nextBillingDate) : null,
            features: response.subscription.features || subscription.features
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError('Falha ao carregar os dados do perfil. Atualize a página e tente novamente.');
      toast.error('Falha ao carregar os dados do perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      // Prepare data for API
      const profileData: Record<string, unknown> = {
        fullName: editedProfile.fullName,
        company: editedProfile.company,
        role: editedProfile.role,
        phone: editedProfile.phone,
      };

      // If there's a new profile image, add it
      if (profileImage) {
        profileData.image = profileImage;
      }

      // Call the API
      await authService.updateProfile(profileData);

      // Update the local state
      setProfile({ ...editedProfile });
      setIsEditing(false);
      setProfileImage(null);
      setImagePreview(null);
      toast.success('Perfil atualizado com sucesso');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Falha ao atualizar o perfil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedProfile({ ...profile });
    setIsEditing(false);
    setProfileImage(null);
    setImagePreview(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogout = () => {
    authService.logout();
    router.push('/login');
  };

  const upgradeToPro = () => {
    // Handle upgrade logic
    router.push('/dashboard/billing');
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Handle retry
  const handleRetry = () => {
    setError(null);
    fetchUserProfile();
  };

  // Handle file input change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Imagem muito grande. Selecione uma imagem com menos de 5 MB.');
        return;
      }

      // Set loading state
      setIsUploadingImage(true);

      try {
        // Create a preview URL
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(file);
          setImagePreview(reader.result as string);
          setIsUploadingImage(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error processing image:', error);
        toast.error('Falha ao processar a imagem');
        setIsUploadingImage(false);
      }
    }
  };

  // Handle password change
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit password change
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);

    // Validate passwords
    if (!passwords.currentPassword) {
      setPasswordError('A senha atual é obrigatória');
      return;
    }

    if (!passwords.newPassword) {
      setPasswordError('A nova senha é obrigatória');
      return;
    }

    if (passwords.newPassword.length < 8) {
      setPasswordError('A senha deve ter pelo menos 8 caracteres');
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('As senhas não coincidem');
      return;
    }

    setIsChangingPassword(true);

    try {
      // Call the API to change password
      await authService.changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });

      // Reset form and close modal
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangePasswordModalOpen(false);
      toast.success('Senha alterada com sucesso');
    } catch (error: unknown) {
      // Handle error message display
      let errorMessage = 'Falha ao alterar a senha. Tente novamente.';

      const err = error as { isAxiosError?: boolean; response?: { data?: { message?: string } } };
      if (err.isAxiosError && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setPasswordError(errorMessage);
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <DashboardLayout title="Perfil">
      <div className="max-w-full px-4 sm:px-6 md:px-8 mx-auto">
        {/* Header */}
        <div className="border-b border-[#e7e5e1] pb-8 mb-10">
          <div className="flex justify-between items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">Gestão de credenciais</span>
              </div>
              <h1 className="text-4xl font-medium tracking-tight text-[#10101A]">Perfil da conta</h1>
            </div>
            {!isLoading && !error && !isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.1)] font-bold text-[11px] uppercase tracking-[0.2em] btn-primary-gradient"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Editar perfil</span>
              </button>
            ) : isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 bg-white border border-[#e7e5e1] hover:bg-[#F9F8F6] text-[#525252] px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-[1.02] font-bold text-[11px] uppercase tracking-[0.2em]"
                  disabled={isSaving}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>Cancelar</span>
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/10 btn-primary-gradient"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Salvando...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Salvar alterações</span>
                    </>
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {isLoading ? (
          // Loading state
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
            <p className="text-white/70">Carregando seu perfil...</p>
          </div>
        ) : error ? (
          // Error state
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="bg-red-500/10 p-4 rounded-full">
              <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-red-400 font-medium text-lg">{error}</p>
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-md transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-white/20 focus:outline-none mt-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Tentar novamente</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Personal Info */}
            <div className="w-full lg:w-2/3 space-y-6">
            {/* Profile Card */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-[#e7e5e1] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="p-10">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A0A0A0] mb-8">Identidade</h2>
 
                  <div className="space-y-10">
                    {/* Profile Image and Name */}
                    <div className="flex flex-col sm:flex-row gap-10 items-center sm:items-start mb-12">
                      <div className="relative group">
                        <div className={`w-32 h-32 rounded-[2rem] overflow-hidden flex items-center justify-center bg-[#F9F8F6] border border-[#e7e5e1] transition-all duration-500 ${isEditing ? 'ring-8 ring-black/5' : ''}`}>
                          {isUploadingImage ? (
                            <div className="flex items-center justify-center w-full h-full bg-black/5">
                              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
                            </div>
                          ) : imagePreview ? (
                            <Image
                              src={imagePreview}
                              alt={profile.fullName}
                              width={128}
                              height={128}
                              className="object-cover w-full h-full"
                            />
                          ) : profile.image ? (
                            <Image
                              src={profile.image}
                              alt={profile.fullName}
                              width={128}
                              height={128}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="text-4xl font-light text-[#10101A]/20">
                              {profile.fullName.charAt(0) || 'U'}
                            </div>
                          )}
                        </div>
 
                        {isEditing && !isUploadingImage && (
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 rounded-[2rem] flex items-center justify-center transition-all duration-300">
                            <label htmlFor="profile-image" className="text-white bg-white/20 rounded-full p-3 hover:bg-white/40 transition-all duration-200 cursor-pointer scale-90 group-hover:scale-100">
                              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              <input
                                id="profile-image"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                              />
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4 flex-1">
                        <div>
                          <label className="block text-foreground/70 text-sm mb-1.5">Nome completo</label>
                          {!isEditing ? (
                            <div className="text-foreground text-xl font-medium">{profile.fullName || 'Não informado'}</div>
                          ) : (
                            <input
                              type="text"
                              name="fullName"
                              value={editedProfile.fullName}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow duration-200"
                              placeholder="Seu nome completo"
                            />
                          )}
                        </div>

                        <div>
                          <label className="block text-foreground/70 text-sm mb-1.5">Cargo</label>
                          {!isEditing ? (
                            <div className="text-foreground/90">{profile.role || 'Não informado'}</div>
                          ) : (
                            <input
                              type="text"
                              name="role"
                              value={editedProfile.role}
                              onChange={handleInputChange}
                              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow duration-200"
                              placeholder="Seu cargo"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Contact Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-foreground/70 text-sm mb-1.5">Endereço de e-mail</label>
                        {!isEditing ? (
                          <div className="flex items-center gap-2 text-foreground">
                            <svg className="w-4 h-4 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{profile.email || 'Não informado'}</span>
                          </div>
                        ) : (
                          <input
                            type="email"
                            name="email"
                            value={profile.email}
                            disabled
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-foreground/60 cursor-not-allowed focus:outline-none transition-shadow duration-200"
                            placeholder="Seu endereço de e-mail"
                            title="O e-mail não pode ser alterado"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-foreground/70 text-sm mb-1.5">Telefone</label>
                        {!isEditing ? (
                          <div className="flex items-center gap-2 text-foreground">
                            <svg className="w-4 h-4 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <span>{profile.phone || 'Não informado'}</span>
                          </div>
                        ) : (
                          <input
                            type="tel"
                            name="phone"
                            value={editedProfile.phone}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow duration-200"
                            placeholder="Seu telefone"
                          />
                        )}
                      </div>

                      <div>
                        <label className="block text-foreground/70 text-sm mb-1.5">Empresa</label>
                        {!isEditing ? (
                          <div className="flex items-center gap-2 text-foreground">
                            <svg className="w-4 h-4 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <span>{profile.company || 'Não informado'}</span>
                          </div>
                        ) : (
                          <input
                            type="text"
                            name="company"
                            value={editedProfile.company}
                            onChange={handleInputChange}
                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow duration-200"
                            placeholder="Sua empresa"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Card */}
              <div className="bg-white rounded-[2.5rem] overflow-hidden border border-[#e7e5e1] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                <div className="p-10">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A0A0A0] mb-8">Segurança e acesso</h2>
 
                  <div className="space-y-8">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-[#525252] text-[11px] font-bold uppercase tracking-widest">Senha</label>
                        <button
                          onClick={() => setIsChangePasswordModalOpen(true)}
                          className="text-[#10101A] font-bold text-[11px] uppercase tracking-widest border-b border-black/10 hover:border-black transition-colors"
                        >
                          Redefinir senha
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-full h-14 bg-[#F9F8F6] rounded-2xl border border-[#e7e5e1] flex items-center px-6">
                          <svg className="w-5 h-5 text-foreground/20 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span className="text-foreground/10 tracking-[0.5em]">••••••••••••</span>
                        </div>
                      </div>
                    </div>
 
                    <div>
                      <label className="text-[#525252] text-[11px] font-bold uppercase tracking-widest block mb-4">Sessão da conta</label>
                      <button
                        onClick={handleLogout}
                        className="w-full h-14 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 rounded-2xl transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.2em]"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Encerrar sessão</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Subscription */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-[#e7e5e1] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                  <div className="p-10">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#A0A0A0] mb-10">Assinatura</h2>
 
                    <div className={`relative overflow-hidden rounded-[2rem] p-8 mb-8 ${subscription.plan === 'Pro' ? 'bg-[#10101A] text-white shadow-2xl' : 'bg-[#F9F8F6] border border-[#e7e5e1]'
                      }`}>
                      {subscription.plan === 'Pro' && (
                        <div className="absolute top-0 right-0">
                          <div className="bg-white text-black text-[9px] font-bold px-4 py-2 rounded-bl-2xl shadow-xl tracking-[0.2em] uppercase">
                            Premium
                          </div>
                        </div>
                      )}
 
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-6">
                          <div className={`text-2xl font-medium tracking-tight ${subscription.plan === 'Pro' ? 'text-white font-bold' : 'text-foreground'}`}>Plano {({ Free: 'Gratuito', Pro: 'Pro' } as Record<string, string>)[subscription.plan] ?? subscription.plan}</div>
                          <div className={`text-[9px] px-3 py-1.5 rounded-full font-bold uppercase tracking-[0.1em] ${subscription.status === 'active' ? 'bg-green-500/10 text-green-500' :
                            subscription.status === 'trial' ? 'bg-blue-500/10 text-blue-500' :
                              'bg-yellow-500/10 text-yellow-500'
                            }`}>
                            {({ active: 'ativa', trial: 'teste', canceled: 'cancelada', cancelled: 'cancelada', past_due: 'em atraso', inactive: 'inativa' } as Record<string, string>)[subscription.status] ?? subscription.status}
                          </div>
                        </div>
                        <div className={`${subscription.plan === 'Pro' ? 'text-white/40' : 'text-foreground/40'} text-[10px] font-bold uppercase tracking-widest`}>
                          Membro desde: {formatDate(subscription.startDate)}
                        </div>
                      </div>
 
                      {subscription.nextBillingDate && (
                        <div className={`${subscription.plan === 'Pro' ? 'text-white/60' : 'text-foreground/60'} text-xs font-medium mb-6`}>
                          Próxima cobrança: {formatDate(subscription.nextBillingDate)}
                        </div>
                      )}
 
                      {subscription.plan !== 'Pro' && (
                        <button
                          onClick={upgradeToPro}
                          className="w-full py-4 px-6 rounded-2xl shadow-xl transition-all duration-300 font-bold text-[11px] uppercase tracking-[0.2em] btn-primary-gradient"
                        >
                          Faça upgrade para ter acesso completo
                        </button>
                      )}
                    </div>
 
                    <div className="space-y-3">
                      <div className="text-[#10101A] font-bold text-[11px] uppercase tracking-[0.15em] mb-4">Neural Capacity:</div>
                      {subscription.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-[#525252] text-[0.95rem] font-medium opacity-70">
                          <svg className="w-4 h-4 text-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
 
                <div className="bg-[#10101A] text-white rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                  <div className="p-10 relative z-10">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 mb-8">Suporte</h2>
                    <div className="space-y-4">
                      <a href="/contact" className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium text-lg tracking-tight">Central de ajuda</div>
                          <div className="text-sm text-white/40 font-medium">Tire suas dúvidas com nossa equipe</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Change Password Modal */}
      {isChangePasswordModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl border border-gray-100 w-full max-w-md p-6 animate-fade-in shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-foreground">Alterar senha</h3>
              <button
                onClick={() => setIsChangePasswordModalOpen(false)}
                className="text-foreground/70 hover:text-foreground transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {passwordError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-foreground/70 text-sm mb-1.5">
                  Senha atual
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow duration-200"
                    placeholder="Digite sua senha atual"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-foreground/70 text-sm mb-1.5">
                  Nova senha
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow duration-200"
                    placeholder="Digite sua nova senha"
                    required
                    minLength={8}
                  />
                </div>
                <p className="text-foreground/40 text-xs mt-1">A senha deve ter pelo menos 8 caracteres</p>
              </div>

              <div>
                <label className="block text-foreground/70 text-sm mb-1.5">
                  Confirmar nova senha
                </label>
                <div className="relative">
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gray-200 transition-shadow duration-200"
                    placeholder="Confirme sua nova senha"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsChangePasswordModalOpen(false)}
                  className="px-4 py-2 text-foreground/60 hover:text-foreground bg-gray-50 border border-gray-200 rounded-lg mr-2 transition-colors"
                  disabled={isChangingPassword}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-medium rounded-lg shadow-md transition-all duration-200 flex items-center btn-primary-gradient"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Salvando...</span>
                    </>
                  ) : (
                    'Salvar alterações'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
} 