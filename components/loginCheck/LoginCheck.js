import { useAuth } from '@/context/AuthUserContext';
import {useEffect} from "react";
import {router} from "next/client";
import { usePathname } from 'next/navigation'
export function LoginCheck(){
    const { authUser, loading, signOut } = useAuth();
    const pathname = usePathname()

    useEffect(() => {
        if (!authUser && pathname !== '/login')
            router.push('/login').then();
    }, [authUser]);
}
