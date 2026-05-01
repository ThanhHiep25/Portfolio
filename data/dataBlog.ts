export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
  content: string;
  slug: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Tối ưu hiệu năng React: Từ Memoization đến Virtualization",
    excerpt: "Khám phá các kỹ thuật nâng cao để tối ưu hóa render và quản lý tài nguyên hiệu quả trong ứng dụng React quy mô lớn.",
    date: "15 Tháng 5, 2024",
    category: "Performance",
    readTime: "8 phút",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    content: `
      <h2>Tại sao Performance lại quan trọng?</h2>
      <p>Trong kỷ nguyên web hiện đại, tốc độ tải trang và độ mượt mà của giao diện (FPS) quyết định trực tiếp đến trải nghiệm người dùng (UX). Một ứng dụng React nếu không được tối ưu sẽ dễ dàng rơi vào tình trạng re-render không kiểm soát.</p>
      
      <h3>1. Memoization với useMemo và useCallback</h3>
      <p>Memoization là kỹ thuật lưu trữ kết quả của các tính toán tốn kém. Trong React, chúng ta sử dụng <code>useMemo</code> cho giá trị và <code>useCallback</code> cho function để tránh tạo lại chúng trong mỗi lần render.</p>
      
      <h3>2. Windowing & Virtualization</h3>
      <p>Khi làm việc với danh sách hàng ngàn item, việc render tất cả sẽ làm sụp đổ trình duyệt. <strong>Virtualization</strong> (sử dụng các thư viện như react-window) chỉ render những gì đang hiển thị trong viewport, giúp tiết kiệm bộ nhớ đáng kể.</p>
      
      <h3>Kết luận</h3>
      <p>Tối ưu hóa không phải là việc làm một lần, mà là một quá trình theo dõi và tinh chỉnh liên tục bằng các công cụ như React DevTools Profiler.</p>
    `,
    slug: "react-performance-optimization"
  },
  {
    id: 2,
    title: "Kiến trúc Atomic Design trong phát triển Design System",
    excerpt: "Cách áp dụng tư duy phân rã thành phần để xây dựng hệ thống UI bền vững, dễ bảo trì và có tính tái sử dụng cao.",
    date: "10 Tháng 5, 2024",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800",
    readTime: "6 phút",
    content: `
      <h2>Atomic Design là gì?</h2>
      <p>Được đề xuất bởi Brad Frost, Atomic Design là phương pháp luận bao gồm 5 giai đoạn riêng biệt cùng nhau làm việc để tạo ra các hệ thống thiết kế giao diện một cách có thứ tự và phân cấp hơn.</p>
      
      <ul>
        <li><strong>Atoms:</strong> Các thành phần cơ bản nhất (Button, Input).</li>
        <li><strong>Molecules:</strong> Nhóm các Atoms lại với nhau (Search Bar).</li>
        <li><strong>Organisms:</strong> Các khối giao diện phức tạp hơn (Header, Sidebar).</li>
        <li><strong>Templates:</strong> Bố cục trang ở mức wireframe.</li>
        <li><strong>Pages:</strong> Sản phẩm hoàn chỉnh với dữ liệu thực tế.</li>
      </ul>
      
      <p>Áp dụng Atomic Design giúp team dev và design nói chung một ngôn ngữ, giảm thiểu sự lặp lại của code và tăng tốc độ phát triển dự án.</p>
    `,
    slug: "atomic-design-architecture"
  },
  {
    id: 3,
    title: "Tương lai của Frontend: Tích hợp LLMs và AI Agent",
    excerpt: "Tìm hiểu cách đưa trí tuệ nhân tạo vào giao diện người dùng để tạo ra những trải nghiệm cá nhân hóa vượt trội.",
    date: "05 Tháng 5, 2024",
    category: "AI & Future",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    readTime: "10 phút",
    content: `
      <h2>Kỷ nguyên của AI-First Interface</h2>
      <p>AI không còn chỉ nằm ở backend. Việc tích hợp trực tiếp các mô hình ngôn ngữ lớn (LLMs) vào frontend thông qua API như OpenRouter hay Gemini đang thay đổi cách chúng ta tương tác với phần mềm.</p>
      
      <h3>Streaming Response</h3>
      <p>Kỹ thuật streaming cho phép hiển thị câu trả lời từ AI ngay khi nó được tạo ra, giảm bớt cảm giác chờ đợi của người dùng.</p>
      
      <h3>Context-Aware UI</h3>
      <p>AI có thể phân tích hành vi người dùng để tự động điều chỉnh giao diện, gợi ý tính năng hoặc thậm chí là viết code thay cho người dùng trong các công cụ chuyên dụng.</p>
      
      <p>Đây là thời điểm vàng để các Frontend Engineer học cách "nói chuyện" với AI thông qua Prompt Engineering và xử lý luồng dữ liệu không đồng bộ phức tạp.</p>
    `,
    slug: "future-of-frontend-ai"
  }
];
