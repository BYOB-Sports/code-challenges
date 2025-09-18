"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RatingInput } from "@/components/rating-input"
import { useReviews } from "@/store/useReviews"
import { useToast } from "@/hooks/use-toast"

interface ReviewFormProps {
  courtId: string
  courtName: string
  isOpen: boolean
  onClose: () => void
}

export function ReviewForm({ courtId, courtName, isOpen, onClose }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [title, setTitle] = useState("")
  const [text, setText] = useState("")
  const [user, setUser] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { addReview } = useReviews()
  const { toast } = useToast()

  const isValid = rating > 0 && text.trim().length >= 10

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValid) return

    setIsSubmitting(true)

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      addReview({
        courtId,
        rating,
        title: title.trim() || undefined,
        text: text.trim(),
        user: user.trim() || undefined,
      })

      toast({
        title: "Review submitted!",
        description: "Thank you for your feedback.",
      })

      // Reset form
      setRating(0)
      setTitle("")
      setText("")
      setUser("")
      onClose()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md mx-4 max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Star className="h-5 w-5" />
            Review {courtName}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div className="space-y-3">
              <Label htmlFor="rating" className="text-sm font-medium">
                Rating <span className="text-destructive">*</span>
              </Label>
              <div className="space-y-2">
                <RatingInput value={rating} onChange={setRating} />
                <p className="text-xs text-muted-foreground">
                  {rating === 0
                    ? "Select a rating"
                    : rating === 1
                      ? "Poor"
                      : rating <= 2
                        ? "Fair"
                        : rating <= 3
                          ? "Good"
                          : rating <= 4
                            ? "Very Good"
                            : "Excellent"}
                </p>
              </div>
            </div>

            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="user" className="text-sm font-medium">
                Display Name (Optional)
              </Label>
              <Input
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Your name"
                maxLength={50}
                disabled={isSubmitting}
                className="h-11"
              />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium">
                Review Title (Optional)
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                maxLength={100}
                disabled={isSubmitting}
                className="h-11"
              />
            </div>

            {/* Review Text */}
            <div className="space-y-2">
              <Label htmlFor="text" className="text-sm font-medium">
                Your Review <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your experience with this tennis court..."
                rows={4}
                maxLength={500}
                disabled={isSubmitting}
                className="resize-none min-h-[100px]"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{text.length < 10 ? `${10 - text.length} more characters needed` : "✓ Minimum length met"}</span>
                <span>{text.length}/500</span>
              </div>
            </div>
          </form>
        </div>

        <div className="px-6 py-4 border-t bg-background shrink-0">
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 h-11 bg-transparent"
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!isValid || isSubmitting} className="flex-1 h-11">
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
