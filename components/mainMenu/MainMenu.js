import {Button, Container, Nav, Navbar, NavDropdown} from 'react-bootstrap';
import Link from "next/link";
import styles from "./MainMenu.module.css";
import Image from "next/image";
import { useAuth } from '@/context/AuthUserContext';
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
{/*                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link>
                                <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#deets">More deets</Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    Dank memes
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>*/}

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
                                            className={`${pathname === link.url ? styles.active : ''}`}
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
