
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import userAbout from '../data/dataAbout';

const About: React.FC = () => {
  const user = userAbout[0];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const timelineItemVariants: Variants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Left Side: Bio & Stats */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-gray-900 dark:text-white leading-tight">
              Đam mê công nghệ & <br />
              <span className="text-primary italic underline decoration-primary/30 underline-offset-8">Sự hoàn hảo</span>
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
              {user.profile.map((p) => (
                <p key={p.profile_id} className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-3 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                  {p.profile_des}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="text-4xl font-black text-primary mb-1">01+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Năm kinh nghiệm</div>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800"
              >
                <div className="text-4xl font-black text-primary mb-1">{user.project_experience.length}+</div>
                <div className="text-xs text-gray-500 uppercase font-bold tracking-widest">Dự án hoàn tất</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Timeline */}
          <div className="space-y-12">

            {/* Experience */}
            <motion.div variants={itemVariants}>
              <h3 className="flex items-center gap-3 text-2xl font-black mb-8 text-gray-900 dark:text-white">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><Briefcase size={24} /></div>
                Sự Nghiệp
              </h3>
              <div className="border-l-2 border-primary/20 ml-5 space-y-10 pl-8 pb-2">
                {user.experience.map((exp) => (
                  <motion.div
                    key={exp.experience_id}
                    variants={timelineItemVariants}
                    className="relative group"
                  >
                    <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-primary group-hover:scale-125 transition-transform"></span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{exp.experience_name}</h4>
                    <p className="text-primary/80 font-bold text-sm mb-1">{exp.experience_des}</p>
                    <p className="text-xs font-bold text-gray-400 mb-3 uppercase tracking-wider">{exp.experience_year} | {exp.experience_location}</p>

                    <ul className="list-disc pl-5 space-y-2">
                      {
                        exp.experience_step1 && (
                          <li className="text-gray-600 text-justify dark:text-gray-400 font-medium leading-relaxed">{exp.experience_step1}</li>
                        )
                      }
                      {
                        exp.experience_step2 && (
                          <li className="text-gray-600 text-justify dark:text-gray-400 font-medium leading-relaxed">{exp.experience_step2}</li>
                        )
                      }
                      {
                        exp.experience_step3 && (
                          <li className="text-gray-600 text-justify dark:text-gray-400 font-medium leading-relaxed">{exp.experience_step3}</li>
                        )
                      }
                      {
                        exp.experience_step4 && (
                          <li className="text-gray-600 text-justify dark:text-gray-400 font-medium leading-relaxed">{exp.experience_step4}</li>
                        )
                      }
                      {
                        exp.experience_step5 && (
                          <li className="text-gray-600 text-justify dark:text-gray-400 font-medium leading-relaxed">{exp.experience_step5}</li>
                        )
                      }
                    </ul>

                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <h3 className="flex items-center gap-3 text-2xl font-black mb-8 text-gray-900 dark:text-white">
                <div className="p-2 bg-primary/10 rounded-lg text-primary"><GraduationCap size={24} /></div>
                Học Vấn
              </h3>
              <div className="border-l-2 border-primary/20 ml-5 space-y-10 pl-8 pb-2">
                {user.education.map((edu) => (
                  <motion.div
                    key={edu.education_id}
                    variants={timelineItemVariants}
                    className="relative group"
                  >
                    <span className="absolute -left-[41px] top-1.5 w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-4 border-primary group-hover:scale-125 transition-transform"></span>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">{edu.education_name}</h4>
                    <p className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{edu.education_year}</p>
                    <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{edu.education_des}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
