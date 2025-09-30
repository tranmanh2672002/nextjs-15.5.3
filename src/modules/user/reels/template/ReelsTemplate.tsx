'use client'

import { useTranslations } from 'next-intl'

export const ReelsTemplate = () => {
  const t = useTranslations('user.reels')

  const videos = [
    {
      id: 1,
      title: 'Video 1',
    },
    {
      id: 2,
      title: 'Video 2',
    },
    {
      id: 3,
      title: 'Video 3',
    },
    {
      id: 4,
      title: 'Video 4',
    },
    {
      id: 5,
      title: 'Video 5',
    },
  ]

  return (
    <div
      className="hidden-scrollbar mx-auto h-svh max-w-[600px] overflow-y-auto bg-red-200"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      {videos.map((video) => (
        <div
          key={video.id}
          className="h-full w-full bg-blue-200"
          style={{ scrollSnapAlign: 'start' }}
        >
          {video.title}
        </div>
      ))}
    </div>
  )
}
