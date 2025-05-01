import styles from "./MeditationsCards.module.css";
import { Col } from "react-bootstrap";
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/loadingSpinner/LoadingSpinner';
import { useRef, useEffect } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
    loading: () => <LoadingSpinner />,
});

export function VideoCards({ collection }) {
    const wrapperRefs = useRef([]);

    useEffect(() => {
        // Ensure wrapperRefs.current has enough elements for all videos
        wrapperRefs.current = wrapperRefs.current.slice(0, collection.length);
    }, [collection]);

    const handleReady = (index) => () => {
        if (wrapperRefs.current[index]) {
            wrapperRefs.current[index].classList.add(styles.videoLoaded);
        }
    };

    return (
        collection.map((video, index) => {
            let videoPlayer;

            const reactPlayerComponent = (url) => (
                <div
                    ref={(el) => (wrapperRefs.current[index] = el)}
                    className={styles.reactPlayerWrapper}
                    key={index}
                >
                    <ReactPlayer
                        url={url}
                        width="auto"
                        height="100%"
                        controls={true}
                        onReady={handleReady(index)}
                    />
                </div>
            );

            if (video.videoLink && video.videoLink.includes('vimeo.com')) {
                const vimeoRegex = /(?:www\.|player\.)?vimeo\.com\/(?:manage\/videos\/)?(\d+)/;
                const vimeoMatch = video.videoLink.match(vimeoRegex);
                const vimeoId = vimeoMatch ? vimeoMatch[1] : null;

                if (vimeoId) {
                    videoPlayer = reactPlayerComponent(`https://vimeo.com/${vimeoId}`);
                } else {
                    videoPlayer = <div>Invalid Vimeo Link</div>;
                }
            } else if (video.videoLink && (video.videoLink.includes('youtube.com') || video.videoLink.includes('youtu.be') || video.videoLink.includes('https://www.youtube.com/watch?v=$'))) {
                videoPlayer = reactPlayerComponent(video.videoLink);
            } else if (video.videoLink) {
                videoPlayer = <div>Unsupported Video Link</div>;
            } else {
                videoPlayer = <div>No Video Link</div>;
            }

            return (
                <Col
                    className={styles.col}
                    key={video.id}
                    lg={4}
                >
                    {videoPlayer}
                </Col>
            );
        })
    );
}
