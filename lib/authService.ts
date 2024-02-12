import { currentUser } from "@clerk/nextjs"
import { db } from "./db";

export const getSelf = async () => {
    const self = await currentUser();

    if (!self) {
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where: {
            externalUserId: self.id
        }
    })

    if (!user) {
        return null;
    }

    return user;
}

export const getSelfByUsername = async (username: string) => {
    const self = await getSelf();

    if (!self || !self.username) {
        return null;
    }

    const user = await db.user.findUnique({
        where: {
            username
        }
    })

    if (!user) {
        throw new Error("No user found")
    }

    if (user.username !== self.username) {
        throw new Error("Unauthorized")
    }

    return user;
}