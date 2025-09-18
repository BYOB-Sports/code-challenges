'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import StarRating from './star-rating';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { Review } from '@/lib/types';

const reviewFormSchema = z.object({
  rating: z.number().min(1, { message: 'Please select a rating.' }).max(5),
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }).max(80, { message: "Title can't exceed 80 characters."}),
  reviewText: z.string().min(10, { message: 'Review must be at least 10 characters.' }).max(500, { message: "Review can't exceed 500 characters."}),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface ReviewFormProps {
  courtId: string;
  onReviewSubmitted: (review: Omit<Review, 'id' | 'avatar' | 'author' | 'date'>) => void;
}

export default function ReviewForm({ courtId, onReviewSubmitted }: ReviewFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      title: '',
      reviewText: '',
    },
    mode: 'onChange',
  });

  async function onSubmit(data: ReviewFormValues) {
    setIsSubmitting(true);
    console.log('Submitting review for court', courtId, data);
    
    // Mock submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);

    toast({
      title: 'Review Submitted!',
      description: 'Thank you for your feedback.',
    });
    
    onReviewSubmitted({
      rating: data.rating,
      title: data.title,
      text: data.reviewText,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 py-6">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Rating</FormLabel>
              <FormControl>
                <div className="pt-1">
                  <StarRating
                    rating={field.value}
                    onRatingChange={field.onChange}
                    size={32}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reviewText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about the court conditions, amenities, and your overall experience..."
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 'Great courts, but crowded'" {...field} />
                </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting || !form.formState.isValid} className="w-full h-12 text-lg">
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Review
        </Button>
      </form>
    </Form>
  );
}
