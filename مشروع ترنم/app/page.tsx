"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Eye, EyeOff, User, Lock } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()



  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    const user = users[username as keyof typeof users]
    
    if (!user || user.password !== password) {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
      setIsLoading(false)
      return
    }

    // Store user info in localStorage (in real app, use proper auth)
    localStorage.setItem("user", JSON.stringify({ username, role: user.role, name: user.name }))

    // Redirect based on role
    switch (user.role) {
      case "student":
        router.push("/student")
        break
      case "teacher":
        router.push("/teacher")
        break
      case "admin":
        router.push("/admin")
        break
      default:
        setError("دور المستخدم غير صالح")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden" dir="rtl">
      {/* Enhanced Islamic Background Decorations */}
      <div className="absolute inset-0 opacity-10">
        {/* Large geometric patterns */}
        <div className="absolute top-10 right-10 w-64 h-64">
          <svg viewBox="0 0 200 200" className="w-full h-full text-green-400">
            <defs>
              <pattern id="islamicPattern1" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20,0 L40,20 L20,40 L0,20 Z" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#islamicPattern1)"/>
          </svg>
        </div>

        <div className="absolute top-20 left-20 w-48 h-48">
          <svg viewBox="0 0 200 200" className="w-full h-full text-green-300">
            <defs>
              <pattern id="islamicPattern2" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <polygon points="25,5 45,20 35,40 15,40 5,20" fill="none" stroke="currentColor" strokeWidth="1"/>
                <circle cx="25" cy="25" r="3" fill="currentColor"/>
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#islamicPattern2)"/>
          </svg>
        </div>

        <div className="absolute bottom-20 right-1/4 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full text-green-500">
            <path d="M50,10 L70,30 L50,50 L30,30 Z M50,50 L70,70 L50,90 L30,70 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        <div className="absolute bottom-32 left-1/3 w-40 h-40">
          <svg viewBox="0 0 120 120" className="w-full h-full text-green-400">
            <g transform="translate(60,60)">
              <path d="M0,-40 L20,-20 L40,-40 L20,-60 Z M0,-40 L-20,-20 L-40,-40 L-20,-60 Z M0,-40 L20,0 L40,20 L20,40 L0,20 L-20,40 L-40,20 L-20,0 Z" 
                    fill="none" stroke="currentColor" strokeWidth="1"/>
            </g>
          </svg>
        </div>

        {/* Arabic calligraphy-inspired decorative elements */}
        <div className="absolute top-1/3 right-20 text-6xl text-green-200 font-arabic opacity-30">
          ﷽
        </div>
        
        <div className="absolute bottom-1/3 left-20 text-4xl text-green-300 font-arabic opacity-40">
          الله
        </div>

        {/* Geometric border patterns */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-green-300 to-transparent opacity-50"></div>
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-transparent via-green-300 to-transparent opacity-50"></div>
        <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-transparent via-green-300 to-transparent opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-6">
            <BookOpen className="w-16 h-16 text-green-600 mx-auto mb-4" />
          </div>
          
          {/* Arabic Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-2 font-arabic">
            ترنم
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-green-700 mb-4 font-arabic">
            منصة حفظ القرآن الكريم
          </h2>
          
          <p className="text-gray-600 max-w-md mx-auto mb-6 font-arabic text-lg font-medium leading-relaxed">
            منصة متخصصة لطلاب حفظ القرآن الكريم في برامج الإتقان
          </p>
          
          <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Login Card */}
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-green-800 font-arabic">أهلاً وسهلاً بك</CardTitle>
            <CardDescription className="text-gray-600 font-arabic">
              سجل دخولك للوصول إلى لوحة التحكم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700 font-arabic text-right">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-green-800 font-medium font-arabic text-right block">
                  اسم المستخدم
                </Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pr-10 border-green-200 focus:border-green-500 focus:ring-green-500 text-right font-arabic"
                    placeholder="أدخل اسم المستخدم"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-green-800 font-medium font-arabic text-right block">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10 pl-10 border-green-200 focus:border-green-500 focus:ring-green-500 text-right font-arabic"
                    placeholder="أدخل كلمة المرور"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 font-arabic"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                    جاري تسجيل الدخول...
                  </div>
                ) : (
                  "تسجيل الدخول"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800 mb-2 font-arabic text-right">بيانات تجريبية:</p>
              <div className="text-xs text-green-700 space-y-1 font-arabic text-right">
                <div><strong>طالب:</strong> اسم المستخدم: student، كلمة المرور: student</div>
                <div><strong>معلم:</strong> اسم المستخدم: teacher، كلمة المرور: teacher</div>
                <div><strong>مدير:</strong> اسم المستخدم: admin، كلمة المرور: admin</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Quote */}
        <div className="mt-8 text-center max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <p className="text-lg text-gray-700 mb-2 font-arabic">
              {"وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
