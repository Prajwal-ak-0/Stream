import { Suspense } from "react";
import { Container } from "./_components/Container";
import Navbar from "./_components/navbar/index";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar";

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Suspense fallback={<SidebarSkeleton/>}>
                    <Sidebar />
                    <Container>
                        {children}
                    </Container>
                </Suspense>
            </div>
        </>
    );
};

export default BrowseLayout;