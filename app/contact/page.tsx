"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram, Sparkles } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert("Pesan Anda telah terkirim! Kami akan merespons dalam 1x24 jam.")
      setFormData({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      alert("Terjadi kesalahan saat mengirim pesan")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b-4 border-pink-200 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent font-orbitron mb-4">
              Hubungi Kami
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ada pertanyaan tentang acara atau butuh bantuan? Kami siap membantu Anda! 💬
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="bg-white/90 backdrop-blur-sm border-3 border-pink-200 rounded-3xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800 font-orbitron flex items-center">
                <Send className="w-6 h-6 mr-2 text-pink-500" />
                Kirim Pesan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Nama Lengkap *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="rounded-full"
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="rounded-full"
                    placeholder="Masukkan email Anda"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subjek *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="rounded-full"
                    placeholder="Subjek pesan Anda"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Pesan *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="rounded-2xl"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg py-6 shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {loading ? "Mengirim..." : "Kirim Pesan"}
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="bg-white/90 backdrop-blur-sm border-3 border-purple-200 rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 font-orbitron flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
                  Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-pink-50 rounded-2xl">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Email</h4>
                    <p className="text-gray-600">info@otakufest.id</p>
                    <p className="text-gray-600">support@otakufest.id</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-purple-50 rounded-2xl">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Telepon</h4>
                    <p className="text-gray-600">+62 21 1234 5678</p>
                    <p className="text-gray-600">+62 812 3456 7890</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-2xl">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Alamat</h4>
                    <p className="text-gray-600">Jl. Anime Lovers No. 123</p>
                    <p className="text-gray-600">Jakarta Selatan, DKI Jakarta 12345</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-2xl">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Jam Operasional</h4>
                    <p className="text-gray-600">Senin - Jumat: 09:00 - 18:00</p>
                    <p className="text-gray-600">Sabtu - Minggu: 10:00 - 16:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-white/90 backdrop-blur-sm border-3 border-blue-200 rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 font-orbitron">Ikuti Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <a
                    href="#"
                    className="flex flex-col items-center p-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Instagram className="w-8 h-8 mb-2" />
                    <span className="text-sm font-semibold">Instagram</span>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <MessageCircle className="w-8 h-8 mb-2" />
                    <span className="text-sm font-semibold">Discord</span>
                  </a>
                  <a
                    href="#"
                    className="flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    <Send className="w-8 h-8 mb-2" />
                    <span className="text-sm font-semibold">Telegram</span>
                  </a>
                </div>
                <p className="text-center text-gray-600 mt-4">Bergabunglah dengan komunitas 50K+ otaku Indonesia! 🎌</p>
              </CardContent>
            </Card>

            {/* FAQ Quick Links */}
            <Card className="bg-white/90 backdrop-blur-sm border-3 border-yellow-200 rounded-3xl shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 font-orbitron">Pertanyaan Umum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <h5 className="font-semibold text-gray-800">Bagaimana cara membeli tiket?</h5>
                    <p className="text-sm text-gray-600">Pilih acara → Klik "Beli Tiket" → Isi data → Bayar</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <h5 className="font-semibold text-gray-800">Bisakah tiket dikembalikan?</h5>
                    <p className="text-sm text-gray-600">Tiket tidak dapat dikembalikan kecuali acara dibatalkan</p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded-xl">
                    <h5 className="font-semibold text-gray-800">Metode pembayaran apa saja?</h5>
                    <p className="text-sm text-gray-600">GoPay, OVO, DANA, Transfer Bank</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
