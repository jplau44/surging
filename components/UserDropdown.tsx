'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import NavItems from '@/components/NavItems';

const UserDropdown = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        router.push('/sign-in');
    };

    const user = {
        name: 'John',
        email: 'contact@gmail.com',
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild={true}>
                <Button variant="ghost" className="flex items-center gap-3 text-gray-400 hover:text-yellow-500">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                            {user.name[0]}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-base font-medium text-gray-400">{user.name}</span>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-max min-w-(--radix-dropdown-menu-trigger-width) max-w-[calc(100vw-2rem)]"
                align="end"
            >
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex relative items-center gap-3 py-3 pr-2">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                                    {user.name[0]}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex min-w-0 flex-col">
                                <span className="text-base font-medium text-gray-400">{user.name}</span>
                                <span className="whitespace-nowrap text-sm font-medium text-gray-500">
                                    {user.email}
                                </span>
                            </div>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="sm:hidden bg-gray-600" />
                <DropdownMenuGroup>
                    <nav className="sm:hidden">
                        <NavItems variant="dropdown" />
                    </nav>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={handleSignOut}
                        className="text-gray-100 text-sm font-medium cursor-pointer focus:bg-transparent focus:text-yellow-500 transition-colors"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Log Out
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;
