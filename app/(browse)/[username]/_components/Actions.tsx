"use client";

import { Button } from '@/components/ui/button';
import { onFollow } from '@/server/follow';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
};

const Actions = (
    { isFollowing,userId }: ActionsProps
) => {
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            onFollow(userId)
            .then((data) => toast.success(`You have Followed ${data.following.username}`))
            .catch(() => toast.error("Something went wrong"));
    })
};

return (
    <Button
        variant='primary'
        disabled={isFollowing || isPending}
        onClick={handleClick}
    >
        Follow
    </Button>
)
}

export default Actions