"use client";

import { useViewerToken } from "@/hooks/useViewerToken";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
  user: User & {
    stream: Stream | null;
  };
  stream: Stream;
  isFollowing: boolean;
}
const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const {
    token,
    name,
    identity,
  } = useViewerToken(user.id);

  if(!token || !name || !identity) {
    return (
      <div className="">
        Can not watch stream
      </div>
    );
  }
  return (
    <div>
      Can watch stream
    </div>
  )
}

export default StreamPlayer