'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "../../components/auth/ui/button"
import { Input } from "../../components/auth/ui/input"
import { Label } from "../../components/auth/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/auth/ui/card"
import { Separator } from "../../components/auth/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/auth/ui/dialog"
import { setUser } from '../../../comon.lib'
import axios from 'axios'

export function EnhancedLoginWithSignup( {show, handleClose, setToken} : {show: boolean, handleClose: () => void, setToken: (token: any) => void} ) {
  const [values, setValues] = useState({
    email: '',
    password: '',
    fullName: '',
    signUpEmail: '',
    signUpPassword: '',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(values);
    
    e.preventDefault();
    // Add your login logic here
    if (values.email === '' || values.password === '') {
      setError('Please fill in all fields');
    } else {
      // Simulate a login process
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signin`, { email: values.email, password: values.password })
        .then(response => {
          setUser({...response?.data?.user, ...response?.data?.user?.session});
          setToken({...response?.data?.user, ...response?.data?.user?.session});
          handleClose(); // Close the modal on successful login
        })
        .catch(error => {
          setError('Invalid email or password');
        });
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Sign up attempted with:', values.fullName, values.signUpEmail, values.signUpPassword)
    setIsDialogOpen(false)
  }

  const handleGoogleSignIn = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signingoogle`, { withCredentials: true });
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error('Google Sign-In URL not found.');
      }
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      alert('An error occurred during Google Sign-In.');
    }
  };

  return (
    <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full text-black bg-black/50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[350px] bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Please sign in to continue</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    defaultValue={values.email}
                    name="email"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Enter your password" 
                    defaultValue={values.password}
                    name="password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </form>
            <div className="mt-6 space-y-2">
              <Button className="w-full bg-black text-white" type="submit" onClick={handleSubmit}>
                Sign In
              </Button>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full hover:bg-gray-200">Sign Up</Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-50 text-black">
                  <DialogHeader>
                    <DialogTitle>Create an Account</DialogTitle>
                    <DialogDescription>
                      Enter your details to create a new account.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="fullName" className="text-right">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        defaultValue={values.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                        name="fullName"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="signUpEmail" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="signUpEmail"
                        type="email"
                        defaultValue={values.signUpEmail}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="col-span-3"
                        name="signUpEmail"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="signUpPassword" className="text-right">
                        Password
                      </Label>
                      <Input
                        id="signUpPassword"
                        type="password"
                        defaultValue={values.signUpPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="col-span-3"
                        required
                        name="signUpPassword"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="w-[35%]" variant="default">
                        Create Account
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col space-y-2">
              <Button variant="outline" className="w-full hover:bg-gray-200" onClick={handleGoogleSignIn}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                  <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                </svg>
                Sign in with Google
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="link" className="w-full">Forgot Password?</Button>
          </CardFooter>
          <Button variant="outline" className="w-full hover:bg-gray-200" onClick={handleClose}>
            Close
          </Button>
        </Card>
      </motion.div>
    </div>
  )
}