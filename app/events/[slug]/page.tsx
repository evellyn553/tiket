"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Star, Ticket, Users, Clock, Heart, Share2, Trophy, Music, Camera, Crown } from "lucide-react"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

interface Event {
  id: string
  title: string
  description: string
  category: string
  status: string
  start_date: string
  end_date: string
  venue: string
  location: string
  capacity: number
  price: number
  current_price: number
  is_early_bird_active: boolean
  featured_image: string
  banner_image: string
  slug: string
  tags: string[]
  requirements: string
  age_restriction: string
  cosplay_competition?: any
  anisong_concert?: any
  reviews: any[]
  average_rating: number
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [review, setReview] = useState({ rating: 5, comment: "" })

  useEffect(() => {
    if (params.slug) {
      fetchEvent(params.slug as string)
    }
  }, [params.slug])

  const fetchEvent = async (slug: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/${slug}/`)
      if (response.ok) {
        const data = await response.json()
        setEvent(data)
      } else {
        router.push("/events")
      }
    } catch (error) {
      console.error("Error fetching event:", error)
      router.push("/events")
    } finally {
      setLoading(false)
    }
  }

  const handleBuyTicket = () => {
    if (!event) return

    const ticketData = {
      eventId: event.id,
      eventTitle: event.title,
      quantity,
      unitPrice: event.current_price,
      totalPrice: event.current_price * quantity,
    }

    localStorage.setItem("ticketOrder", JSON.stringify(ticketData))
    router.push("/tickets/checkout")
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat detail acara...</p>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Acara tidak ditemukan</h2>
          <Button onClick={() => router.push("/events")}>Kembali ke Daftar Acara</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <Image
          src={event.banner_image || event.featured_image || "/placeholder.svg?height=400&width=1200"}
          alt={event.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4 font-orbitron">{event.title}</h1>
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-pink-500 text-white px-4 py-2 text-lg">{event.category}</Badge>
              {event.is_early_bird_active && (
                <Badge className="bg-green-500 text-white px-4 py-2 text-lg animate-pulse">Early Bird Active</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <Card className="bg-white/90 backdrop-blur-sm border-3 border-pink-200 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 font-orbitron">Detail Acara</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center bg-pink-50 rounded-full px-4 py-3">
                    <Calendar className="w-6 h-6 text-pink-500 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">Tanggal Mulai</p>
                      <p className="text-gray-600">{formatDate(event.start_date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-purple-50 rounded-full px-4 py-3">
                    <MapPin className="w-6 h-6 text-purple-500 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">Lokasi</p>
                      <p className="text-gray-600">
                        {event.venue}, {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-blue-50 rounded-full px-4 py-3">
                    <Users className="w-6 h-6 text-blue-500 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">Kapasitas</p>
                      <p className="text-gray-600">{event.capacity.toLocaleString()} orang</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-green-50 rounded-full px-4 py-3">
                    <Clock className="w-6 h-6 text-green-500 mr-3" />
                    <div>
                      <p className="font-semibold text-gray-800">Status</p>
                      <p className="text-gray-600">{event.status}</p>
                    </div>
                  </div>
                </div>

                {event.tags.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, index) => (
                        <Badge key={index} className="bg-gray-200 text-gray-700">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {event.requirements && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Persyaratan:</h4>
                    <p className="text-gray-700">{event.requirements}</p>
                  </div>
                )}

                {event.age_restriction && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Batasan Umur:</h4>
                    <p className="text-gray-700">{event.age_restriction}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Special Event Details */}
            {event.cosplay_competition && (
              <Card className="bg-white/90 backdrop-blur-sm border-3 border-purple-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 font-orbitron flex items-center">
                    <Camera className="w-6 h-6 mr-2 text-purple-500" />
                    Detail Kompetisi Cosplay
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-purple-50 rounded-2xl p-4">
                      <Crown className="w-6 h-6 text-purple-500 mb-2" />
                      <h4 className="font-semibold">Tema</h4>
                      <p>{event.cosplay_competition.theme}</p>
                    </div>
                    <div className="bg-yellow-50 rounded-2xl p-4">
                      <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
                      <h4 className="font-semibold">Total Hadiah</h4>
                      <p className="text-xl font-bold">{formatPrice(event.cosplay_competition.prize_pool)}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <h4 className="font-semibold mb-2">Aturan Kompetisi:</h4>
                    <p className="text-gray-700">{event.cosplay_competition.rules}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {event.anisong_concert && (
              <Card className="bg-white/90 backdrop-blur-sm border-3 border-blue-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 font-orbitron flex items-center">
                    <Music className="w-6 h-6 mr-2 text-blue-500" />
                    Detail Konser Anisong
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 rounded-2xl p-4">
                    <h4 className="font-semibold mb-2">Artis: {event.anisong_concert.artist_name}</h4>
                    <p className="text-gray-700">{event.anisong_concert.artist_bio}</p>
                  </div>
                  {event.anisong_concert.setlist.length > 0 && (
                    <div className="bg-pink-50 rounded-2xl p-4">
                      <h4 className="font-semibold mb-2">Setlist:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {event.anisong_concert.setlist.map((song: string, index: number) => (
                          <li key={index} className="text-gray-700">
                            {song}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Ticket Purchase */}
            <Card className="bg-white/90 backdrop-blur-sm border-3 border-pink-200 rounded-3xl sticky top-4">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 font-orbitron">Beli Tiket</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-pink-600 font-orbitron mb-2">
                    {formatPrice(event.current_price)}
                  </div>
                  {event.is_early_bird_active && <Badge className="bg-green-500 text-white">Harga Early Bird!</Badge>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jumlah Tiket</label>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="rounded-full"
                    >
                      -
                    </Button>
                    <span className="text-xl font-semibold px-4">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="rounded-full"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="text-2xl font-bold text-pink-600 font-orbitron">
                      {formatPrice(event.current_price * quantity)}
                    </span>
                  </div>
                  <Button
                    onClick={handleBuyTicket}
                    className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg py-6 shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <Ticket className="w-5 h-5 mr-2" />
                    Beli Tiket Sekarang
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 rounded-full bg-transparent">
                    <Heart className="w-4 h-4 mr-1" />
                    Favorit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 rounded-full bg-transparent">
                    <Share2 className="w-4 h-4 mr-1" />
                    Bagikan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Event Rating */}
            {event.reviews.length > 0 && (
              <Card className="bg-white/90 backdrop-blur-sm border-3 border-yellow-200 rounded-3xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-800 font-orbitron flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-500" />
                    Rating & Review
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-yellow-600">{event.average_rating.toFixed(1)}</div>
                    <div className="flex justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= event.average_rating ? "text-yellow-500 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{event.reviews.length} review</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
