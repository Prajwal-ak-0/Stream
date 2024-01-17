"use server";

import { followUser } from "@/lib/followService";
import { revalidatePath } from "next/cache";

export const onFollow = async (id: string) => {
    try {
        const followedUser = await followUser(id);

        revalidatePath("/");

        if (followedUser) {
            revalidatePath(`/${followedUser.following.username}`);
        }

        return followedUser;
    } catch (error) {
        throw new Error("Interal Error");
    };
};