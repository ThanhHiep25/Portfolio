import userAbout from "@/data/dataAbout";
import { Code, Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
    const user = userAbout[0];

    const socials = [
        { name: "Facebook", url: user.facebook, icon: Facebook },
        { name: "Linkedin", url: user.linkedIn, icon: Linkedin },
        { name: "GitHub", url: user.github, icon: Github },
        { name: "GoogleDeveloper", url: user.googleDeveloper, icon: Code },
    ];

    return (
        <div className="relative z-10 fixed bottom-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div className="mt-16 md:mt-32 pt-8 md:pt-12 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
                <div className="flex flex-col gap-2">
                    <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                        © {new Date().getFullYear()} {user.name} Portfolio • Built with React & TailwindCSS
                    </p>

                    <div className="flex gap-5 mt-10">
                        {socials.map((social, index) => (
                            <a key={index} href={social.url} className="text-[10px] font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex gap-8">
                    <a href="#about" className="text-[10px] font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Về tôi</a>
                    <a href="#projects" className="text-[10px] font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Dự án</a>
                    <a href="#skills" className="text-[10px] font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Kỹ năng</a>
                </div>
            </div>
        </div>

    );
};

export default Footer;
