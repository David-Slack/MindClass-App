import styles from "./MeditationsCards.module.css";
import { Col } from "react-bootstrap";
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/loadingSpinner/LoadingSpinner';
import { useRef } from 'react';

const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
    loading: () => <LoadingSpinner />,
});

export function MeditationsCards({ collection }) {
    return (
        collection.map((card) => {
            const wrapperRef = useRef(null);

            const handleReady = () => {
                if (wrapperRef.current) {
                    wrapperRef.current.classList.add(styles.videoLoaded);
                }
            };

            let videoPlayer;

            const reactPlayerComponent = (url) => (
                <div ref={wrapperRef} className={styles.reactPlayerWrapper}>
                    <ReactPlayer
                        url={url}
                        width="auto"
                        height="100%"
                        controls={true}
                        onReady={handleReady}
                    />
                </div>
            );

            if (card.videoLink && card.videoLink.includes('vimeo.com')) {
                const vimeoRegex = /(?:www\.|player\.)?vimeo\.com\/(?:manage\/videos\/)?(\d+)/;
                const vimeoMatch = card.videoLink.match(vimeoRegex);
                const vimeoId = vimeoMatch ? vimeoMatch[1] : null;

                if (vimeoId) {
                    videoPlayer = reactPlayerComponent(`https://vimeo.com/${vimeoId}`);
                } else {
                    videoPlayer = <div>Invalid Vimeo Link</div>;
                }
            } else if (card.videoLink && (card.videoLink.includes('youtube.com') || card.videoLink.includes('youtu.be') || card.videoLink.includes('https://www.youtube.com/watch?v=$'))) {
                const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]+)/;
                const youtubeMatch = card.videoLink.match(youtubeRegex);
                const youtubeId = youtubeMatch ? youtubeMatch[1] : null;

                if (youtubeId) {
                    videoPlayer = reactPlayerComponent(`https://www.youtube.com/watch?v=$${youtubeId}`);
                } else {
                    videoPlayer = <div>Invalid YouTube Link</div>;
                }
            } else if (card.videoLink) {
                videoPlayer = <div>Unsupported Video Link</div>;
            } else {
                videoPlayer = <div>No Video Link</div>;
            }

            return (
                <Col
                    className={styles.col}
                    key={card.id}
                    lg={4}
                >
                    {videoPlayer}
                </Col>
            );
        })
    );
}
