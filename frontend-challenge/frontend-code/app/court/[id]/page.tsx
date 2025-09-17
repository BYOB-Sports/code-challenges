"use client"

import { useState, useEffect, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, MapPin, Clock, Zap, Home, Users, DollarSign, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RatingStars } from "@/components/rating-stars"
import { ReviewForm } from "@/components/review-form"
import { courts } from "@/data/courts"
import { useReviews } from "@/store/useReviews"
import { calculateAverageRating } from "@/lib/rating"
import type { Court } from "@/types"

export default function CourtDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courtId = params.id as string

  const { reviews, loadReviews } = useReviews()
  const [court, setCourt] = useState<Court | null>(null)
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false)

  // Load reviews on mount
  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  // Find the court
  useEffect(() => {
    const foundCourt = courts.find((c) => c.id === courtId)
    if (foundCourt) {
      setCourt(foundCourt)
    }
  }, [courtId])

  // Get reviews for this court and calculate updated rating
  const courtReviews = useMemo(() => {
    return reviews.filter((review) => review.courtId === courtId)
  }, [reviews, courtId])

  const updatedCourt = useMemo(() => {
    if (!court) return null

    if (courtReviews.length > 0) {
      return {
        ...court,
        rating: calculateAverageRating(courtReviews),
        reviewsCount: courtReviews.length,
      }
    }
    return court
  }, [court, courtReviews])

  if (!updatedCourt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Court not found</p>
          <Button variant="outline" onClick={() => router.push("/")} className="mt-4">
            Back to Courts
          </Button>
        </div>
      </div>
    )
  }

  const formatTime = (timeStr: string) => {
    if (timeStr === "Closed" || !timeStr) return "Closed"
    return timeStr
  }

  const getCurrentDayStatus = () => {
    const now = new Date()
    const dayNames = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]
    const today = dayNames[now.getDay()] as keyof Court["openingHours"]
    const todayHours = updatedCourt.openingHours[today]

    if (todayHours === "Closed" || !todayHours) {
      return { status: "Closed", hours: "Closed today" }
    }

    return { status: "Open", hours: `Today: ${todayHours}` }
  }

  const dayStatus = getCurrentDayStatus()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-9 w-9 p-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground truncate flex-1">{updatedCourt.name}</h1>
          </div>
        </div>
      </header>

      <main className="container max-w-md mx-auto px-4 pb-20">
        {/* Hero Image */}
        <div className="relative h-48 rounded-lg overflow-hidden mb-4 mt-4">
          <Image
            src={updatedCourt.thumbnailUrl || "/placeholder.svg"}
            alt={updatedCourt.name}
            fill
            className="object-cover"
            sizes="(max-width: 448px) 100vw, 448px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Court Info */}
        <div className="space-y-4">
          {/* Basic Info */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">{updatedCourt.name}</h2>
            <div className="flex items-start gap-2 text-muted-foreground mb-3">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p>{updatedCourt.address}</p>
                <p>
                  {updatedCourt.city}, {updatedCourt.state}
                </p>
              </div>
            </div>

            {/* Rating Summary */}
            <div className="flex items-center gap-3 mb-4">
              <RatingStars rating={updatedCourt.rating} size="lg" />
              <div className="text-sm">
                <span className="font-medium text-foreground">{updatedCourt.rating.toFixed(1)}</span>
                <span className="text-muted-foreground ml-1">
                  ({updatedCourt.reviewsCount} review{updatedCourt.reviewsCount !== 1 ? "s" : ""})
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <Badge variant="secondary" className="capitalize">
                {updatedCourt.surface} Court
              </Badge>
              {updatedCourt.lights && (
                <Badge variant="outline">
                  <Zap className="h-3 w-3 mr-1" />
                  Lights
                </Badge>
              )}
              {updatedCourt.indoor && (
                <Badge variant="outline">
                  <Home className="h-3 w-3 mr-1" />
                  Indoor
                </Badge>
              )}
              <Badge variant="outline">
                <Users className="h-3 w-3 mr-1" />
                {updatedCourt.courtsCount} Court{updatedCourt.courtsCount !== 1 ? "s" : ""}
              </Badge>
              <Badge
                variant={updatedCourt.isFree ? "default" : "outline"}
                className={updatedCourt.isFree ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <DollarSign className="h-3 w-3 mr-1" />
                {updatedCourt.isFree ? "Free" : "Paid"}
              </Badge>
            </div>
          </div>

          {/* Opening Hours */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Opening Hours
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Today</span>
                  <div className="text-right">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        dayStatus.status === "Open"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                      }`}
                    >
                      {dayStatus.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{dayStatus.hours}</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-1.5">
                  {Object.entries(updatedCourt.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between text-sm">
                      <span className="capitalize text-muted-foreground">
                        {day === "mon"
                          ? "Monday"
                          : day === "tue"
                            ? "Tuesday"
                            : day === "wed"
                              ? "Wednesday"
                              : day === "thu"
                                ? "Thursday"
                                : day === "fri"
                                  ? "Friday"
                                  : day === "sat"
                                    ? "Saturday"
                                    : "Sunday"}
                      </span>
                      <span className="text-foreground">{formatTime(hours)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Map view</p>
                  <p className="text-xs">
                    Lat: {updatedCourt.lat.toFixed(4)}, Lng: {updatedCourt.lng.toFixed(4)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Star className="h-4 w-4" />
                Reviews ({updatedCourt.reviewsCount})
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {courtReviews.length === 0 ? (
                <div className="text-center py-8">
                  <Star className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground mb-2">No reviews yet</p>
                  <p className="text-sm text-muted-foreground">Be the first to review this court!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {courtReviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <RatingStars rating={review.rating} size="sm" />
                          <span className="text-sm font-medium text-foreground">{review.user || "Anonymous"}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {review.title && <h4 className="text-sm font-medium text-foreground">{review.title}</h4>}
                      <p className="text-sm text-muted-foreground">{review.text}</p>
                      {courtReviews.indexOf(review) < courtReviews.slice(0, 3).length - 1 && (
                        <Separator className="mt-4" />
                      )}
                    </div>
                  ))}
                  {courtReviews.length > 3 && (
                    <div className="text-center pt-2">
                      <Button variant="outline" size="sm">
                        View All Reviews ({courtReviews.length})
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Floating Write Review Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <Button onClick={() => setIsReviewFormOpen(true)} className="shadow-lg">
          <Star className="h-4 w-4 mr-2" />
          Write a Review
        </Button>
      </div>

      {/* Review Form Modal */}
      <ReviewForm
        courtId={courtId}
        courtName={updatedCourt.name}
        isOpen={isReviewFormOpen}
        onClose={() => setIsReviewFormOpen(false)}
      />
    </div>
  )
}
