"use client";

import { Button } from '@/components/ui/button';
import { onFollow, onUnfollow } from '@/server/follow';
import React, { useTransition } from 'react'
import { toast } from 'sonner';

interface ActionsProps {
    isFollowing: boolean;
    userId: string;
};

const Actions = (
    { isFollowing, userId }: ActionsProps
) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(userId)
                .then((data) => toast.success(`You have Followed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        })
    };

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(userId)
                .then((data) => toast.success(`You have UnFollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"));
        })
    };

    const onClick = isFollowing ? handleUnFollow : handleFollow;

    return (
        <>
            <Button
                variant='primary'
                disabled={ isPending}
                onClick={onClick}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
        </>
    )
}

export default Actions