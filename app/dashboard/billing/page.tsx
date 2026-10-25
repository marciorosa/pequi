'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DashboardLayout from '../../components/DashboardLayout';
import { stripeService } from '../../services/api';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-hot-toast';

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

// Plan interface
interface Plan {
  id: string;
  name: string;
  price: number;
  billingPeriod: 'monthly' | 'yearly';
  description: string;
  features: string[];
  isPopular?: boolean;
  priceId: string; // Stripe Price ID
}

// Subscription interface
interface Subscription {
  plan: string;
  status: 'active' | 'canceled' | 'pastDue';
  startDate: Date;
  nextBillingDate: Date;
  paymentMethod: {
    type: 'card';
    last4: string;
    expiryMonth: number;
    expiryYear: number;
    brand: string;
  };
}

// Invoice interface
interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

// ProfileData interface for type casting apiUsage
interface ProfileData {
  apiUsage?: {
    searchCount: number;
    chatCount: number;
    docsCount: number;
    vaultFolderCount: number;
    workflowCount: number;
  };
  subscription?: {
    limits?: {
      searchCount: number;
      chatCount: number;
      docsCount: number;
      vaultFolderCount: number;
      workflowCount: number;
    };
  };
}

// Component that uses useSearchParams
function BillingContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [, setSubscription] = useState<unknown>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Current profile data
  const [profileData, setProfileData] = useState<unknown>(null);

  // Current subscription
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);

  // Plans
  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      billingPeriod: 'monthly',
      description: 'Perfect for exploring our AI capabilities',
      features: [
        'Intelligence Search (5 searches)',
        'AI Legal Chat (5 messages)',
        'AI Lawyers (Access to 5 personas)',
        'No Vault/Docs access',
        'No Workflow Builder'
      ],
      priceId: 'free'
    },
    {
      id: 'pro-monthly',
      name: 'Pro Monthly',
      price: 49,
      billingPeriod: 'monthly',
      description: 'Ideal for growing law firms and active professionals',
      features: [
        'Intelligence Search (50 searches)',
        'AI Legal Chat (50 messages)',
        'Full AI Lawyers Access (All 50 personas)',
        'Document Operations (50 ops)',
        'Secure Vault (50 folders, 500MB)',
        'Advanced Workflow Builder (5 workflows)'
      ],
      isPopular: true,
      priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY as string
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 0, // Handled as custom string in UI
      billingPeriod: 'monthly',
      description: 'For large firms requiring unlimited capabilities',
      features: [
        'Unlimited Intelligence Search',
        'Unlimited AI Legal Chat',
        'Unlimited AI Lawyers Access',
        'Unlimited Document Operations',
        'Unlimited Vault Storage & Folders',
        'Unlimited Workflow Builder',
        'Dedicated Account Manager'
      ],
      priceId: 'enterprise'
    }
  ];

  useEffect(() => {
    // Check for success/error query params from Stripe redirect
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');

    if (success) {
      toast.success('Subscription updated successfully!');
    } else if (canceled) {
      toast.error('Subscription update canceled.');
    }

    fetchProfileAndSubscription();
    fetchInvoices();
  }, [searchParams]);

  const fetchProfileAndSubscription = async () => {
    try {
      setIsLoading(true);
      // Fetch both profile (for usage) and subscription (for Stripe specific data)
      const token = localStorage.getItem('token');
      const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json());

      setProfileData(profileResponse);

      const response = await stripeService.getSubscription();

      // Check if subscription exists and is active
      if (response.subscription &&
        response.subscription.plan !== 'Free' &&
        response.subscription.status === 'active') {

        // Map to our frontend subscription structure
        const mappedSubscription: Subscription = {
          plan: response.subscription.plan,
          status: response.subscription.status,
          startDate: new Date(response.subscription.startDate),
          nextBillingDate: new Date(response.subscription.nextBillingDate),
          paymentMethod: response.subscription.paymentMethod || {
            type: 'card',
            last4: '****',
            expiryMonth: 0,
            expiryYear: 0,
            brand: 'unknown'
          }
        };

        setCurrentSubscription(mappedSubscription);
      } else {
        // No active paid subscription
        setCurrentSubscription(null);
      }

      // Store full subscription data for reference
      setSubscription(response.subscription);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load billing details.');
      setCurrentSubscription(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await stripeService.getInvoices();
      setInvoices(response.invoices);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Failed to load billing history. Please try again later.');
    }
  };

  const handleSubscribe = async (plan: Plan) => {
    try {
      if (plan.id === 'free') {
        toast.success("You are already on the free plan.");
        return;
      }
      if (plan.id === 'enterprise') {
        router.push('/contact');
        return;
      }

      if (!stripePromise) {
        toast.error('Stripe is not properly configured');
        return;
      }

      setSelectedPlan(plan);

      // Show loading state
      toast.loading('Preparing checkout...');

      const { sessionId } = await stripeService.createCheckoutSession(plan.priceId);

      // Clear loading toast
      toast.dismiss();

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      if (!stripe) {
        toast.error('Failed to initialize Stripe');
        setSelectedPlan(null);
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe redirect error:', error);
        toast.error(error.message || 'Failed to redirect to checkout');
        setSelectedPlan(null);
      }
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('Error subscribing:', err);
      const errMsg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(errMsg || 'Failed to process subscription. Please try again.');
      setSelectedPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      toast.loading('Loading portal...');
      const { url } = await stripeService.createPortalSession();
      toast.dismiss();
      window.location.href = url;
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error(String(error));
      console.error('Error opening customer portal:', err);
      const errMsg = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(errMsg || 'Failed to open subscription management');
    }
  };

  // Get current plan
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _getCurrentPlan = (): Plan | undefined => {
    return plans.find(plan => plan.id === currentSubscription?.plan);
  };

  // Format currency
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (date: Date | string | null): string => {
    if (!date) return 'N/A';
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  // Get payment method icon
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _getPaymentIcon = (brand: string) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5C2 7.67157 2.67157 7 3.5 7H20.5C21.3284 7 22 7.67157 22 8.5V15.5C22 16.3284 21.3284 17 20.5 17H3.5C2.67157 17 2 16.3284 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 13L9 11V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.5 11H14.5C15.0523 11 15.5 11.4477 15.5 12V14C15.5 14.5523 15.0523 15 14.5 15H13.5C12.9477 15 12.5 14.5523 12.5 14V12C12.5 11.4477 12.9477 11 13.5 11Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M18 15V11L20 15V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'mastercard':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5C2 7.67157 2.67157 7 3.5 7H20.5C21.3284 7 22 7.67157 22 8.5V15.5C22 16.3284 21.3284 17 20.5 17H3.5C2.67157 17 2 16.3284 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="14" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="10" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'amex':
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5C2 7.67157 2.67157 7 3.5 7H20.5C21.3284 7 22 7.67157 22 8.5V15.5C22 16.3284 21.3284 17 20.5 17H3.5C2.67157 17 2 16.3284 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 13.5L7 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.5 12H8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 10.5L17 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.5 12H18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12.5 10.5L10.5 12L12.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 8.5C2 7.67157 2.67157 7 3.5 7H20.5C21.3284 7 22 7.67157 22 8.5V15.5C22 16.3284 21.3284 17 20.5 17H3.5C2.67157 17 2 16.3284 2 15.5V8.5Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M5 13.5H7M19 13.5H17M5 10.5H8M19 10.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        );
    }
  };

  // Function to handle plan change
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handlePlanChange = (planId: string) => {
    setCurrentSubscription(prev => {
      if (!prev) return null;
      return {
        ...prev,
        plan: planId,
        nextBillingDate: new Date(prev.nextBillingDate.getTime() + 30 * 24 * 60 * 60 * 1000)
      };
    });
  };

  // Function to handle cancellation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your billing period.')) {
      setCurrentSubscription(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: 'canceled'
        };
      });
    }
  };

  // Get invoice status badge
  const getInvoiceStatusBadge = (status: Invoice['status']) => {
    switch (status) {
      case 'paid':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Paid</span>;
      case 'pending':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">Pending</span>;
      case 'failed':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-700">Failed</span>;
      default:
        return null;
    }
  };

  // Render usage meter
  const renderMeter = (title: string, current: number, limit: number) => {
    const percent = limit === 0 ? 100 : Math.min(100, (current / limit) * 100);
    const strokeColor = percent > 90 ? '#E84C3D' : '#10101A';

    return (
      <div className="bg-white p-6 rounded-[2rem] border border-[#e7e5e1] shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center group hover:shadow-xl transition-all duration-500">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A0A0A0] mb-6">{title}</h4>
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="#F0F0F0" strokeWidth="6" fill="transparent" />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke={strokeColor}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 40}
              strokeDashoffset={(2 * Math.PI * 40) - (percent / 100) * (2 * Math.PI * 40)}
              className="transition-all duration-1000 ease-out"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-bold text-[#10101A] tracking-tighter">{limit === Infinity ? '∞' : current}</span>
            <span className="text-[9px] font-bold text-[#A0A0A0] uppercase tracking-widest mt-0.5">/ {limit === Infinity ? '∞' : limit}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout
      title="Billing & Subscription"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="border-b border-[#e7e5e1] pb-8 mb-12">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-black/40">Fiscal Architecture</span>
            </div>
            <h1 className="text-4xl font-medium tracking-tight text-[#10101A]">Billing & Subscription</h1>
            <p className="text-[#525252] text-lg max-w-2xl mt-4 font-medium opacity-60">Manage your neural capacity, archival access, and synchronization logs.</p>
        </div>

        {/* Credit Usage Row */}
        {(profileData as ProfileData)?.apiUsage && (profileData as ProfileData)?.subscription?.limits && (
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
               <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#A0A0A0]">Cycle Consumption</h2>
               <div className="h-px flex-1 bg-[#e7e5e1]" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {renderMeter("Search", (profileData as ProfileData).apiUsage!.searchCount, (profileData as ProfileData).subscription!.limits!.searchCount)}
              {renderMeter("Chat", (profileData as ProfileData).apiUsage!.chatCount, (profileData as ProfileData).subscription!.limits!.chatCount)}
              {renderMeter("Docs Ops", (profileData as ProfileData).apiUsage!.docsCount, (profileData as ProfileData).subscription!.limits!.docsCount)}
              {renderMeter("Vault Fol.", (profileData as ProfileData).apiUsage!.vaultFolderCount, (profileData as ProfileData).subscription!.limits!.vaultFolderCount)}
              {renderMeter("Workflows", (profileData as ProfileData).apiUsage!.workflowCount, (profileData as ProfileData).subscription!.limits!.workflowCount)}
            </div>
          </div>
        )}

        {/* Current subscription */}
        <div className="bg-white rounded-[2.5rem] p-12 mb-16 border border-[#e7e5e1] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <svg width="200" height="200" viewBox="0 0 100 100">
              <pattern id="grid-billing" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5" />
              </pattern>
              <rect width="100" height="100" fill="url(#grid-billing)" />
            </svg>
          </div>

          {currentSubscription ? (
            <>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 relative z-10">
                <div>
                  <h2 className="text-3xl font-medium tracking-tight text-[#10101A]">Active Synchronization</h2>
                  <p className="text-[#525252] font-medium opacity-60 mt-2">Manage your current neural access and billing parameters.</p>
                </div>
                <button
                  onClick={handleManageSubscription}
                  className="px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl font-bold text-[11px] uppercase tracking-[0.2em] btn-primary-gradient"
                >
                  Manage Session
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                <div className="p-8 bg-[#F9F8F6] rounded-[2rem] border border-[#e7e5e1]">
                  <h3 className="text-[#A0A0A0] text-[10px] uppercase tracking-[0.3em] font-bold mb-3">Service Tier</h3>
                  <p className="text-[#10101A] text-2xl font-bold tracking-tight">{currentSubscription.plan}</p>
                </div>
                <div className="p-8 bg-[#F9F8F6] rounded-[2rem] border border-[#e7e5e1]">
                  <h3 className="text-[#A0A0A0] text-[10px] uppercase tracking-[0.3em] font-bold mb-3">Authorization Status</h3>
                  <div className="flex items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-3 shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-pulse"></span>
                    <span className="text-[#10101A] text-2xl font-bold tracking-tight capitalize">{currentSubscription.status}</span>
                  </div>
                </div>
                <div className="p-8 bg-[#F9F8F6] rounded-[2rem] border border-[#e7e5e1]">
                  <h3 className="text-[#A0A0A0] text-[10px] uppercase tracking-[0.3em] font-bold mb-3">Spectral Renewal</h3>
                  <p className="text-[#10101A] text-2xl font-bold tracking-tight">{formatDate(currentSubscription.nextBillingDate)}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 relative z-10">
              <div className="w-24 h-24 bg-black/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-black/5">
                <svg className="w-12 h-12 text-black/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-3xl font-medium tracking-tight text-[#10101A] mb-4">Discovery Tier Access</h2>
              <p className="text-[#525252] max-w-lg mx-auto mb-10 font-medium opacity-60">You are currently operating within the discovery perimeter. Upgrade to a Core plan to unlock full architectural capacity.</p>
            </div>
          )}
        </div>

        {/* Plans */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] flex flex-col h-full ${plan.isPopular ? 'border-black shadow-2xl' : 'border-[#e7e5e1] shadow-lg'
                } p-10`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-black text-white text-[9px] font-bold tracking-[0.3em] px-6 py-3 rounded-bl-2xl uppercase">
                    Core Intelligence
                  </div>
                </div>
              )}

              <h3 className="text-2xl font-medium tracking-tight text-[#10101A] mb-2">{plan.name}</h3>
              <div className="mb-8 flex items-baseline">
                <span className="text-5xl font-bold text-[#10101A] tracking-tighter">
                  {plan.price === 0 && plan.id === 'free' ? '0' : plan.price === 0 && plan.id === 'enterprise' ? 'Custom' : `${plan.id === 'pro-monthly' ? '49' : plan.price}`}
                </span>
                {plan.price !== 0 && (
                  <span className="text-[#A0A0A0] ml-2 text-sm font-bold uppercase tracking-widest">/ {plan.billingPeriod}</span>
                )}
                {plan.price === 0 && plan.id === 'free' && (
                   <span className="text-[#A0A0A0] ml-2 text-sm font-bold uppercase tracking-widest">/ forever</span>
                )}
              </div>

              <p className="text-[#525252] mb-10 leading-relaxed font-medium opacity-60 text-sm h-12 overflow-hidden">{plan.description}</p>

              <div className="w-full h-px bg-[#e7e5e1] mb-10"></div>

              <ul className="space-y-5 mb-12 flex-grow">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-[#10101A]">
                    <div className="mt-1 mr-4 bg-black text-white rounded-full p-1 border border-white/10 scale-90">
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm font-medium opacity-80">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleSubscribe(plan)}
                disabled={isLoading || selectedPlan?.id === plan.id || currentSubscription?.plan === plan.name}
                className={`w-full py-5 px-6 mt-auto rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] transition-all duration-500 transform active:scale-95 ${plan.isPopular || plan.id === 'pro-monthly'
                  ? 'btn-primary-gradient shadow-xl'
                  : 'bg-white border-2 border-[#e7e5e1] hover:border-black text-black'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {selectedPlan?.id === plan.id ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Synchronizing...
                  </div>
                ) : currentSubscription?.plan === plan.name ? (
                  'Active Branch'
                ) : plan.id === 'free' ? (
                  'Current Level'
                ) : plan.id === 'enterprise' ? (
                  'Request Access'
                ) : (
                  'Initialize Pro'
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Billing history */}
        <div className="mb-24">
          <div className="flex items-center mb-10">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#A0A0A0] mr-6">Archival Transactions</h2>
            <div className="h-px flex-1 bg-[#e7e5e1]"></div>
          </div>

          {invoices.length > 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-[#e7e5e1] shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#e7e5e1]">
                  <thead className="bg-[#F9F8F6]">
                    <tr>
                      <th scope="col" className="px-10 py-6 text-left text-[9px] font-bold text-[#A0A0A0] uppercase tracking-[0.3em]">
                        Invoice ID
                      </th>
                      <th scope="col" className="px-10 py-6 text-left text-[9px] font-bold text-[#A0A0A0] uppercase tracking-[0.3em]">
                        Timestamp
                      </th>
                      <th scope="col" className="px-10 py-6 text-left text-[9px] font-bold text-[#A0A0A0] uppercase tracking-[0.3em]">
                        Volume
                      </th>
                      <th scope="col" className="px-10 py-6 text-left text-[9px] font-bold text-[#A0A0A0] uppercase tracking-[0.3em]">
                        Status
                      </th>
                      <th scope="col" className="px-10 py-6 text-right text-[9px] font-bold text-[#A0A0A0] uppercase tracking-[0.3em]">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e7e5e1]">
                    {invoices.map(invoice => (
                      <tr key={invoice.id} className="hover:bg-[#F9F8F6] transition-all duration-300 group">
                        <td className="px-10 py-6 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#10101A] group-hover:text-black tracking-tight">{invoice.id}</div>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap">
                          <div className="text-sm text-[#525252] font-medium opacity-60">{formatDate(invoice.date)}</div>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap">
                          <div className="text-sm font-bold text-[#10101A]">{formatCurrency(invoice.amount)}</div>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap">
                           <span className={`px-4 py-1.5 text-[9px] font-bold rounded-full uppercase tracking-widest ${invoice.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {invoice.status}
                           </span>
                        </td>
                        <td className="px-10 py-6 whitespace-nowrap text-right">
                          <a
                            href={invoice.downloadUrl}
                            className="inline-flex items-center text-black hover:scale-105 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 border-b border-black/10 hover:border-black"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4-4v12" />
                            </svg>
                            Manifest
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-[#e7e5e1] rounded-[2.5rem] shadow-lg">
              <div className="w-20 h-20 bg-[#F9F8F6] rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 border border-[#e7e5e1]">
                <svg className="w-10 h-10 text-black/10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-[#10101A] text-2xl font-medium tracking-tight mb-4">No Historical Manifests</h3>
              <p className="text-[#A0A0A0] max-w-sm mx-auto font-medium text-sm">
                Your archive of financial synchronization will be displayed here once operations commence.
              </p>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 rounded-3xl p-10 mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-foreground font-bold mb-3">Can I change plans later?</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle instantly.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-foreground font-bold mb-3">Payment methods?</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">We accept all major credit cards including Visa, MasterCard, and American Express, processed securely via Stripe.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-4 text-gray-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-foreground font-bold mb-3">Refund policy?</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">We offer a 30-day money-back guarantee. If you&apos;re not satisfied, contact our support team for a hassle-free full refund.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-foreground font-medium">Loading billing information...</div>}>
      <BillingContent />
    </Suspense>
  );
}