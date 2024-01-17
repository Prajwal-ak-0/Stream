"use client";

import { useSidebar } from "@/hooks/useSidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { ToggleSkeleton } from "./Toggle";
import { RecommendedSkeleton } from "./Recommended";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {

    const {collapsed} = useSidebar((state) => state)
    const [isClient,setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }    
    ,[])

    if(!isClient) return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
            <ToggleSkeleton/>
            <RecommendedSkeleton/>
        </aside>
    );

    return (
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50", collapsed && "w-[70px]")}>
            {children}
        </aside>
    )
}