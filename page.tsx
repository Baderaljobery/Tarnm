"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, GraduationCap, UserCheck, Settings, BarChart3, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/")
      return
    }
    
    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== "admin") {
      router.push("/")
      return
    }
    
    setUser(parsedUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  // Mock data for admin overview
  const stats = {
    totalStudents: 156,
    totalTeachers: 12,
    activeUsers: 89,
    completionRate: 78
  }

  const recentUsers = [
    { id: 1, name: "أحمد الراشد", role: "طالب", status: "نشط", joinDate: "2024-01-15" },
    { id: 2, name: "د. فاطمة حسن", role: "معلم", status: "نشط", joinDate: "2024-01-14" },
    { id: 3, name: "عمر خليل", role: "طالب", status: "غير نشط", joinDate: "2024-01-13" },
    { id: 4, name: "عائشة محمود", role: "طالب", status: "نشط", joinDate: "2024-01-12" },
    { id: 5, name: "أ. يوسف إبراهيم", role: "معلم", status: "نشط", joinDate: "2024-01-11" }
  ]

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex items-center justify-center" dir="rtl">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 font-arabic">جاري التحميل...</p>
      </div>
    </div>
  }

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
            <h1 className="text-2xl md:text-3xl font-bold text-green-800 font-arabic">لوحة تحكم المدير</h1>
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
          <h2 className="text-xl text-gray-700 mb-2 font-arabic">أهلاً وسهلاً، {user.name}</h2>
          <p className="text-gray-600 font-arabic">إدارة المستخدمين ومراقبة إحصائيات المنصة</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div>
                  <p className="text-sm text-gray-600 font-arabic">إجمالي الطلاب</p>
                  <p className="text-2xl font-bold text-blue-800 font-arabic">{stats.totalStudents}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div>
                  <p className="text-sm text-gray-600 font-arabic">إجمالي المعلمين</p>
                  <p className="text-2xl font-bold text-green-800 font-arabic">{stats.totalTeachers}</p>
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
                  <p className="text-sm text-gray-600 font-arabic">المستخدمون النشطون</p>
                  <p className="text-2xl font-bold text-yellow-800 font-arabic">{stats.activeUsers}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <UserCheck className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 space-x-reverse">
                <div>
                  <p className="text-sm text-gray-600 font-arabic">معدل الإنجاز</p>
                  <p className="text-2xl font-bold text-purple-800 font-arabic">{stats.completionRate}%</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Users Table */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-green-800 flex items-center font-arabic">
              <Settings className="w-5 h-5 ml-2" />
              نشاط المستخدمين الأخير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-green-100">
                    <TableHead className="font-semibold text-green-800 font-arabic text-right">الاسم</TableHead>
                    <TableHead className="font-semibold text-green-800 font-arabic text-right">الدور</TableHead>
                    <TableHead className="font-semibold text-green-800 font-arabic text-right">الحالة</TableHead>
                    <TableHead className="font-semibold text-green-800 font-arabic text-right">تاريخ الانضمام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow 
                      key={user.id} 
                      className="hover:bg-green-50/50 transition-colors border-green-50"
                    >
                      <TableCell className="font-medium text-gray-800 font-arabic text-right">
                        {user.name}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            user.role === "معلم" 
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100 font-arabic" 
                              : "bg-green-100 text-green-800 hover:bg-green-100 font-arabic"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            user.status === "نشط" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100 font-arabic" 
                              : "bg-red-100 text-red-800 hover:bg-red-100 font-arabic"
                          }
                        >
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-600 font-arabic text-right">
                        {new Date(user.joinDate).toLocaleDateString('ar-SA', {
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2 font-arabic">إدارة المستخدمين</h3>
              <p className="text-gray-600 text-sm font-arabic">إضافة أو تعديل أو حذف المستخدمين من المنصة</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 mb-2 font-arabic">عرض التقارير</h3>
              <p className="text-gray-600 text-sm font-arabic">إنشاء وعرض تقارير مفصلة عن المنصة</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-shadow cursor-pointer">
            <CardContent className="p-6 text-center">
              <Settings className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-purple-800 mb-2 font-arabic">إعدادات النظام</h3>
              <p className="text-gray-600 text-sm font-arabic">تكوين إعدادات وتفضيلات المنصة</p>
            </CardContent>
          </Card>
        </div>

        {/* Motivational Quote */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 shadow-lg">
            <p className="text-lg text-gray-700 mb-2 font-arabic">
              {"وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ"}
            </p>
            <p className="text-sm text-gray-600 font-arabic">
              "وتعاونوا على البر والتقوى"
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
