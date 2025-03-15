import { useAuth } from '@/context/AuthUserContext';
import {useEffect} from "react";
import {router} from "next/client";
import { usePathname } from 'next/navigation';
import {Col, Row} from "react-bootstrap";

export function LoginCheck({ children }){
    const { authUser, loading, signOut } = useAuth();
    const pathname = usePathname()

    useEffect(() => {
        if (!authUser && pathname !== '/login')
            router.push('/login').then();
    }, [authUser]);

    return (
        <Row>
            {
                ((!authUser && pathname === '/login') || authUser) &&
                <>
                    {children}
                </>
            }
        </Row>
    );
}
