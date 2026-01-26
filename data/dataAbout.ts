import type { UsersAboutData } from "../interfaces/user";

const imgChatPlatform =
  "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&q=80&w=1200";
const imgRecipeApp =
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1200";
const imgMassageSys =
  "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200";

const iuh =
  "https://media.iuh.edu.vn/Media/2_sviuh/Images/logo-iuh_817e997a-e377-4951-bd1f-b51f04664887.png";
const alis =
  "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800";

const sof =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800";
const har =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800";

const userAbout: UsersAboutData = [
  {
    user_id: 1,
    name: "NGUYEN_HIEP",
    age: "23",
    job: "Software Engineer",
    address: "Gò Vấp, Hồ Chí Minh, Việt Nam",
    phone: "0866853100",
    email: "hiepnguyen.250402@gmail.com",
    birthday: "25/04/2002",
    create_at: "01/01/2025",
    update_at: "01/01/2025",
    linkedIn: "https://www.linkedin.com/in/nguyen-thanh-hiep-1694a9222/",
    github: "https://github.com/ThanhHiep25",
    facebook: "https://www.facebook.com/nguyen.hiep.25.04/",
    googleDeveloper: "https://g.dev/nguyenthanhhiep",
    profile: [
      {
        profile_id: 1,
        profile_des:
          "Tôi là một kỹ sư phần mềm chuyên sâu về hệ sinh thái React. Với tư duy giải quyết vấn đề bằng công nghệ, tôi tập trung vào việc tạo ra các giao diện người dùng có tính thẩm mỹ cao và kiến trúc mã nguồn bền vững.",
        profile_img: "",
      },
      {
        profile_id: 2,
        profile_des:
          "Bên cạnh Frontend, tôi đang mở rộng năng lực sang mảng Full-stack với Golang và Node.js để làm chủ toàn bộ vòng đời phát triển sản phẩm, từ ý tưởng đến triển khai thực tế.",
        profile_img: "",
      },
    ],
    experience: [
      {
        experience_id: 2,
        experience_des: "HOASON INFOTECH",
        experience_img: "",
        experience_name:
          "Front-end Developer - ReactJS, TailwindCss, TypeScript, Restful APIs,...",
        experience_year: "01/01/2025 - 01/06/2026",
        experience_position: "Software Engineer",
        experience_location: "Quận 1, Hồ Chí Minh, Vietnam",
        experience_step1:
          "Tham gia vào quy trình phát triển phần mềm, từ khâu lên ý tưởng, thiết kế giao diện đến triển khai.",
        experience_step2:
          "Xây dựng các tính năng mới, tối ưu hóa hiệu suất và đảm bảo chất lượng sản phẩm theo yêu cầu của khách hàng.",
        experience_step3:
          "Làm việc với các công nghệ hiện đại như ReactJS, TailwindCss, TypeScript và các RESTful APIs để tạo ra trải nghiệm người dùng tốt nhất.",
        experience_step4:
          "Phối hợp chặt chẽ với các thành viên trong nhóm để đảm bảo tiến độ dự án và đạt được mục tiêu đề ra.",
        experience_step5:
          "Tham gia vào các buổi đánh giá mã nguồn, chia sẻ kiến thức và đóng góp vào việc cải thiện quy trình phát triển.",
      },
      {
        experience_id: 3,
        experience_des: "Freelance & Open Source",
        experience_img: "",
        experience_name: "Full-stack Developer",
        experience_year: "2025 - Hiện tại",
        experience_position: "Software Engineer",
        experience_location: "Remote",
        experience_step1:
          "Làm việc với các dự án đa dạng từ startup đến doanh nghiệp lớn, tiếp xúc với nhiều mô hình kinh doanh và yêu cầu kỹ thuật khác nhau.",
        experience_step2:
          "Phát triển và triển khai các giải pháp phần mềm toàn diện, từ giao diện người dùng đến cơ sở dữ liệu và API.",
        experience_step3:
          "Tự chủ trong việc lựa chọn và áp dụng công nghệ phù hợp cho từng dự án, tối ưu hóa hiệu quả và chất lượng sản phẩm.",
        experience_step4:
          "Quản lý toàn bộ vòng đời phát triển sản phẩm, từ lên ý tưởng, thiết kế, lập trình đến triển khai và bảo trì.",
        experience_step5:
          "Liên tục học hỏi và cập nhật các xu hướng công nghệ mới để nâng cao kỹ năng và mang lại giá trị tốt nhất cho khách hàng.",
      },
    ],
    project_experience: [
      {
        project_id: 101,
        project_name: "SkyChat Enterprise",
        project_des:
          "Hệ thống truyền thông nội bộ quy mô lớn hỗ trợ hàng nghìn người dùng đồng thời. Tích hợp WebRTC cho cuộc gọi video và Socket.io cho tin nhắn tức thời.",
        project_img: imgChatPlatform,
        project_link: "https://github.com/ThanhHiep25/App_Chat_CNM",
        category: "Fullstack",
        project_year: "2024",
        project_type: [
          { type_id: 1, type_name: "ReactJS" },
          { type_id: 2, type_name: "Node.js" },
          { type_id: 3, type_name: "Redis" },
          { type_id: 4, type_name: "WebRTC" },
        ],
        status: "Completed",
      },
      {
        project_id: 102,
        project_name: "Zen Massage Manager",
        project_des:
          "Nền tảng quản trị SaaS cho các chuỗi spa cao cấp. Xử lý quy trình đặt lịch, quản lý lương nhân viên và phân tích doanh thu qua biểu đồ trực quan.",
        project_img: imgMassageSys,
        project_link: "https://github.com/ThanhHiep25/Massage-Therapy-Client",
        category: "Fullstack",
        project_year: "2025",
        project_type: [
          { type_id: 1, type_name: "NextJS" },
          { type_id: 2, type_name: "Tailwind" },
          { type_id: 3, type_name: "PostgreSQL" },
          { type_id: 4, type_name: "Recharts" },
        ],
        status: "Completed",
      },
      {
        project_id: 103,
        project_name: "Culina Recipe Hub",
        project_des:
          "Ứng dụng chia sẻ công thức nấu ăn tích hợp AI nhận diện món ăn qua hình ảnh. Hệ thống gợi ý món ăn dựa trên nguyên liệu hiện có.",
        project_img: imgRecipeApp,
        project_link: "https://github.com/ThanhHiep25/Recipe",
        category: "Mobile App",
        project_year: "2023 - 2024",
        project_type: [
          { type_id: 1, type_name: "React Native" },
          { type_id: 2, type_name: "TensorFlow.js" },
          { type_id: 3, type_name: "Firebase" },
        ],
        status: "Completed",
      },
      {
        project_id: 104,
        project_name: "Real-time Stock Dashboard",
        project_des:
          "Bảng điều khiển chứng khoán thời gian thực với biểu đồ tương tác cao và dữ liệu streaming liên tục.",
        project_img: "",
        project_link: "https://github.com/ThanhHiep25/StockDashboard",
        category: "Fullstack",
        project_year: "2023",
        project_type: [
          { type_id: 1, type_name: "Vue.js" },
          { type_id: 4, type_name: "PostgreSQL" },
          { type_id: 5, type_name: "Socket.IO" },
        ],
        status: "Completed",
      },
      {
        project_id: 105,
        project_name: "E-commerce Mobile App",
        project_des:
          "Ứng dụng thương mại điện tử với trải nghiệm người dùng mượt mà, tích hợp thanh toán và quản lý giỏ hàng.",
        project_img: "",
        project_link: "https://github.com/ThanhHiep25/E-commerce-App",
        category: "Mobile App",
        project_year: "2023",
        project_type: [
          { type_id: 1, type_name: "React Native" },
          { type_id: 2, type_name: "Redux" },
          { type_id: 4, type_name: "Styled Components" },
        ],
        status: "Completed",
      },
    ],
    skill: [
      { skill_id: 1, skill_name: "ReactJS / Next.js", skill_level: "90" },
      { skill_id: 2, skill_name: "React Native", skill_level: "85" },
      { skill_id: 3, skill_name: "JavaScript / TypeScript", skill_level: "95" },
      { skill_id: 4, skill_name: "Java / Spring", skill_level: "80" },
      { skill_id: 5, skill_name: "Golang (Basic)", skill_level: "60" },
      { skill_id: 6, skill_name: "Node.js / Express", skill_level: "85" },
      { skill_id: 7, skill_name: "Firebase / MongoDB", skill_level: "88" },
      { skill_id: 8, skill_name: "TailwindCSS / SCSS", skill_level: "95" },
      { skill_id: 9, skill_name: "Framer Motion", skill_level: "85" },
      { skill_id: 10, skill_name: "Git / Docker", skill_level: "85" },
      { skill_id: 11, skill_name: "Figma (UI/UX)", skill_level: "75" },
      { skill_id: 12, skill_name: "REST APIs / Socket.io", skill_level: "90" },
    ],
    language: [
      { language_id: 1, language_name: "Tiếng Việt", language_level: "5" },
      { language_id: 2, language_name: "Tiếng Anh", language_level: "3" },
    ],
    education: [
      {
        education_id: 1,
        education_name: "IUH - Đại học Công nghiệp TP. HCM",
        education_year: "2020 - 2025",
        education_img: iuh,
        education_des: "Chuyên ngành Kỹ thuật Phần mềm - Công nghệ Thông tin",
      },
      {
        education_id: 2,
        education_name: "ALis Academy",
        education_year: "2025 - Hiện tại",
        education_img: alis,
        education_des: "Khóa đào tạo chuyên sâu về UX/UI Design",
      },
    ],
    certificate: [
      {
        certificate_id: 1,
        certificate_name: "Phần mềm Máy tính",
        certificate_year: "2022",
        certificate_img: "",
        certificate_des: "Codelearn.io",
        certificate_link:
          "https://codelearn.io/share/0ee7e3a1-5429-4d7f-be2f-38aec9fddf84",
      },
      {
        certificate_id: 2,
        certificate_name: "Phần cứng Máy tính",
        certificate_year: "2022",
        certificate_img: "",
        certificate_des: "Codelearn.io",
        certificate_link:
          "https://codelearn.io/share/a227874b-878c-4076-8da3-c6cf74002073",
      },
      {
        certificate_id: 3,
        certificate_name: "BẰNG KHEN ĐẢNG CỘNG SẢN VIỆT NAM - ĐẢNG ỦY",
        certificate_year: "2025",
        certificate_img: "/cre__ph.jpg",
        certificate_des: "ĐẢNG CỘNG SẢN VIỆT NAM",
        certificate_link: "/cre__ph.jpg",
      },
    ],
  },
];

export default userAbout;
