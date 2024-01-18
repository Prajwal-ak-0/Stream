"use client";

import { Button } from '@/components/ui/button';
import { isBlockedByUser } from '@/lib/blockService';
import { onBlock, onUnblock } from '@/server/block';
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

    const handleBlock = () => {
        startTransition(() => {
            onBlock(userId)
                .then((data) => toast.success(`You have Blocked ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong"));
        })
    }

    const handleUnblock = () => {
        startTransition(() => {
            onUnblock(userId)
                .then((data) => toast.success(`You have Unblocked ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong"));
        })
    }

    return (
        <div className='flex flex-col'>
            <Button
                variant='primary'
                disabled={isPending}
                onClick={onClick}
            >
                {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
            <Button
                variant='secondary'
                disabled={isPending}
                onClick={ handleBlock}
            >
                Block
            </Button>
            <Button
                variant='secondary'
                disabled={isPending}
                onClick={ handleUnblock}
            >
                Unblock
            </Button>
        </div>
    )
}

export default Actions