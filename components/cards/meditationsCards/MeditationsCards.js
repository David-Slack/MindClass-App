import styles from "./MeditationsCards.module.css";
import { Col } from "react-bootstrap";
import dynamic from 'next/dynamic';
import { LoadingSpinner } from '@/components/loadingSpinner/LoadingSpinner'; // Adjust the import path if necessary

const ReactPlayer = dynamic(() => import('react-player'), {
    ssr: false,
    loading: () => (
        <div className={styles.loadingContainer}>
            <LoadingSpinner />
        </div>
    ),
});

export function MeditationsCards({ collection }) {
    return (
        collection.map((card) => {
            let videoPlayer = null;

            if (card.videoLink && card.videoLink.includes('vimeo.com')) {
                const vimeoRegex = /(?:www\.|player\.)?vimeo\.com\/(?:manage\/videos\/)?(\d+)/;
                const vimeoMatch = card.videoLink.match(vimeoRegex);
                const vimeoId = vimeoMatch ? vimeoMatch[1] : null;

                if (vimeoId) {
                    videoPlayer = (
                        <ReactPlayer
                            url={`https://vimeo.com/${vimeoId}`}
                            width="auto"
                            height="100%"
                            controls={true}
                        />
                    );
                } else {
                    videoPlayer = <div>Invalid Vimeo Link</div>;
                }
            } else if (card.videoLink && (card.videoLink.includes('youtube.com') || card.videoLink.includes('youtu.be') || card.videoLink.includes('https://www.youtube.com/watch?v=$'))) {
                const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/))([a-zA-Z0-9_-]+)/;
                const youtubeMatch = card.videoLink.match(youtubeRegex);
                const youtubeId = youtubeMatch ? youtubeMatch[1] : null;

                if (youtubeId) {
                    videoPlayer = (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${youtubeId}`} // Use standard YouTube watch URL
                            width="100%"
                            height="auto"
                            controls={true}
                        />
                    );
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
                    className={`${styles.col}`}
                    key={card.id}
                    lg={4}
                >
                    {videoPlayer}
                </Col>
            );
        })
    );
}
