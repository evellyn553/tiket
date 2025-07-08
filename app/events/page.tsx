"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, MapPin, Star, Ticket, Search, Filter, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Event {
  id: string
  title: string
  category: string
  status: string
  start_date: string
  end_date: string
  venue: string
  location: string
  price: number
  current_price: number
  is_early_bird_active: boolean
  featured_image: string
  is_featured: boolean
  slug: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("")

  useEffect(() => {
    fetchEvents()
  }, [searchQuery, categoryFilter, locationFilter])

  const fetchEvents = async () => {
    try {
      let url = "http://localhost:8000/api/events/"
      const params = new URLSearchParams()

      if (searchQuery) params.append("search", searchQuery)
      if (categoryFilter !== "all") params.append("category", categoryFilter)
      if (locationFilter) params.append("location", locationFilter)

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setEvents(data.results || data)
    } catch (error) {
      console.error("Error fetching events:", error)
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
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      festival: "bg-blue-500",
      cosplay: "bg-purple-500",
      concert: "bg-pink-500",
      workshop: "bg-green-500",
      screening: "bg-orange-500",
    }
    return colors[category as keyof typeof colors] || "bg-gray-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md border-b-4 border-pink-200 shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent font-orbitron mb-4">
              Semua Acara
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan acara anime, cosplay, dan konser anisong terbaik di Indonesia! 🎌
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-3 border-pink-200 shadow-xl mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Cari acara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-full pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="festival">Festival</SelectItem>
                <SelectItem value="cosplay">Cosplay</SelectItem>
                <SelectItem value="concert">Konser</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="screening">Screening</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Lokasi..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-full"
            />

            <Button
              onClick={fetchEvents}
              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat acara...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-2xl transition-all duration-500 border-3 border-pink-100 hover:border-pink-300 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={event.featured_image || "/placeholder.svg?height=200&width=300"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <Badge
                    className={`absolute top-4 left-4 ${getCategoryColor(event.category)} text-white rounded-full font-medium`}
                  >
                    {event.category}
                  </Badge>

                  {event.is_featured && (
                    <Badge className="absolute top-4 right-4 bg-yellow-500 text-white rounded-full font-bold animate-pulse">
                      <Star className="w-4 h-4 mr-1" />
                      Unggulan
                    </Badge>
                  )}

                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-pink-50 transition-colors cursor-pointer">
                    <Heart className="w-5 h-5 text-pink-500 hover:text-red-500 transition-colors" />
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-pink-600 transition-colors font-orbitron">
                    {event.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600 bg-pink-50 rounded-full px-4 py-2">
                      <Calendar className="w-5 h-5 mr-3 text-pink-500" />
                      <span className="font-medium">{formatDate(event.start_date)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-purple-50 rounded-full px-4 py-2">
                      <MapPin className="w-5 h-5 mr-3 text-purple-500" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <span className="text-3xl font-bold text-pink-600 font-orbitron">
                        {formatPrice(event.current_price)}
                      </span>
                      {event.is_early_bird_active && (
                        <Badge className="ml-2 bg-green-500 text-white text-xs">Early Bird</Badge>
                      )}
                    </div>
                    <Link href={`/events/${event.slug}`}>
                      <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-110 transition-all duration-300 shadow-lg">
                        <Ticket className="w-4 h-4 mr-2" />
                        Detail
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {events.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">Tidak ada acara ditemukan</h3>
            <p className="text-gray-500">Coba ubah filter pencarian Anda</p>
          </div>
        )}
      </div>
    </div>
  )
}
