import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryGridSection } from '@/components/home/CategoryGridSection';
import { NewArrivalsSection } from '@/components/home/NewArrivalsSection';
import { SignatureEditSection } from '@/components/home/SignatureEditSection';
import { BrandStorySection } from '@/components/home/BrandStorySection';
import { BestsellersSection } from '@/components/home/BestsellersSection';
import { JournalSection } from '@/components/home/JournalSection';
import { ReviewsSection } from '@/components/home/ReviewsSection';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <NewArrivalsSection />
      <CategoryGridSection />
      <SignatureEditSection />
      <BrandStorySection />
      <BestsellersSection />
      <JournalSection />
      <ReviewsSection />
    </div>
  );
}
