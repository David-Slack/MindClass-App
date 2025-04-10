import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import Link from "next/link";
import styles from "./MainMenu.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from 'next/navigation';


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
    const pathname = usePathname();
    const router = useRouter();

    const signOut = async () => {
        try {
            const response = await fetch('/api/auth/signout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Redirect to the login page after successful sign out
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
                            </Nav>
                            <Nav>
                                {/*<Button className={styles.signOut} onClick={signOut}>Sign out</Button>*/}
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

                    {/*<Button className={styles.signOut} onClick={signOut}>Sign out</Button>*/}
                    <Button className={styles.signOut} onClick={signOut}>Sign out</Button>
                </div>
        </>
    );
}
