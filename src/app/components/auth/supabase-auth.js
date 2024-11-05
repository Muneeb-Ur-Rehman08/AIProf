import 'animate.css'; 
import './index.css';
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useUserConversation } from '../../context/UserConversationContext';
import TD_Animation_Style_Einstein_front from '../../../assets/images/hero/3D_Animation_Style_Einstein_front.png';

export default function SupabaseAuth({ handleCancel, path }) {
  const userConversationContext = useUserConversation();
  const { session, supabase } = userConversationContext;

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center position-absolute bg-black p-0 m-0" style={{ top: "0", left: "0", width: "100%", height: "100%", zIndex: 1000, opacity: 1 }}  >
      <button 
        onClick={handleCancel} 
        className="btn btn-dark position-absolute animate__animated animate__bounceIn" 
        style={{ top: '20px', right: '20px', zIndex: 1100 }}
      >
        <i className="fa text-white fa-times" aria-hidden="true"></i> {/* Font Awesome cancel icon */}
      </button>
      <div className="row w-100 h-100 gap-5 ">
        <div className="col-lg-5 col-md-8 col-sm-10 d-flex align-items-center justify-content-center border-end border-dark animate__animated animate__fadeInLeft" id="auth-container" style={{ backgroundColor: "#0d0d0d" }} >
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
              redirectTo={`https://profai.netlify.app${path}`}
            />
          </div>
        </div>
        <div className="col-lg-7 d-none d-lg-block mx-auto animate__animated animate__backInDown" style={{ marginTop: "13%", fontSize: "25px", width: "40%" }} id="testimonial-container" >
          <div className="testimonial p-4">
            <blockquote className="text-white mb-4">
            Welcome to AIProf, we believe that artificial intelligence has the power to transform education and everyday life. Our goal is to make AI not just a concept but a practical tool that anyone can use and benefit from.
            </blockquote>
            <div className="d-flex align-items-center">
              <img src={TD_Animation_Style_Einstein_front} alt="User Avatar" className="rounded-circle me-3" width="48" height="48" />
              <span className="text-white">"Education with AIProf"
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}