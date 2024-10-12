// import './index.css'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ThemeMinimal } from '@supabase/auth-ui-shared'
import { useUserConversation } from '../../context/UserConversationContext';


export default function SupabaseAuth() {
    const userConversationContext = useUserConversation();
    const { session, supabase } = userConversationContext;


    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1c1c22', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', zIndex: 1000, opacity: 1 }}>
        <div style={{ width: '75%', maxWidth: '400px' }}>
          <Auth supabaseClient={supabase} providers={['google']} appearance={{
            theme: ThemeSupa,
          style: {
            input: {
              color: 'white',
              backgroundColor: '#1c1c22'
            }
          }
          }} />
        </div>
      </div>
    )
}