'use client'
import { apiClient } from '@/lib/api-client'
import { IVideo } from '@/modals/Video'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Video } from '@imagekit/next'
import VideoFeed from './components/VideoFeed'
export default function Home() {
  const [Videos, setVideos] = useState<IVideo[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await apiClient.getVideo()
        setVideos(data)
      } catch (error) {
        console.error('Error fetching videos:', error)
      }
    }
    fetchVideos()
  }, [])

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ImageKit ReelsPro</h1>
      <VideoFeed videos={Videos} />
    </main>
  )
}
