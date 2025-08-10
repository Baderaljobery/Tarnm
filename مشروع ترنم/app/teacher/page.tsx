"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, TrendingUp, Calendar, LogOut } from 'lucide-react'

export default function TeacherDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "teacher") {
      router.push("/")
      return
    }
    
    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  // Mock data for students
  const students = [
    {
      id: 1,
      name: "أحمد الراشد",
      progress: 85,
      lastUpdated: "2024-01-15",
      status: "active"
    },
    {
      id: 2,
      name: "فاطمة حسن",
      progress: 92,
      lastUpdated: "2024-01-14",
      status: "active"
    },
    {
      id: 3,
      name: "عمر خليل",
      progress: 67,
      lastUpdated: "2024-01-13",
      status: "needs_attention"
    },
    {
      id: 4,
      name: "عائشة محمود",
      progress: 78,
      lastUpdated: "2024-01-15",
      status: "active"
    },
    {
      id: 5,
      name: "يوسف إبراهيم",
      progress: 95,
      lastUpdated: "2024-01-15",
      status: "excellent"
    },
    {
      id: 6,
      name: "مريم علي",
      progress: 73,
      lastUpdated: "2024-01-12",
      status: "active"
    }
  ]

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return "text-green-600"
    if (progress >= 75) return "text-blue-600"
    if (progress >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "excellent":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 font-arabic">ممتاز</Badge>
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 font-arabic">نشط</Badge>
      case "needs_attention":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 font-arabic">يحتاج متابعة</Badge>
      default:
        return <Badge variant="secondary" className="font-arabic">غير معروف</Badge>
    }
  }

  const averageProgress = Math.round(students.reduce((sum, student) => sum + student.progress, 0) / students.length)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100" dir="rtl">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button onClick={handleLogout} variant="outline" className="border-red-300 text-red-600 hover:bg-red-50 font-arabic">
            <LogOut className="w-4 h-4 ml-2" />
            تسجيل الخروج
          </Button>
          <div className="flex items-center space-x-4 space-x-reverse">
            <h1 className="text-2xl md:text-3xl font-bold text-green-800 font-arabic">لوحة تحكم المعلم</h1>
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
        <div className="text-center mb-8">
          <h2 className="text-xl text-gray-700 mb-2 font-arabic">أهلاً وسهلاً، {user?.name || 'المعلم'}</h2>
          <p className="text-gray-600 font-arabic">تابع تقدم طلابك في حفظ القرآن الكريم</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div>
                  <p className="text-sm text-gray-600 font-arabic">إجمالي الطلاب</p>
                  <p className="text-2xl font-bold text-green-800 font-arabic">{students.length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div>
                  <p className="text-sm text-gray-600 font-arabic">متوسط التقدم</p>
                  <p className="text-2xl font-bold text-blue-800 font-arabic">{averageProgress}%</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div>
                  <p className="text-sm text-gray-600 font-arabic">نشط اليوم</p>
                  <p className="text-2xl font-bold text-yellow-800 font-arabic">
                    {students.filter(s => s.lastUpdated === "2024-01-15").length}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-green-800 flex items-center font-arabic">
              <Users className="w-5 h-5 ml-2" />
              نظرة عامة على تقدم الطلاب
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-green-100">
                    <TableHead className="font-semibold text-green-800 font-arabic text-right">اسم الطالب</TableHead>
                    <TableHead className="font-semibold text-green-800 font-arabic text-right">التقدم</TableHead>
                    <TableHead className="font-semibold text-green-800 font-arabic text-right">الحالة</TableHead>
                    <TableHead className="font-semibold text-green-800 font-arabic text-right">آخر تحديث</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow 
                      key={student.id} 
                      className="hover:bg-green-50/50 transition-colors cursor-pointer border-green-50"
                    >
                      <TableCell className="font-medium text-gray-800 font-arabic text-right">
                        {student.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <span className={`font-semibold font-arabic ${getProgressColor(student.progress)}`}>
                            {student.progress}%
                          </span>
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                student.progress >= 90 ? 'bg-green-500' :
                                student.progress >= 75 ? 'bg-blue-500' :
                                student.progress >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(student.status)}
                      </TableCell>
                      <TableCell className="text-gray-600 font-arabic text-right">
                        {new Date(student.lastUpdated).toLocaleDateString('ar-SA', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Quote */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <p className="text-lg text-gray-700 mb-2 font-arabic">
              {"وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا"}
            </p>
            <p className="text-sm text-gray-600 font-arabic">
              "والذين جاهدوا فينا لنهدينهم سبلنا"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
