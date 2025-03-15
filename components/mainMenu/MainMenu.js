import {Button, Nav} from 'react-bootstrap';
import { useAuth } from '@/context/AuthUserContext';
import Link from "next/link";
import styles from "./MainMenu.module.css";

export function MainMenu(){
    const { authUser, loading, signOut } = useAuth();

    return(
        <>
            { authUser &&
                <Nav className={`mainMenu ${styles.mainMenu}`}>
                    MindClass logo
                    <ul>
                        <li><Link href={`/`}>Home</Link></li>
                        <li><Link href={`/courses`}>Courses</Link></li>
                        <li><Link href={`/counsellors`}>Counsellors</Link></li>
                        <li><Link href={`/magazine`}>Magazine</Link></li>
                        <li><Link href={`/relax`}>Relax</Link></li>
                        <li><Link href={`/shorts`}>Shorts</Link></li>
                        <li><Link href={`/tools`}>Tools</Link></li>
                    </ul>

                    <Button onClick={signOut}>Sign out</Button>
                </Nav>
            }
        </>
    );
}
