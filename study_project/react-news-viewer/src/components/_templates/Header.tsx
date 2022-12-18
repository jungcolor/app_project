import Navigation from "../_molecules/Navigation";

const Header = () => {
    const naviList = [
        { path: "/", menuName: "전체보기" },
        { path: "/business", menuName: "비즈니스" },
        { path: "/entertainment", menuName: "엔터테인먼트" },
        { path: "/health", menuName: "건강" },
        { path: "/science", menuName: "과학" },
        { path: "/sports", menuName: "스포츠" },
        { path: "/technology", menuName: "기술" },
    ];

    return (
        <header className="flex justify-center items-center h-24 bg-gray-800">
            <Navigation naviDatas={naviList} />
        </header>
    );
};

export default Header;
