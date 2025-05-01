import styles from './HomeHero.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import Link from "next/link";

export default function HomeHero({ userData }) {
    return (
        <div className={styles.heroAnimated}>
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className={styles.heroText}>
                        {userData.customerData?.firstName ? (
                            <h2 className={styles.heroTitle}>
                                Hi <span className={styles.wave}>{userData.customerData.firstName}</span>, welcome to the MindClass dashboard
                            </h2>
                        ) : (
                            <h3 className={styles.heroTitle}>Welcome to the MindClass dashboard</h3>
                        )}
                        <p className={styles.heroSubtitle}>
                            We&apos;ll keep you up to date with the latest in Mental Health, so come back daily and see what&apos;s changed.
                            <Link href="/magazine" passHref>
                                <span className={styles.pulse}>&nbsp;Stay informed.</span>
                            </Link>
                        </p>
                        <div className={styles.heroCTA}>
                            <Link href="/courses" passHref>
                                <button className={styles.ctaButtonPrimary}>Explore your courses</button>
                            </Link>
                            <Link href="/tools#MoodTracking" passHref>
                                <button className={styles.ctaButtonSecondary}>Track Your Well-being</button>
                            </Link>
                        </div>
                    </Col>
                    <Col md={6} className="d-none d-md-block">
                        <div className={styles.animatedBackground}>
                            <div className={styles.floatingCircle}></div>
                            <div className={styles.floatingCircle}></div>
                            <div className={styles.floatingCircle}></div>
                            <div className={styles.floatingCircle}></div>
                            <div className={styles.floatingCircle}></div>
                            <div className={styles.floatingCircle}></div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
