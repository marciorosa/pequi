'use client';

/** Endereço antigo dos planos do escritório: agora os planos ficam em /pricing */
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssinarRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/pricing${window.location.search}`);
  }, [router]);
  return null;
}
