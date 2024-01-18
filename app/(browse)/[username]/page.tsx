import { getUserByUsername } from '@/lib/userService';
import { notFound } from 'next/navigation';
import React from 'react'
import Actions from './_components/Actions';
import { isFollowingUser } from '@/lib/followService';
import { isBlockedByUser } from '@/lib/blockService';

interface UserPageProps {
    params: {
        username: string;
    };
};

const UserPage =async ({
    params
  }: UserPageProps) => {
    const user = await getUserByUsername(params.username)
    
    if(!user) {
        notFound();
    }
    
    const isFollowing = await isFollowingUser(user.id)
    const isBlocked = await isBlockedByUser(user.id)
    
    if(isBlocked){
        notFound();
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <h1>{user.id}</h1>
            <p>is Following : {`${isFollowing}`}</p>
            <p>is Blocked : {`${isBlocked}`}</p>
            <Actions isFollowing={isFollowing} userId={user.id}/>
        </div>
    )
}

export default UserPage