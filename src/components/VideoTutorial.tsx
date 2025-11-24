import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';

interface Highlight {
    time: number; // Time in seconds
    text: string;
    elementId?: string;
}

interface VideoTutorialProps {
    videoUrl: string;
    title?: string;
    description?: string;
    highlights?: Highlight[];
    transcript?: Array<{ time: number; text: string }>;
}

const VideoTutorial: React.FC<VideoTutorialProps> = ({
    videoUrl,
    title,
    description,
    highlights = [],
    transcript = [],
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [activeHighlight, setActiveHighlight] = useState<Highlight | null>(null);
    const [showTranscript, setShowTranscript] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => {
            setCurrentTime(video.currentTime);

            // Check for active highlight
            const active = highlights.find(
                (h) => video.currentTime >= h.time && video.currentTime < h.time + 2
            );
            setActiveHighlight(active || null);

            // Highlight corresponding text element if elementId is provided
            if (active?.elementId) {
                const element = document.getElementById(active.elementId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    element.classList.add('highlight-active');
                    setTimeout(() => {
                        element.classList.remove('highlight-active');
                    }, 2000);
                }
            }
        };

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleEnded = () => setIsPlaying(false);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('play', handlePlay);
        video.addEventListener('pause', handlePause);
        video.addEventListener('ended', handleEnded);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('play', handlePlay);
            video.removeEventListener('pause', handlePause);
            video.removeEventListener('ended', handleEnded);
        };
    }, [highlights]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const toggleFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        if (!isFullscreen) {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    const handleSeek = (time: number) => {
        const video = videoRef.current;
        if (!video) return;

        video.currentTime = time;
        setCurrentTime(time);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="my-8 rounded-xl border border-primary-200/30 dark:border-primary-700/30 bg-gradient-light-panel dark:bg-gradient-dark-panel shadow-xl overflow-hidden">
            {/* Header */}
            {(title || description) && (
                <div className="px-6 py-4 border-b border-primary-200/30 dark:border-primary-700/30">
                    {title && (
                        <h3 className="text-2xl font-display font-bold gradient-text mb-2">{title}</h3>
                    )}
                    {description && (
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Video Player */}
            <div className="relative bg-black">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className="w-full"
                    style={{ maxHeight: '600px' }}
                />

                {/* Active Highlight Overlay */}
                {activeHighlight && (
                    <div className="absolute top-4 left-4 right-4 bg-primary-500/90 text-white px-4 py-2 rounded-lg shadow-lg animate-pulse">
                        <p className="text-sm font-medium">{activeHighlight.text}</p>
                    </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    {/* Progress Bar */}
                    <div className="mb-3">
                        <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const percent = (e.clientX - rect.left) / rect.width;
                            handleSeek(percent * duration);
                        }}>
                            <div
                                className="h-full bg-primary-500 transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-between text-white">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={togglePlay}
                                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>

                            <button
                                onClick={toggleMute}
                                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>

                            <span className="text-sm font-mono">
                                {formatTime(currentTime)} / {formatTime(duration)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            {transcript.length > 0 && (
                                <button
                                    onClick={() => setShowTranscript(!showTranscript)}
                                    className="px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-sm transition-colors"
                                >
                                    {showTranscript ? 'Hide' : 'Show'} Transcript
                                </button>
                            )}

                            <button
                                onClick={toggleFullscreen}
                                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                            >
                                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highlights Timeline */}
            {highlights.length > 0 && (
                <div className="px-6 py-4 border-t border-primary-200/30 dark:border-primary-700/30 bg-light-bg-100 dark:bg-dark-bg-200">
                    <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                        Key Moments
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {highlights.map((highlight, index) => (
                            <button
                                key={index}
                                onClick={() => handleSeek(highlight.time)}
                                className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${activeHighlight === highlight
                                        ? 'bg-primary-500 text-white'
                                        : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900/50'
                                    }`}
                            >
                                {formatTime(highlight.time)} - {highlight.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Transcript */}
            {showTranscript && transcript.length > 0 && (
                <div className="px-6 py-4 border-t border-primary-200/30 dark:border-primary-700/30 max-h-64 overflow-y-auto">
                    <h4 className="text-sm font-semibold text-light-text-primary dark:text-dark-text-primary mb-3">
                        Transcript
                    </h4>
                    <div className="space-y-2">
                        {transcript.map((item, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${currentTime >= item.time && currentTime < (transcript[index + 1]?.time || duration)
                                        ? 'bg-primary-500/20 border-l-4 border-primary-500'
                                        : 'bg-light-bg-200 dark:bg-dark-bg-300 hover:bg-primary-500/10'
                                    }`}
                                onClick={() => handleSeek(item.time)}
                            >
                                <span className="text-xs font-mono text-primary-600 dark:text-primary-400 mr-2">
                                    {formatTime(item.time)}
                                </span>
                                <span className="text-sm text-light-text-primary dark:text-dark-text-primary">
                                    {item.text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoTutorial;

