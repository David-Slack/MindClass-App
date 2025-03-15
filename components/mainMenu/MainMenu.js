import {Button, Nav} from 'react-bootstrap';
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
        <>
            { authUser &&
                <Nav className={`leftMenu ${styles.leftMenu} `}>
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
                </Nav>
            }
        </>
    );
}
