
import Link from "next/link";
import { Button } from 'react-bootstrap';
import { useAuth } from '@/context/AuthUserContext';

export function MainMenu(){
    const { authUser, loading, signOut } = useAuth();

    return(
        <>
            <h2>Main Menu</h2>
            { authUser && <Button onClick={signOut}>Sign out</Button>}
            { !authUser && <Link href={`/login`}>Login</Link> }
        </>
    );
}
