'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Code, Palette, Smartphone, Database, Globe, Zap } from 'lucide-react'

const skills = [
  {
    category: 'Frontend',
    icon: Code,
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    category: 'Backend',
    icon: Database,
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    category: 'Design',
    icon: Palette,
    skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Prototyping'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    category: 'Mobile',
    icon: Smartphone,
    skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Cross-platform'],
    color: 'from-orange-500 to-red-500'
  },
  {
    category: 'Cloud & DevOps',
    icon: Globe,
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    category: 'Tools & Others',
    icon: Zap,
    skills: ['Git', 'Webpack', 'Jest', 'Storybook', 'Agile'],
    color: 'from-yellow-500 to-orange-500'
  }
]

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="about" className="section-padding bg-gray-800/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  I&apos;m a passionate developer with 5+ years of experience creating digital solutions 
            that make a difference. I love combining technical expertise with creative design 
            to build products that users love.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
              <p className="text-gray-300 leading-relaxed">
                  Started as a curious student who loved solving problems with code. Over the years, 
              I&apos;ve worked with startups and established companies, helping them bring their 
              digital visions to life.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I believe in continuous learning and staying up-to-date with the latest technologies. 
                When I&apos;m not coding, you can find me exploring new design trends, contributing to 
                open-source projects, or mentoring aspiring developers.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="glass-effect px-4 py-2 rounded-full">
                  <span className="text-cyan-400 font-semibold">50+</span> Projects Completed
                </div>
                <div className="glass-effect px-4 py-2 rounded-full">
                  <span className="text-cyan-400 font-semibold">5+</span> Years Experience
                </div>
                <div className="glass-effect px-4 py-2 rounded-full">
                  <span className="text-cyan-400 font-semibold">20+</span> Happy Clients
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-6">What I Do</h3>
                <div className="space-y-4">
                  {[
                    'Full-stack web development',
                    'Mobile app development',
                    'UI/UX design and prototyping',
                    'Cloud architecture and deployment',
                    'Performance optimization',
                    'Technical consulting'
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-center mb-12">
              Skills & <span className="gradient-text">Technologies</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup, index) => (
                <motion.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="glass-effect p-6 rounded-xl hover-lift group"
                >
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${skillGroup.color} mr-4`}>
                      <skillGroup.icon className="text-white" size={24} />
                    </div>
                    <h4 className="text-xl font-semibold">{skillGroup.category}</h4>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300 
                                 group-hover:bg-gray-600/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection

