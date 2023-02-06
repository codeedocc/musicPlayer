import React from 'react'
import { useNavigate } from 'react-router-dom'
import unknown from '../assets/unknown.jpg'

const ArtistCard = ({ track }) => {
  const navigate = useNavigate()

  return (
    <div
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={
        track?.images?.background
          ? () => navigate(`/artists/${track?.artists[0].adamid}`)
          : null
      }
    >
      <img
        src={track?.images?.background || unknown}
        alt="artist"
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle}
      </p>
    </div>
  )
}

export default ArtistCard
