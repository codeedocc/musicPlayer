import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import PlayPause from './PlayPause'
import { playPause, setActiveSong } from '../redux/features/playerSlice'
import { useGetTopChartsQuery } from '../redux/services/shazamCore'
import unknown from '../assets/unknown.jpg'

import 'swiper/css'
import 'swiper/css/free-mode'

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  const navigate = useNavigate()

  return (
    <div className="w-full flex flex-row items-center hover:bg-[#4c426e] py-2 p-4 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          src={song?.images?.coverart || unknown}
          alt={song?.title}
          className="w-20 h-20 rounded-lg"
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={song?.images?.coverart ? `/songs/${song.key}` : null}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <p
            className="text-base text-gray-300 mt-1"
            onClick={() => navigate(`/artists/${song?.artists[0].adamid}`)}
          >
            {song?.subtitle}
          </p>
        </div>
      </div>
      {song?.images?.coverart && (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      )}
    </div>
  )
}

const TopPlay = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { activeSong, isPlaying, isSwitched } = useSelector(
    (state) => state.player
  )
  const { data } = useGetTopChartsQuery()
  const divRef = useRef(null)

  const topPlays = data?.slice(0, 5)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [isSwitched])

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">В тренде</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">Ещё</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song.key}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-xl">Лучшие исполнители</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">Ещё</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song.key}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <img
                src={song?.images?.background || unknown}
                alt="name"
                className="rounded-full w-full h-full object-cover cursor-pointer"
                onClick={() => navigate(`/artists/${song?.artists[0].adamid}`)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay
