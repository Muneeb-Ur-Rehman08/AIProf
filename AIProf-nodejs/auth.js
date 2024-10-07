import supabase from './supabase.config.js';
// Sign up function
const signUpWithEmail = async (email, password) => {
  try {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    console.log('User signed up:', user);
  } catch (err) {
    console.error('Error signing up:', err.message);
  }
};

// Sign in function
const signInWithEmail = async (email, password) => {
  try {
    const {data, error} = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error signing in:', err.message);
  }
};

// Sign in with Google
// Sign in with Google
const signInWithGoogle = async (req, res) => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    res.status(200).json({ url: data.url });
  } catch (err) {
    console.error('Error with Google sign-in:', err.message);
    // Ensure res is defined before calling status
    if (res) {
      res.status(500).json({ message: 'Failed to initiate Google sign-in' });
    } else {
      console.error('Response object is undefined');
    }
  }
};

const getUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching user:', err.message);
  }
};

const getUserWithToken = async (token) => {
  try {
    const { data, error } = await supabase.auth.getUser(token?.query?.token);
    console.log(data, token?.query?.token);
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Error fetching user with token:', err.message);
  }
};

const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Error signing out:', err.message);
  }
};

export default {
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  getUser,
  getUserWithToken,
  signOut,
};
