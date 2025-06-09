export interface IHallInfo {
    image: string;
    description: string;
}

export const hallInfo: Record<string, IHallInfo> = {
    A: {
        image: "https://tse4.mm.bing.net/th/id/OIP.KFW7HTBhmDkoxZ7hSFC3DwHaE8?rs=1&pid=ImgDetMain",
        description: "Sảnh A - Không gian sang trọng, sức chứa lớn, phù hợp cho các buổi tiệc cưới hoành tráng và sự kiện lớn."
    },
    B: {
        image: "https://tse1.mm.bing.net/th/id/OIP.bXY6LAkH-IVb-x-0fDxG_gHaE8?rs=1&pid=ImgDetMain",
        description: "Sảnh B - Thiết kế hiện đại, ánh sáng tự nhiên, lý tưởng cho các buổi tiệc thân mật và ấm cúng."
    },
    C: {
        image: "https://tse4.mm.bing.net/th/id/OIP.-iMkX6CTRdiWWCCQl89cIQHaE8?rs=1&pid=ImgDetMain",
        description: "Sảnh C - Không gian mở, view đẹp, thích hợp cho tiệc cưới ngoài trời và các buổi tiệc nhẹ nhàng."
    },
    D: {
        image: "https://mate.vn/wp-content/uploads/2020/11/d5dc00c5fe396b-nhngimnibtlmnngitrangtrticciphongcchcinsangtrng1.jpg",
        description: "Sảnh D - Phong cách cổ điển, trang trí tinh tế, phù hợp cho các buổi tiệc sang trọng và lịch lãm."
    },
    E: {
        image: "https://linhnga.vn/wp-content/uploads/2021/07/Untitled-2.jpg",
        description: "Sảnh E - Sảnh VIP, tiện nghi cao cấp, dịch vụ chuyên nghiệp, dành cho các sự kiện đặc biệt."
    }
};