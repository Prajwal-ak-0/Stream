import Navbar from "./_components/navbar/index";

const BrowseLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <Navbar />
            <nav>       
                {children}
            </nav>
        </>
    );
};

export default BrowseLayout;