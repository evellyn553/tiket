import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  MapPin,
  Star,
  Ticket,
  Users,
  Music,
  Sparkles,
  Heart,
  Instagram,
  MessageCircle,
  Send,
  Trophy,
  Mic,
  Camera,
  Zap,
  Crown,
  Gift,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function OtakuFestHomepage() {
  const featuredEvents = [
    {
      id: 1,
      title: "Tokyo Anime Festival 2024",
      date: "March 15-17, 2024",
      location: "Convention Center Tokyo",
      image: "/placeholder.svg?height=200&width=300",
      price: "¥3,500",
      category: "Festival",
      status: "Hot",
    },
    {
      id: 2,
      title: "Sakura Matsuri Cosplay",
      date: "April 8, 2024",
      location: "Shibuya Park",
      image: "/placeholder.svg?height=200&width=300",
      price: "¥1,200",
      category: "Cosplay",
      status: "New",
    },
    {
      id: 3,
      title: "Anisong Live Concert",
      date: "May 20, 2024",
      location: "Tokyo Dome",
      image: "/placeholder.svg?height=200&width=300",
      price: "¥4,800",
      category: "Concert",
      status: "Popular",
    },
  ]

  const cosplayEvents = [
    {
      title: "Spring Cosplay Championship",
      date: "April 15, 2024",
      participants: "500+",
      prize: "¥100,000",
      theme: "Magical Girls",
    },
    {
      title: "Shounen Heroes Contest",
      date: "May 3, 2024",
      participants: "300+",
      prize: "¥75,000",
      theme: "Battle Anime",
    },
  ]

  const anisongConcerts = [
    {
      title: "LiSA Live Performance",
      date: "June 10, 2024",
      venue: "Budokan",
      status: "Sold Out",
      artist: "LiSA",
    },
    {
      title: "Yoasobi Special Night",
      date: "July 5, 2024",
      venue: "Tokyo International Forum",
      status: "Available",
      artist: "YOASOBI",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b-4 border-pink-200 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent font-orbitron">
                  OtakuFest
                </span>
                <div className="text-xs text-gray-500 font-medium">Your Anime Adventure Starts Here!</div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="relative group">
                <span className="text-gray-700 hover:text-pink-500 font-medium transition-all duration-300 group-hover:scale-110">
                  Home
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#" className="relative group">
                <span className="text-gray-700 hover:text-pink-500 font-medium transition-all duration-300 group-hover:scale-110">
                  Events
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#" className="relative group">
                <span className="text-gray-700 hover:text-pink-500 font-medium transition-all duration-300 group-hover:scale-110">
                  Tickets
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link href="#" className="relative group">
                <span className="text-gray-700 hover:text-pink-500 font-medium transition-all duration-300 group-hover:scale-110">
                  Contact
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="rounded-full border-2 border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent hover:scale-105 transition-all duration-300"
              >
                Login
              </Button>
              <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 shadow-lg">
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-300/20 via-purple-300/20 to-blue-300/20"></div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-pink-300/30 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-purple-300/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-blue-300/30 rounded-full blur-xl animate-bounce delay-1000"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0 rounded-full px-6 py-2 text-sm font-medium animate-pulse">
                    <Zap className="w-4 h-4 mr-2" />
                    New Events Added Daily!
                  </Badge>
                </div>

                <h1 className="text-6xl lg:text-8xl font-bold leading-tight font-orbitron">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
                    Welcome to
                  </span>
                  <br />
                  <span className="text-gray-800 relative">
                    OtakuFest!
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-spin">
                      <Star className="w-5 h-5 text-yellow-800" />
                    </div>
                  </span>
                </h1>

                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border-4 border-pink-200 shadow-xl">
                  <p className="text-xl text-gray-700 leading-relaxed font-medium">
                    🌸 Your ultimate destination for anime events, cosplay competitions, and anisong concerts!
                    <br />
                    <span className="text-pink-600 font-bold">Join thousands of otaku</span> in celebrating Japanese pop
                    culture! ✨
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-10 py-7 shadow-2xl hover:shadow-pink-300/50 hover:scale-105 transition-all duration-300"
                >
                  <Ticket className="w-6 h-6 mr-3" />
                  Browse Events
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-3 border-pink-300 text-pink-600 hover:bg-pink-50 text-lg px-10 py-7 bg-white/80 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <Users className="w-6 h-6 mr-3" />
                  Join Community
                  <Heart className="w-5 h-5 ml-2 text-red-500" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl p-8 border-4 border-pink-200 shadow-2xl hover:shadow-pink-300/30 transition-all duration-500">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Anime Festival Illustration"
                  width={500}
                  height={400}
                  className="rounded-2xl"
                />

                {/* Manga-style speech bubble */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-6 py-3 border-4 border-pink-300 shadow-lg">
                  <p className="text-pink-600 font-bold text-sm">Let's Go!</p>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-pink-300"></div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full p-4 animate-bounce shadow-lg">
                  <Star className="w-6 h-6 text-yellow-800" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-pink-400 rounded-full p-4 animate-pulse shadow-lg">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="absolute top-1/2 -right-6 bg-purple-400 rounded-full p-3 animate-bounce delay-500 shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Background decorative elements */}
              <div className="absolute top-10 -left-10 w-24 h-24 bg-purple-300/30 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 -right-10 w-32 h-32 bg-pink-300/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-blue-300/30 rounded-full blur-2xl animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 rounded-full p-1 mb-6">
              <div className="bg-white rounded-full px-8 py-3">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent font-orbitron">
                  ✨ Featured Events ✨
                </h2>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Don't miss out on these amazing upcoming events that will make your otaku heart sing! 🎵
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event) => (
              <Card
                key={event.id}
                className="group hover:shadow-2xl transition-all duration-500 border-3 border-pink-100 hover:border-pink-300 rounded-3xl overflow-hidden bg-white/90 backdrop-blur-sm hover:scale-105"
              >
                <div className="relative">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <Badge
                    className={`absolute top-4 left-4 rounded-full text-white font-bold ${
                      event.status === "Hot" ? "bg-red-500" : event.status === "New" ? "bg-green-500" : "bg-blue-500"
                    }`}
                  >
                    {event.status}
                  </Badge>

                  <Badge className="absolute top-4 right-4 bg-pink-500 text-white rounded-full font-medium">
                    {event.category}
                  </Badge>

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
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-purple-50 rounded-full px-4 py-2">
                      <MapPin className="w-5 h-5 mr-3 text-purple-500" />
                      <span className="font-medium">{event.location}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-3xl font-bold text-pink-600 font-orbitron">{event.price}</span>
                    <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-110 transition-all duration-300 shadow-lg">
                      <Ticket className="w-4 h-4 mr-2" />
                      Get Tickets
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cosplay Competition */}
      <section className="py-20 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 rounded-full p-1 mb-6">
              <div className="bg-white rounded-full px-8 py-3">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-transparent font-orbitron">
                  🎭 Cosplay Competition 🎭
                </h2>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Show off your amazing cosplay skills and compete with fellow otaku for incredible prizes! 🏆
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {cosplayEvents.map((event, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-sm border-3 border-purple-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden"
              >
                {/* Manga-style panel border */}
                <div className="absolute inset-0 border-4 border-purple-300 rounded-3xl"></div>
                <div className="absolute inset-2 border-2 border-purple-200 rounded-2xl"></div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-800 font-orbitron">{event.title}</h3>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-4 shadow-lg">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-4 border-2 border-pink-200">
                    <div className="flex items-center justify-center mb-2">
                      <Crown className="w-6 h-6 text-purple-500 mr-2" />
                      <span className="font-bold text-purple-700">Theme: {event.theme}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-pink-50 rounded-2xl p-4 text-center border-2 border-pink-200 hover:bg-pink-100 transition-colors">
                      <Calendar className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1 font-medium">Date</p>
                      <p className="font-bold text-gray-800">{event.date}</p>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-4 text-center border-2 border-purple-200 hover:bg-purple-100 transition-colors">
                      <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1 font-medium">Participants</p>
                      <p className="font-bold text-gray-800">{event.participants}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center border-3 border-yellow-300 shadow-lg">
                    <Trophy className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-1 font-medium">Grand Prize</p>
                    <p className="text-3xl font-bold text-orange-600 font-orbitron">{event.prize}</p>
                  </div>

                  <Button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all duration-300 shadow-lg text-lg py-6">
                    <Gift className="w-5 h-5 mr-2" />
                    Register Now
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Anisong Concerts */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 mb-6">
              <div className="bg-white rounded-full px-8 py-3">
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-orbitron">
                  🎵 Anisong Concerts 🎵
                </h2>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              Experience the magic of anime music live with your favorite artists and songs! 🎤
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {anisongConcerts.map((concert, index) => (
              <Card
                key={index}
                className="bg-white/90 backdrop-blur-sm border-3 border-blue-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                <div className="bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 p-8 text-white relative overflow-hidden">
                  {/* Musical notes decoration */}
                  <div className="absolute top-2 right-2 text-white/30 text-2xl">♪</div>
                  <div className="absolute bottom-2 left-2 text-white/30 text-xl">♫</div>
                  <div className="absolute top-1/2 right-1/4 text-white/20 text-lg">♪</div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <Mic className="w-8 h-8" />
                      <Badge
                        className={`${
                          concert.status === "Sold Out" ? "bg-red-500 animate-pulse" : "bg-green-500 animate-bounce"
                        } text-white rounded-full font-bold px-4 py-2`}
                      >
                        {concert.status}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 font-orbitron">{concert.title}</h3>
                    <p className="text-blue-100 font-medium mb-2">by {concert.artist}</p>
                    <p className="text-blue-100 font-medium">{concert.date}</p>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="flex items-center mb-6 bg-blue-50 rounded-full px-4 py-3 border-2 border-blue-200">
                    <MapPin className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="text-gray-700 font-medium">{concert.venue}</span>
                  </div>

                  <Button
                    className={`w-full rounded-full text-lg py-6 transition-all duration-300 ${
                      concert.status === "Sold Out"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 hover:scale-105 shadow-lg"
                    }`}
                    disabled={concert.status === "Sold Out"}
                  >
                    {concert.status === "Sold Out" ? (
                      <>
                        <Heart className="w-5 h-5 mr-2" />
                        Sold Out
                      </>
                    ) : (
                      <>
                        <Music className="w-5 h-5 mr-2" />
                        Buy Tickets
                        <Sparkles className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute bottom-10 right-1/3 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto text-white space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold font-orbitron">Stay Updated with OtakuFest! 📧</h2>
              <p className="text-xl text-pink-100 font-medium">
                Get the latest news about upcoming events, exclusive discounts, and anime culture updates! ✨
              </p>
            </div>

            <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 border-2 border-white/30">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-full bg-white/30 border-white/50 text-white placeholder:text-pink-200 backdrop-blur-sm h-12 text-lg"
                />
                <Button className="rounded-full bg-white text-pink-600 hover:bg-pink-50 px-8 h-12 hover:scale-105 transition-all duration-300 shadow-lg font-bold">
                  <Send className="w-5 h-5 mr-2" />
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 text-6xl">♪</div>
          <div className="absolute top-20 right-20 text-4xl">✨</div>
          <div className="absolute bottom-20 left-1/4 text-5xl">🎭</div>
          <div className="absolute bottom-10 right-1/3 text-3xl">🎵</div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl font-bold font-orbitron">OtakuFest</span>
                  <div className="text-xs text-gray-400">Anime • Culture • Community</div>
                </div>
              </div>
              <p className="text-gray-400 font-medium">
                Your ultimate destination for anime events and otaku culture. Join the adventure! 🌸
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-pink-400 font-orbitron">Quick Links</h4>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-pink-400 transition-colors hover:translate-x-2 duration-300"
                >
                  → Events
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-pink-400 transition-colors hover:translate-x-2 duration-300"
                >
                  → Tickets
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-pink-400 transition-colors hover:translate-x-2 duration-300"
                >
                  → About Us
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-pink-400 transition-colors hover:translate-x-2 duration-300"
                >
                  → Contact
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-purple-400 font-orbitron">Categories</h4>
              <div className="space-y-3">
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-2 duration-300"
                >
                  → Anime Festivals
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-2 duration-300"
                >
                  → Cosplay Events
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-2 duration-300"
                >
                  → Anisong Concerts
                </Link>
                <Link
                  href="#"
                  className="block text-gray-400 hover:text-purple-400 transition-colors hover:translate-x-2 duration-300"
                >
                  → Workshops
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-blue-400 font-orbitron">Follow Us</h4>
              <div className="flex space-x-4 mb-4">
                <Link
                  href="#"
                  className="bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                >
                  <Send className="w-5 h-5" />
                </Link>
              </div>
              <p className="text-gray-400 text-sm">Join our community of 50K+ otaku! 🎌</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm font-medium">
              © 2024 OtakuFest. All rights reserved. Made with ❤️ for otaku
            </p>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Powered by</span>
              <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent font-bold font-orbitron">
                Otaku ID
              </span>
              <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
