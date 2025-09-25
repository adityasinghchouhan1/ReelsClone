import { IVideo } from '@/modals/Video'
import Link from 'next/link'
import { IKVideo } from 'imagekitio-react'
const VideoComponent = ({ video }: { video: IVideo }) => {
  return (
    <div className="card bg-base-100 shadow hover:shadow-lg transition-all duration-300">
      <figure className="relative px-4 pt-4">
        <Link href={`/videos/${video._id}`} className="relative group w-full">
          <div className="rounded-xl overflow-hidden relative w-full">
            <IKVideo
              path={video.videoUrl}
              transformation={[{ height: '1920', width: '1080' }]}
              controls={video.controls}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      </figure>
      <div className="card-body">
        <Link
          href={`/video/${video._id}`}
          className="hover:opacity-80 transition-opacity"
        >
          <h2 className="card-title text-lg">{video.title}</h2>
        </Link>
      </div>
    </div>
  )
}

export default VideoComponent
