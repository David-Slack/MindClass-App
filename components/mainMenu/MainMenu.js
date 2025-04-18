import {Button, Container, Nav, Navbar } from 'react-bootstrap';
import Link from "next/link";
import styles from "./MainMenu.module.css";
import Image from "next/image";
import { useAuth } from '@/helpers/firebase/AuthUserContext';
import {usePathname} from "next/navigation";

const nav = [
    {
        url: "/",
        title: "Home",
        hover: "this is a hover"
    },
    {
        url: "/courses",
        title: "Courses",
        hover: "this is a hover"
    },
    {
        url: "/counsellors",
        title: "Counselling",
        hover: "this is a hover"
    },
    {
        url: "/magazine",
        title: "Magazine",
        hover: "this is a hover"
    },
    {
        url: "/relax",
        title: "Relax",
        hover: "this is a hover"
    },
    {
        url: "/shorts",
        title: "Shorts",
        hover: "this is a hover"
    },
    {
        url: "/tools",
        title: "Tools",
        hover: "this is a hover"
    },
];


export function MainMenu(){
    const { authUser, signOut } = useAuth();
    const pathname = usePathname();

    return(
        authUser &&
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
                            </Nav>
                            <Nav>
                                {/*<Nav.Link href="#deets">My Account</Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    Sign Out
                                </Nav.Link>*/}
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
                        {
                            nav.map((link)=>{
                                return (
                                    <li key={link.url}>
                                        <Link
                                            href={link.url}
                                            className={`${pathname.includes(link.url) ? styles.active : ''}`}
                                        >
                                            <span className={styles.titleSpan}>{link.title}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>

                    <Button className={styles.signOut} onClick={signOut}>Sign out</Button>
                </div>

        </>
    );
}
