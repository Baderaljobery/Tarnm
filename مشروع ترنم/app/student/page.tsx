"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, RotateCcw, Trophy, LogOut } from 'lucide-react'

export default function StudentDashboard() {
  const [count, setCount] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [animateCounter, setAnimateCounter] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "student") {
      router.push("/")
      return
    }
    
    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const maxCount = 40
  const progress = (count / maxCount) * 100

  const handleIncrement = () => {
    if (count < maxCount) {
      setAnimateCounter(true)
      setCount(prev => {
        const newCount = prev + 1
        if (newCount === maxCount) {
          setShowCelebration(true)
          setTimeout(() => setShowCelebration(false), 3000)
        }
        return newCount
      })
      setTimeout(() => setAnimateCounter(false), 300)
    }
  }

  const handleReset = () => {
    setCount(0)
    setShowCelebration(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 relative" dir="rtl">
      {/* Celebration Bubbles */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-green-400 rounded-full animate-bounce opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 font-arabic">
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 className="text-2xl md:text-3xl font-bold text-green-800 font-arabic">لوحة تحكم الطالب</h1>
            <div className="h-6 w-px bg-gray-300"></div>
            <Link href="/">
              <Button variant="ghost" className="text-green-700 hover:text-green-800 font-arabic">
                <ArrowRight className="w-4 h-4 ml-2" />
                العودة للرئيسية
              </Button>
            </Link>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center mb-12">
          <h2 className="text-xl text-gray-700 mb-2 font-arabic">أهلاً وسهلاً بك، {user?.name || 'الطالب'}</h2>
          <p className="text-gray-600 font-arabic">تابع رحلة حفظ القرآن الكريم</p>
        </div>

        {/* Main Counter Card */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-green-800 font-arabic">عداد تكرار الصفحة</CardTitle>
              <p className="text-gray-600 font-arabic">اضغط على الدائرة لعد التكرارات</p>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-8">
              {/* Circular Progress Counter */}
              <div className="relative">
                <button
                  onClick={handleIncrement}
                  disabled={count >= maxCount}
                  className={`relative w-48 h-48 rounded-full border-8 border-gray-200 bg-white shadow-lg transition-all duration-300 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 ${
                    animateCounter ? 'scale-105' : 'scale-100'
                  } ${count >= maxCount ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105'}`}
                >
                  {/* Progress Ring */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-green-500"
                      strokeDasharray={`${progress * 2.64} 264`}
                      strokeLinecap="round"
                      style={{
                        transition: 'stroke-dasharray 0.3s ease-in-out'
                      }}
                    />
                  </svg>
                  
                  {/* Counter Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-green-800 font-arabic">{count}</span>
                    <span className="text-sm text-gray-600 font-arabic">/ {maxCount}</span>
                    {count >= maxCount && (
                      <Trophy className="w-6 h-6 text-yellow-500 mt-2 animate-pulse" />
                    )}
                  </div>
                </button>
              </div>

              {/* Progress Text */}
              <div className="text-center">
                <p className="text-lg font-semibold text-green-700 font-arabic">
                  {count >= maxCount ? 'مكتمل! 🎉' : `${maxCount - count} تكرار متبقي`}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Reset Button */}
              <Button
                onClick={handleReset}
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 font-arabic"
              >
                <RotateCcw className="w-4 h-4 ml-2" />
                إعادة تعيين العداد
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <p className="text-lg text-gray-700 mb-2 font-arabic">
              {"وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا"}
            </p>
            <p className="text-sm text-gray-600 font-arabic">
              "ومن يتق الله يجعل له مخرجاً"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
