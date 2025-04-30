import {Container, Nav, Navbar, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import Link from "next/link";
import styles from "./MainMenu.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';

// TODO: Move to the DB
const nav = [
    {
        url: "/",
        title: "Home",
        desc: "Welcome to MindClass, counsellors, courses and content are just a click away!"
    },
    {
        url: "/courses",
        title: "Courses",
        desc: "From Mental Health Awareness, to ADHD, Sleep and the Menopause, we’ve got you covered"
    },
    {
        url: "/counsellors",
        title: "Counselling",
        desc: "Need someone to talk to without judgement? Browse our team of expert therapists"
    },
    {
        url: "/magazine",
        title: "Magazine",
        desc: "From interviews, to articles, tips and insights - grab a brew and read it through"
    },
    {
        url: "/meditations",
        title: "Meditations",
        desc: "Your peace, your pace. Browse our mindfulness meditations"
    },
    {
        url: "/video",
        title: "Videos",
        desc: "Bitesize bliss. Quick content to keep you informed on all things wellbeing"
    },
    {
        url: "/tools",
        title: "Tools",
        desc: "AI powered tools to aid productivity, relaxation and performance"
    },
];

function findActiveLink(link, pathname){

    if(link === '/'){
        if(pathname === '/') return true;
    }else if(pathname.includes(link)){
        return true;
    }

    return false;
}

export function MainMenu(){
    const pathname = usePathname();
    const router = useRouter();

    const signOut = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                router.push('/login');
            } else {
                console.error('Sign out failed');
                // Optionally display an error message to the user
            }
        } catch (error) {
            console.error('Error signing out:', error);
            // Optionally display an error message to the user
        }
    };

    return(
        <>
            <Navbar id="TopMenu" collapseOnSelect expand="lg" className={`topMenu ${styles.topMenu} bg-body-tertiary`}>
                <Container>
                    <Navbar.Brand href="/">
                        <Image
                            src={`/img/logo.png`}
                            alt={`MindClass logo`}
                            width={231}
                            height={53}
                            className={styles.logo}
                            priority={true}
                        />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className={styles.navBarNav}>
                        <Nav className="me-auto">
                            {
                                nav.map((link, key)=>{
                                    return (
                                        <Nav.Link
                                            key={key}
                                            as={Link}
                                            href={link.url}
                                        >{link.title}</Nav.Link>
                                    );
                                })
                            }
                            <Nav.Link className={styles.account} href={'/account'}>My Account</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button className={styles.signOut} onClick={signOut}>Sign out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <div className={`leftMenu ${styles.leftMenu} `}>
                <Link href={`/`}>
                    <Image
                        src={`/img/logo.png`}
                        alt={`MindClass logo`}
                        width={991}
                        height={227}
                        className={styles.logo}
                        priority={true}
                    />
                </Link>
                <ul>
                    { nav && nav.map((link, count)=>{
                        return (
                                <li key={count}>
                                    <Link
                                        href={link.url}
                                        className={`${findActiveLink( link.url, pathname ) ? styles.active : ''}`}
                                    >
                                        <OverlayTrigger
                                            key={link.url}
                                            placement="right"
                                            overlay={<Tooltip id={`tooltip-right-leftmenu-${count}`}>{link.desc}</Tooltip>}
                                            delay={{ show: 300, hide: 100 }}
                                        >
                                            <span className={styles.titleSpan}>{link.title}</span>
                                        </OverlayTrigger>
                                    </Link>
                                </li>
                        ) })
                    }
                </ul>
                <Button className={styles.signOut} onClick={signOut}>Sign out</Button>
                <Link className={styles.account} href={'/account'}>My Account</Link>
            </div>
        </>
    );
}
