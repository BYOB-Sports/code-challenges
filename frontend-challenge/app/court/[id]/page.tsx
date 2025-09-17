import CourtDetailClient from '@/app/components/CourtDetailClient'
import React from 'react'


export default function CourtPage({ params }: { params: { id: string } }) {
  return <CourtDetailClient id={params.id} />
}
