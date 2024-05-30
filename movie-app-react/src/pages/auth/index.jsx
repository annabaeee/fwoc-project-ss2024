import { Button } from '@headlessui/react';
import { useMutation } from '@tanstack/react-query';
import { mutationLogin } from './mutation';
import { useNavigate } from 'react-router-dom';

export const Auth = () => {

    const { mutateAsync } = useMutation({ mutationKey: ["login"], mutationFn: mutationLogin });
    const navigate = useNavigate();
    const handleLogin = async () => {
        const data = await mutateAsync();
        localStorage.setItem("guest_session_id", data.guest_session_id);
        navigate("/");
    }
    return (
        <div className='relative z-10 focus:outline-none'>
            <div className='text-3xl font-bold py-5'>Welcome!</div>
            <div className='text-xl font-medium py-7'>Please sign in as a guest below by clicking the button.</div>
            <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                onClick={handleLogin}>
                Log in as Guest
            </Button>
        </div>
    )
}