"use client"

import { useState, useEffect, useMemo } from "react"
import { Search, Filter, MapPin, Zap, Home } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RatingStars } from "@/components/rating-stars"
import { courts } from "@/data/courts"
import { filterCourts, sortCourts } from "@/lib/filters"
import { useReviews } from "@/store/useReviews"
import { useFilters } from "@/store/useFilters"
import { calculateAverageRating } from "@/lib/rating"

export default function CourtsListPage() {
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const { reviews, loadReviews } = useReviews()
  const { searchQuery, filters, sortBy, setSearchQuery, setFilters, setSortBy, clearFilters, hasActiveFilters } =
    useFilters()

  // Load reviews on mount
  useEffect(() => {
    loadReviews()
  }, [loadReviews])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 250)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Update court ratings with actual reviews
  const courtsWithUpdatedRatings = useMemo(() => {
    return courts.map((court) => {
      const courtReviews = reviews.filter((review) => review.courtId === court.id)
      if (courtReviews.length > 0) {
        return {
          ...court,
          rating: calculateAverageRating(courtReviews),
          reviewsCount: courtReviews.length,
        }
      }
      return court
    })
  }, [reviews])

  // Filter and sort courts
  const filteredAndSortedCourts = useMemo(() => {
    const filtered = filterCourts(courtsWithUpdatedRatings, filters, debouncedQuery)
    return sortCourts(filtered, sortBy)
  }, [courtsWithUpdatedRatings, filters, debouncedQuery, sortBy])

  const activeFilters = hasActiveFilters()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-md mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold text-foreground">Tennis Courts</h1>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courts or locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 h-9 text-sm"
              />
            </div>
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 w-9 p-0 relative bg-transparent">
                  <Filter className="h-4 w-4" />
                  {activeFilters && <div className="absolute -top-1 -right-1 h-2 w-2 bg-primary rounded-full" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh]">
                <SheetHeader>
                  <SheetTitle>Filter Courts</SheetTitle>
                </SheetHeader>
                <div className="space-y-6 py-4">
                  {/* Surface Type */}
                  <div className="space-y-2">
                    <Label>Surface Type</Label>
                    <Select
                      value={filters.surface || "any"}
                      onValueChange={(value) =>
                        setFilters({
                          ...filters,
                          surface: value === "any" ? undefined : (value as "hard" | "clay" | "grass"),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any surface" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any surface</SelectItem>
                        <SelectItem value="hard">Hard Court</SelectItem>
                        <SelectItem value="clay">Clay Court</SelectItem>
                        <SelectItem value="grass">Grass Court</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Lights */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="lights">Has Lights</Label>
                    <Switch
                      id="lights"
                      checked={filters.lights === true}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          lights: checked ? true : undefined,
                        })
                      }
                    />
                  </div>

                  {/* Indoor */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="indoor">Indoor Courts</Label>
                    <Switch
                      id="indoor"
                      checked={filters.indoor === true}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          indoor: checked ? true : undefined,
                        })
                      }
                    />
                  </div>

                  {/* Free */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="free">Free Courts</Label>
                    <Switch
                      id="free"
                      checked={filters.isFree === true}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          isFree: checked ? true : undefined,
                        })
                      }
                    />
                  </div>

                  {/* Open Now */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="open-now">Open Now</Label>
                    <Switch
                      id="open-now"
                      checked={filters.openNow === true}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          openNow: checked ? true : undefined,
                        })
                      }
                    />
                  </div>

                  {/* Minimum Rating */}
                  <div className="space-y-2">
                    <Label>Minimum Rating</Label>
                    <Select
                      value={filters.minRating?.toString() || "any"}
                      onValueChange={(value) =>
                        setFilters({
                          ...filters,
                          minRating: value === "any" ? undefined : Number.parseFloat(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any rating</SelectItem>
                        <SelectItem value="4">4+ stars</SelectItem>
                        <SelectItem value="3.5">3.5+ stars</SelectItem>
                        <SelectItem value="3">3+ stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Clear Filters */}
                  {activeFilters && (
                    <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Sort and Results Count */}
      <div className="container max-w-md mx-auto px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {filteredAndSortedCourts.length} court{filteredAndSortedCourts.length !== 1 ? "s" : ""} found
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-auto h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Best Rated</SelectItem>
              <SelectItem value="reviews">Most Reviewed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Courts List */}
      <main className="container max-w-md mx-auto px-4 py-4">
        {filteredAndSortedCourts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p className="text-lg font-medium">No courts match your search</p>
              <p className="text-sm">Try adjusting your filters or search terms</p>
            </div>
            {activeFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredAndSortedCourts.map((court) => (
              <Link key={court.id} href={`/court/${court.id}`}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 overflow-hidden relative">
                        <Image
                          src={court.thumbnailUrl || "/placeholder.svg"}
                          alt={court.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate">{court.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {court.city}, {court.state}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <RatingStars rating={court.rating} size="sm" />
                          <span className="text-xs text-muted-foreground">({court.reviewsCount})</span>
                        </div>
                        <div className="flex items-center gap-1 mt-2 flex-wrap">
                          <Badge variant="secondary" className="text-xs capitalize">
                            {court.surface}
                          </Badge>
                          {court.lights && (
                            <Badge variant="outline" className="text-xs">
                              <Zap className="h-3 w-3 mr-1" />
                              Lights
                            </Badge>
                          )}
                          {court.indoor && (
                            <Badge variant="outline" className="text-xs">
                              <Home className="h-3 w-3 mr-1" />
                              Indoor
                            </Badge>
                          )}
                          {court.isFree && (
                            <Badge variant="outline" className="text-xs text-green-600">
                              Free
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
