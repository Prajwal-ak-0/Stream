import { Container } from "./_components/Container";
import Navbar from "./_components/navbar/index";
import Sidebar from "./_components/sidebar";

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    );
};

export default BrowseLayout;