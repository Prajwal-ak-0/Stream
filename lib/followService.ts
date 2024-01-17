import { getSelf } from "./authService"
import { db } from "./db";

export const isFollowingUser = async (id: string) => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where:{
                id
            }
        })

        if(!otherUser){
            throw new Error("User not found")
        }

        if(self.id === otherUser.id){
            return true;
        }

        const existingFollow = await db.follow.findFirst({
            where:{
                followerId: self.id,
                followingId: otherUser.id
            }
        })

        return !!existingFollow;

    } catch (error) {
        return false;
    }
}

export const followUser = async (id: string) => {
    const self = await getSelf();
  
    const otherUser = await db.user.findUnique({
      where: { id },
    });
  
    if (!otherUser) {
      throw new Error("User not found");
    }
  
    if (otherUser.id === self.id) {
      throw new Error("Cannot follow yourself");
    }
  
    const existingFollow = await db.follow.findFirst({
      where: {
        followerId: self.id,
        followingId: otherUser.id,
      },
    });
  
    if (existingFollow) {
      throw new Error("Already following");
    }
  
    const follow = await db.follow.create({
      data: {
        followerId: self.id,
        followingId: otherUser.id,
      },
      include: {
        following: true,
        follower: true,
      },
    });
  
    return follow;
  };