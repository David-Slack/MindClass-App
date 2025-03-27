import { useAuth } from '@/helpers/firebase/AuthUserContext';
import {useEffect} from "react";
import {router} from "next/client";
import { usePathname } from 'next/navigation';
import {Row} from "react-bootstrap";

export function LoginCheck({ children }){
    const { authUser } = useAuth();
    const pathname = usePathname();

    useEffect(() => {
        if (!authUser && pathname !== '/login')
            router.push('/login').then();
    }, [authUser, pathname]);

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
