"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Ticket, Smartphone, Building, ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface TicketOrder {
  eventId: string
  eventTitle: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [ticketOrder, setTicketOrder] = useState<TicketOrder | null>(null)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  })
  const [paymentMethod, setPaymentMethod] = useState("gopay")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const orderData = localStorage.getItem("ticketOrder")
    if (orderData) {
      setTicketOrder(JSON.parse(orderData))
    } else {
      router.push("/events")
    }

    // Pre-fill user info if logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setCustomerInfo((prev) => ({
        ...prev,
        name: `${user.first_name} ${user.last_name}`.trim(),
        email: user.email,
      }))
    }
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!ticketOrder) return

    setLoading(true)

    try {
      const token = localStorage.getItem("token")
      const payload = {
        event_id: ticketOrder.eventId,
        quantity: ticketOrder.quantity,
        customer_name: customerInfo.name,
        customer_email: customerInfo.email,
        customer_phone: customerInfo.phone,
        payment_method: paymentMethod,
        notes: customerInfo.notes,
      }

      const response = await fetch("http://localhost:8000/api/tickets/create-order/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Token ${token}` }),
        },
        body: JSON.stringify(payload),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.removeItem("ticketOrder")
        localStorage.setItem("orderSuccess", JSON.stringify(data))
        router.push("/tickets/success")
      } else {
        alert(data.error || "Terjadi kesalahan saat memproses pesanan")
      }
    } catch (error) {
      alert("Terjadi kesalahan koneksi")
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`
  }

  if (!ticketOrder) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Memuat data pesanan...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="outline" onClick={() => router.back()} className="rounded-full mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent font-orbitron">
              Checkout Tiket
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Customer Information */}
                <Card className="bg-white/90 backdrop-blur-sm border-3 border-pink-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 font-orbitron">Informasi Pemesan</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nama Lengkap *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        className="rounded-full"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        className="rounded-full"
                        placeholder="Masukkan email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Nomor Telepon *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        className="rounded-full"
                        placeholder="Masukkan nomor telepon"
                      />
                    </div>
                    <div>
                      <Label htmlFor="notes">Catatan (Opsional)</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={customerInfo.notes}
                        onChange={handleInputChange}
                        className="rounded-2xl"
                        placeholder="Catatan tambahan untuk pesanan"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card className="bg-white/90 backdrop-blur-sm border-3 border-purple-200 rounded-3xl">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 font-orbitron">Metode Pembayaran</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-green-300 transition-colors">
                          <RadioGroupItem value="gopay" id="gopay" />
                          <Smartphone className="w-6 h-6 text-green-500" />
                          <Label htmlFor="gopay" className="flex-1 cursor-pointer">
                            <div className="font-semibold">GoPay</div>
                            <div className="text-sm text-gray-500">Bayar dengan GoPay</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-blue-300 transition-colors">
                          <RadioGroupItem value="ovo" id="ovo" />
                          <Smartphone className="w-6 h-6 text-blue-500" />
                          <Label htmlFor="ovo" className="flex-1 cursor-pointer">
                            <div className="font-semibold">OVO</div>
                            <div className="text-sm text-gray-500">Bayar dengan OVO</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-purple-300 transition-colors">
                          <RadioGroupItem value="dana" id="dana" />
                          <Smartphone className="w-6 h-6 text-purple-500" />
                          <Label htmlFor="dana" className="flex-1 cursor-pointer">
                            <div className="font-semibold">DANA</div>
                            <div className="text-sm text-gray-500">Bayar dengan DANA</div>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-red-300 transition-colors">
                          <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                          <Building className="w-6 h-6 text-red-500" />
                          <Label htmlFor="bank_transfer" className="flex-1 cursor-pointer">
                            <div className="font-semibold">Transfer Bank</div>
                            <div className="text-sm text-gray-500">Transfer ke rekening bank</div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg py-6 shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {loading ? "Memproses Pesanan..." : "Bayar Sekarang"}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="bg-white/90 backdrop-blur-sm border-3 border-blue-200 rounded-3xl sticky top-4">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 font-orbitron">Ringkasan Pesanan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">{ticketOrder.eventTitle}</h4>
                    <div className="flex items-center text-gray-600">
                      <Ticket className="w-4 h-4 mr-2" />
                      <span>{ticketOrder.quantity} tiket</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Harga per tiket:</span>
                      <span>{formatPrice(ticketOrder.unitPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jumlah tiket:</span>
                      <span>{ticketOrder.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Biaya admin:</span>
                      <span>Rp 5.000</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-pink-600">{formatPrice(ticketOrder.totalPrice + 5000)}</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                      <div className="text-sm text-yellow-800">
                        <p className="font-semibold mb-1">Informasi Penting:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Tiket akan dikirim ke email Anda</li>
                          <li>Simpan tiket untuk ditunjukkan saat masuk</li>
                          <li>Tiket tidak dapat dikembalikan</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
