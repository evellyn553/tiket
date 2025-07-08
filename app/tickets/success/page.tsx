"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Home, Ticket } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SuccessPage() {
  const router = useRouter()
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    const successData = localStorage.getItem("orderSuccess")
    if (successData) {
      setOrderData(JSON.parse(successData))
      localStorage.removeItem("orderSuccess")
    } else {
      router.push("/events")
    }
  }, [router])

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border-3 border-green-200 rounded-3xl shadow-2xl">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 font-orbitron">Pesanan Berhasil!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-4">
            <p className="text-green-800 font-semibold mb-2">Nomor Pesanan:</p>
            <p className="text-2xl font-bold text-green-600 font-orbitron">{orderData.order_number}</p>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">
              Tiket Anda telah berhasil dipesan! Silakan lakukan pembayaran untuk mengaktifkan tiket.
            </p>
            <p className="text-sm text-gray-500">Instruksi pembayaran telah dikirim ke email Anda.</p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/tickets")}
              className="w-full rounded-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <Ticket className="w-4 h-4 mr-2" />
              Lihat Tiket Saya
            </Button>
            <Button onClick={() => router.push("/")} variant="outline" className="w-full rounded-full">
              <Home className="w-4 h-4 mr-2" />
              Kembali ke Beranda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
