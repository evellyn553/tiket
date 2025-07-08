"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Ticket, Calendar, MapPin, Download, QrCode, History } from "lucide-react"
import Image from "next/image"

interface TicketData {
  id: string
  event: {
    title: string
    start_date: string
    venue: string
    location: string
    featured_image: string
  }
  ticket_number: string
  quantity: number
  total_price: number
  status: string
  created_at: string
  qr_code: string
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserTickets()
  }, [])

  const fetchUserTickets = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setLoading(false)
        return
      }

      const response = await fetch("http://localhost:8000/api/tickets/my-tickets/", {
        headers: {
          Authorization: `Token ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setTickets(data.results || data)
      }
    } catch (error) {
      console.error("Error fetching tickets:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return `Rp ${price.toLocaleString("id-ID")}`
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-500",
      paid: "bg-green-500",
      used: "bg-blue-500",
      cancelled: "bg-red-500",
      refunded: "bg-gray-500",
    }
    return colors[status as keyof typeof colors] || "bg-gray-500"
  }

  const getStatusText = (status: string) => {
    const texts = {
      pending: "Menunggu Pembayaran",
      paid: "Sudah Dibayar",
      used: "Sudah Digunakan",
      cancelled: "Dibatalkan",
      refunded: "Dikembalikan",
    }
    return texts[status as keyof typeof texts] || status
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat tiket Anda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b-4 border-pink-200 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent font-orbitron mb-4">
              Tiket Saya
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kelola dan lihat semua tiket acara Anda di sini! 🎫
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="active" className="text-lg">
              Tiket Aktif
            </TabsTrigger>
            <TabsTrigger value="history" className="text-lg">
              Riwayat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {tickets.filter((ticket) => ["pending", "paid"].includes(ticket.status)).length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Ticket className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">Belum ada tiket aktif</h3>
                <p className="text-gray-500 mb-4">Beli tiket untuk acara favorit Anda!</p>
                <Button
                  onClick={() => (window.location.href = "/events")}
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                >
                  Jelajahi Acara
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {tickets
                  .filter((ticket) => ["pending", "paid"].includes(ticket.status))
                  .map((ticket) => (
                    <Card
                      key={ticket.id}
                      className="bg-white/90 backdrop-blur-sm border-3 border-pink-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300"
                    >
                      <div className="relative">
                        <Image
                          src={ticket.event.featured_image || "/placeholder.svg?height=150&width=400"}
                          alt={ticket.event.title}
                          width={400}
                          height={150}
                          className="w-full h-32 object-cover"
                        />
                        <Badge
                          className={`absolute top-4 right-4 ${getStatusColor(ticket.status)} text-white rounded-full font-bold`}
                        >
                          {getStatusText(ticket.status)}
                        </Badge>
                      </div>

                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 font-orbitron">{ticket.event.title}</h3>

                        <div className="space-y-3 mb-4">
                          <div className="flex items-center text-gray-600">
                            <Calendar className="w-5 h-5 mr-3 text-pink-500" />
                            <span>{formatDate(ticket.event.start_date)}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <MapPin className="w-5 h-5 mr-3 text-purple-500" />
                            <span>
                              {ticket.event.venue}, {ticket.event.location}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Ticket className="w-5 h-5 mr-3 text-blue-500" />
                            <span>
                              #{ticket.ticket_number} • {ticket.quantity} tiket
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <span className="text-2xl font-bold text-pink-600 font-orbitron">
                            {formatPrice(ticket.total_price)}
                          </span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                              <QrCode className="w-4 h-4 mr-1" />
                              QR Code
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-full bg-transparent">
                              <Download className="w-4 h-4 mr-1" />
                              Download
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="history">
            {tickets.filter((ticket) => ["used", "cancelled", "refunded"].includes(ticket.status)).length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <History className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">Belum ada riwayat tiket</h3>
                <p className="text-gray-500">Riwayat tiket yang sudah digunakan akan muncul di sini</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets
                  .filter((ticket) => ["used", "cancelled", "refunded"].includes(ticket.status))
                  .map((ticket) => (
                    <Card key={ticket.id} className="bg-white/90 backdrop-blur-sm border-2 border-gray-200 rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Image
                              src={ticket.event.featured_image || "/placeholder.svg?height=60&width=60"}
                              alt={ticket.event.title}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-bold text-gray-800">{ticket.event.title}</h4>
                              <p className="text-gray-600">#{ticket.ticket_number}</p>
                              <p className="text-sm text-gray-500">{formatDate(ticket.created_at)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${getStatusColor(ticket.status)} text-white mb-2`}>
                              {getStatusText(ticket.status)}
                            </Badge>
                            <p className="font-bold text-gray-800">{formatPrice(ticket.total_price)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
