import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa, ThemeMinimal } from '@supabase/auth-ui-shared'
import { useUserConversation } from '../../context/UserConversationContext';
import './index.css';
import 'animate.css'; // Import animate.css for animations

export default function SupabaseAuth({ handleCancel }) {
  const userConversationContext = useUserConversation();
  const { session, supabase } = userConversationContext;

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center position-absolute bg-black p-0 m-0" style={{ top: "0", left: "0", width: "100%", height: "100%", zIndex: 1000, opacity: 1 }}  >
      <button 
        onClick={handleCancel} 
        className="btn btn-danger position-absolute animate__animated animate__fadeIn" 
        style={{ top: '20px', right: '20px', zIndex: 1100 }}
      >
        <i className="fa fa-times" aria-hidden="true"></i> {/* Font Awesome cancel icon */}
      </button>
      <div className="row w-100 h-100 gap-5 ">
        <div className="col-lg-5 col-md-8 col-sm-10 d-flex align-items-center justify-content-center border-end border-dark animate__animated animate__fadeInUp" id="auth-container" style={{ backgroundColor: "#0d0d0d" }} >
          <div className="login-container p-4 rounded w-100">
            <h1 className="text-white mb-2">Welcome back</h1>
            <p className="text-muted mb-4">Sign in to your account</p>

            <Auth
              supabaseClient={supabase}
              providers={['google']}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brandButtonText: '#ffffff',
                      brandAccent: '#10B981', // Green button background for "Sign In"
                      brand: '#333333', // Dark background for provider buttons
                      inputBackground: '#1F1F1F', // Dark input fields
                      inputBorder: '#3B3B3B', // Border for input fields
                      inputText: '#E5E7EB', // Light input text color
                      labelText: '#E5E7EBA', // Light label text
                    },
                    fonts: {
                      bodyFontFamily: 'Inter, sans-serif',
                      buttonFontFamily: 'Inter, sans-serif',
                    },
                    fontSizes: {
                      baseInputSize: '16px',
                      baseButtonSize: '16px',
                    },
                    radii: {
                      borderRadiusButton: '0.375rem', // Border radius for buttons
                      inputBorderRadius: '0.375rem',
                    },
                  },
                },
                style: {
                  button: {
                    padding: '12px 20px',
                    backgroundColor: '#333333', // Provider button background
                    color: '#ffffff', // Text color
                    border: '1px solid #444444', // Button border
                    borderRadius: '8px',
                    fontSize: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '42px',
                    cursor: 'pointer',
                  },
                  buttonHover: {
                    backgroundColor: '#4b4b4b', // Button hover background
                    borderColor: '#ffffff', // Button hover border
                  },
                  input: {
                    backgroundColor: '#1F1F1F',
                    borderColor: '#3B3B3B',
                    color: '#E5E7EB',
                    padding: '10px',
                    borderRadius: '8px',
                  },
                  label: {
                    color: '#E5E7EB',
                    marginBottom: '6px',
                  },
                  divider: {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6B7280', // Divider text color
                    margin: '20px 0', // Margin around the divider
                    fontSize: '14px', // Font size for the divider text
                  },
                  message: {
                    color: '#F87171', // Error message color
                    backgroundColor: '#FEE2E2',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '15px',
                  },
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    divider_text: 'Or',
                    email_label: 'Email',
                    password_label: 'Password',
                    button_label: 'Sign In',
                    forgot_password_link: 'Forgot Password?',
                    sign_up_text: "Don't have an account? Sign Up Now",
                  },
                  // Added missing localization for divider
                  divider: {
                    text: 'Or',
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="col-lg-7 d-none d-lg-block mx-auto animate__animated animate__fadeInRight" style={{ marginTop: "13%", fontSize: "25px", width: "40%" }} id="testimonial-container" >
          <div className="testimonial p-4">
            <blockquote className="text-white mb-4">
              Working with @supabase has been one of the best dev experiences I've had lately. Incredibly easy to set up, great documentation, and so many fewer hoops to jump through than the competition. I definitely plan to use it on any and all future projects.
            </blockquote>
            <div className="d-flex align-items-center">
              <img src="/placeholder.svg?height=48&width=48" alt="User Avatar" className="rounded-circle me-3" width="48" height="48" />
              <span className="text-white">@thatguy_tex</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}