import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { usePlayer } from '../../contexts/PlayerContext';
import styles from './styles.module.scss';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'


export function Player() {

    const audioRef = useRef<HTMLAudioElement>(null)

    const {
        episodeList,
        currentEpisodeIndex,
        isPlaying,
        isLooping,
        tooglePlay,
        toogleLoop,
        setIsPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
    } = usePlayer()




    useEffect(() => {
        if (!audioRef.current) {
            return;
        }

        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying])




    const episode = episodeList[currentEpisodeIndex];



    return (
        <div className={styles.playerContainer}>
            <header>
                <img src="/playing.svg" alt="Tocando  Agora" />
                <strong>Tocando agora </strong>
            </header>

            { episode ? (

                <div className={styles.currentEpisode}>
                    <Image width={592} height={592} src={episode.thumbnail} objectFit='cover' />
                    <strong>{episode.title}</strong>
                    <span>{episode.members}</span>

                </div>

            ) : (
                <div className={styles.emptyPlayer}>
                    <strong>Selecione um podcast para ouvir.</strong>
                </div>
            )}



            <footer className={!episode ? styles.empty : ''}>
                <div className={styles.progress}>
                    <span>00:00</span>
                    <div className={styles.slider}>
                        {episode ? (
                            <Slider
                                trackStyle={{ backgroundColor: '#04d361' }}
                                railStyle={{ backgroundColor: '#9f75ff' }}
                                handleStyle={{ borderColor: '#04d361', borderWidth: 4 }}

                            />
                        ) : (
                            <div className={styles.emptySlider} />
                        )}
                    </div>
                    <span>00:00</span>
                </div>

                {episode && (
                    <audio
                        src={episode.url}
                        autoPlay
                        loop={isLooping}
                        ref={audioRef}
                        onPlay={() => setIsPlayingState(true)}
                        onPause={() => setIsPlayingState(false)}
                    />
                )}

                <div className={styles.buttons}>
                    <button type="button" disabled={!episode}>
                        <img src="/shuffle.svg" alt="embaralhar" />
                    </button>
                    <button type="button" disabled={!episode || !hasPrevious} onClick={playPrevious}>
                        <img src="/play-previous.svg" alt="Tocar anterior" />
                    </button>
                    <button
                        type="button"
                        className={styles.playButton}
                        disabled={!episode}
                        onClick={tooglePlay}

                    >
                        {isPlaying
                            ? <img src="/pause.svg" alt="Pausar" />
                            : <img src="/play.svg" alt="Tocar" />
                        }
                    </button>
                    <button type="button" disabled={!episode || !hasNext} onClick={playNext}>
                        <img src="/play-next.svg" alt="Tocar próxima" />
                    </button>
                    <button
                        type="button" 
                        disabled={!episode}
                        onClick={toogleLoop}
                        className={isLooping ? styles.isActive : ''}
                        >
                        <img src="/repeat.svg" alt="Repetir" />
                    </button>
                </div>
            </footer>
        </div>

    );
}