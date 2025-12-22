import Image from "next/image"
import LoginForm from "../components/LoginForm"

export default function LoginPage() {
    return (
    <div className="h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 bg-gray-200">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white backdrop-blur-[15px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] overflow-hidden min-h-150">

        <div className="hidden md:block md:w-1/2 relative">
          <Image
            src="/images/team.jpg" 
            alt="Login Image"
            fill
            className="object-cover brightness-70"
          />
          <div className="absolute inset-0"></div>
        </div>

        <LoginForm />

      </div>
    </div>
    )
}