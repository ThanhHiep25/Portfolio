
import type { Project } from "../interfaces/user";

// Định nghĩa các biến hình ảnh chất lượng cao tương ứng với dự án của bạn
const ladcar = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200";
const ladshoes = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1200";
const friendMK = "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200";
const mass = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200";
const webchat = "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1200";
const recipe = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200";
const dangbo = "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80&w=1200";
const mlService = "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200";

export const mockProjects: Project[] = [
  {
    project_id: 1,
    project_des: "Website giới thiệu xe hơi hạng sang với hiệu ứng Scroll 3D và hiển thị thông số kỹ thuật thời gian thực.",
    project_img: ladcar,
    project_link: "https://github.com/ThanhHiep25/Template-Car-LadingPage",
    project_demo: "https://lading-mercedes.netlify.app/",
    project_name: "Mercedes Vision 3D",
    category: "Frontend",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 2, type_name: "ThreeJS" },
      { type_id: 3, type_name: "TailwindCSS" },
      { type_id: 6, type_name: "Blender - 3D" },
    ],
    status: "Completed",
  },
  {
    project_id: 2,
    project_des: "Sàn thương mại điện tử chuyên biệt cho sneaker, tích hợp hiển thị 3D giúp người dùng quan sát sản phẩm trực quan.",
    project_img: ladshoes,
    project_link: "https://github.com/ThanhHiep25/Template-Shoes",
    project_demo: "https://lading-nike.netlify.app/",
    project_name: "Nike Store Interactive",
    category: "Frontend",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 2, type_name: "ThreeJS" },
      { type_id: 3, type_name: "TailwindCSS" },
    ],
    status: "Completed",
  },
  {
    project_id: 3,
    project_des: "Trang web quảng bá sự kiện mùa hè với các hiệu ứng chuyển động GSAP mượt mà và tương tác vui nhộn.",
    project_img: '/assets/imageProject/ladCorgi.jpg',
    project_link: "https://github.com/ThanhHiep25/Template-Corgii_Summer_Games_LadingPage",
    project_demo: "https://corgiiisummercamp.netlify.app/",
    project_name: "Corgii Summer Games",
    category: "Frontend",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 2, type_name: "Animation" },
      { type_id: 3, type_name: "TailwindCSS" },
    ],
    status: "Completed",
  },
  {
    project_id: 4,
    project_name: "Friend Marker Map",
    project_des: "Ứng dụng bản đồ tương tác cho phép đánh dấu vị trí bạn bè và lưu trữ dữ liệu qua OpenStreetMap và MongoDB.",
    project_img: friendMK,
    project_link: "",
    project_demo: "",
    category: "Fullstack",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 5, type_name: "Map" },
      { type_id: 7, type_name: "Leaflet" },
      { type_id: 8, type_name: "MongoDB" },
    ],
    status: "Completed",
  },
  {
    project_id: 5,
    project_des: "Hệ thống gợi ý phim thông minh, lấy dữ liệu từ API phim quốc tế và xử lý giao diện hiển thị chuyên nghiệp.",
    project_img: '/assets/imageProject/movie.jpg',
    project_link: "https://github.com/ThanhHiep25/Suggestion-Movies",
    project_demo: "https://suggestion-movies.netlify.app/",
    project_name: "Suggest Cinema",
    category: "Frontend",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 5, type_name: "APIs" },
      { type_id: 6, type_name: "Axios" },
    ],
    status: "Completed",
  },
  {
    project_id: 6,
    project_des: "Hệ thống backend xử lý gợi ý phim sử dụng kỹ thuật TF-IDF để tính toán độ tương đồng giữa từ khóa.",
    project_img: mlService,
    project_link: "https://github.com/ThanhHiep25/Suggestion-Movies-BE",
    project_demo: "",
    project_name: "Cinema Recommendation Engine",
    category: "Backend",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "NodeJS" },
      { type_id: 3, type_name: "ExpressJS" },
      { type_id: 4, type_name: "MongoDB" },
    ],
    status: "Completed",
  },
  {
    project_id: 7,
    project_des: "Hệ thống quản lý đặt lịch Massage cho khách hàng với giao diện hiện đại và quy trình thanh toán tối ưu.",
    project_img: mass,
    project_link: "https://github.com/ThanhHiep25/Massage-Therapy-KH",
    project_demo: "https://spa-massage-vn.netlify.app/",
    project_name: "Zen Massage - Customer",
    category: "Frontend",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 2, type_name: "TailwindCSS" },
      { type_id: 5, type_name: "Redux" },
    ],
    status: "Completed",
  },
  {
    project_id: 10,
    project_name: "SkyChat Enterprise Platform",
    project_des: "Nền tảng nhắn tin đa thiết bị với Socket.IO và Firebase, hỗ trợ hội thoại thời gian thực và chia sẻ file.",
    project_img: webchat,
    project_link: "https://github.com/ThanhHiep25/App_Chat_CNM/tree/master/Final_Project",
    category: "Fullstack",
    project_year: "2024",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 2, type_name: "React Native" },
      { type_id: 4, type_name: "ExpressJS" },
      { type_id: 6, type_name: "Socket.IO" },
    ],
    status: "Completed",
  },
  {
    project_id: 11,
    project_name: "Recipe Hub App",
    project_des: "Ứng dụng di động tìm kiếm và lưu trữ công thức nấu ăn, tích hợp MockAPI để quản lý dữ liệu người dùng.",
    project_img: recipe,
    project_link: "https://github.com/ThanhHiep25/Recipe",
    category: "Mobile App",
    project_year: "2023",
    project_type: [
      { type_id: 1, type_name: "React Native" },
      { type_id: 2, type_name: "Redux" },
      { type_id: 4, type_name: "Styled Components" },
    ],
    status: "Completed",
  },
  {
    project_id: 12,
    project_des: "Hệ thống quản trị Spa cho nhân viên và admin, hỗ trợ quản lý doanh thu, nhân sự và dịch vụ.",
    project_img: mass,
    project_link: "https://github.com/ThanhHiep25/Massage-Therapy-Client",
    project_demo: "https://spa-massage-ivn.netlify.app/",
    project_name: "Zen Massage - Admin",
    category: "Frontend",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 4, type_name: "APIs" },
      { type_id: 9, type_name: "Cloudinary" },
    ],
    status: "Completed",
  },
  {
    project_id: 13,
    project_des: "Hệ thống backend quản lý Spa sử dụng Java Spring Boot, hỗ trợ phân quyền JWT và quản lý dữ liệu MySQL.",
    project_img: mlService,
    project_link: "https://github.com/ThanhHiep25/Massage-Therapy",
    project_name: "Zen Massage - API Server",
    category: "Backend",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "Spring Boot" },
      { type_id: 2, type_name: "MySQL" },
      { type_id: 3, type_name: "Java" },
      { type_id: 4, type_name: "Redis" },
      { type_id: 5, type_name: "JWT" }
    ],
    status: "Completed",
  },
  {
    project_id: 16,
    project_name: "CheckIn - QR System",
    project_des: "Giải pháp điểm danh qua mã QR cho các sự kiện và văn phòng, tích hợp dashboard quản lý thời gian thực.",
    project_img: dangbo,
    project_link: "https://github.com/ThanhHiep25/Doan-IUH-CheckInQR",
    project_demo: "https://check-in-doaniuh.netlify.app/",
    category: "Fullstack",
    project_year: "2025",
    project_type: [
      { type_id: 1, type_name: "ReactJS" },
      { type_id: 2, type_name: "TailwindCSS" },
      { type_id: 5, type_name: "Socket.IO" },
      { type_id: 6, type_name: "Cloudinary" }
    ],
    status: "Completed",
  },
  {
    project_id: 17,
    project_name: "Bowlan Solutions",
    project_des: "Cung cấp giải pháp thuê Máy chủ vật lý, Cloud Server, Proxy và máy chủ vật lý.",
    project_img: '/assets/imageProject/bowlan.jpg',
    project_link: "https://github.com/ThanhHiep25/BowLan-Cloud",
    project_demo: "https://bow-lan-cloud.vercel.app/",
    category: "Frontend",
    project_year: "20/12/2025",
    project_type: [
      { type_id: 1, type_name: "NextJS" },
      { type_id: 2, type_name: "TailwindCSS" },
      { type_id: 3, type_name: "APIs" },
      { type_id: 4, type_name: "Context" },
      { type_id: 5, type_name: "Motion" },
      { type_id: 6, type_name: "SEO" }
    ],
    status: "Completed",
  }
];
