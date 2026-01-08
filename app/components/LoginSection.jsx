'use client'

import Image from "next/image"

export default function LoginSection() {
  return (
    <div className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center font-sans">

    {/* Top Image / Logo */}
        <div className="flex justify-center mb-5">
            <Image
                src="/images/timifia_icon.jpg" 
                alt="App logo"
                width={100}
                height={100}
                className="object-contain"
                priority
            />
        </div>
      
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold">
          Access your account
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Sign in or create your account using Google
        </p>
      </div>

      {/* Google Button */}
      <div className="w-full max-w-md mx-auto px-4 sm:px-0">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-all shadow-sm hover:shadow-md font-medium text-gray-700"
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.54 1.23 8.97 3.27l6.67-6.67C35.44 2.24 30.1 0 24 0 14.64 0 6.73 5.38 2.74 13.22l7.77 6.03C12.43 13.13 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.22-.43-4.75H24v9h12.7c-.55 2.9-2.18 5.36-4.63 7.02l7.08 5.5C43.54 36.76 46.5 30.95 46.5 24z"/>
            <path fill="#FBBC05" d="M10.51 28.75c-.5-1.5-.79-3.1-.79-4.75s.29-3.25.79-4.75l-7.77-6.03C.99 16.1 0 19.97 0 24s.99 7.9 2.74 11.78l7.77-6.03z"/>
            <path fill="#34A853" d="M24 48c6.1 0 11.44-2.01 15.25-5.43l-7.08-5.5c-1.96 1.32-4.47 2.1-8.17 2.1-6.26 0-11.57-3.63-13.49-8.75l-7.77 6.03C6.73 42.62 14.64 48 24 48z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Terms */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our{' '}
          <span className="underline cursor-pointer">Terms of Service</span>{' '}
          and{' '}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>

    </div>
  )
}
