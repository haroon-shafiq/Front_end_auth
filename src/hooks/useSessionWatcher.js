'use client';

import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { AUTH_ERRORS } from '@/constants/enums';

export const useSessionWatcher = () => {
  const { data: session, status } = useSession();
  console.log("Session====>>>>>.", status)
  
  useEffect(() => {
    console.log("Use effect triggered, error:", session?.error)
    
    if (session?.error === AUTH_ERRORS.Refresh_Token_Expired || status == 'unauthenticated') {
      console.log("Signing out due to refresh token expiry")
      
      signOut({ callbackUrl: "/signin", redirect: 'true' })
    }
  }, [session?.error]);
};