'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, inventory management, and admin dashboard.',
    image: '/project1.png',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'AWS'],
    category: 'Full Stack',
    date: '2024',
    github: '#',
    live: '#',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: '/project2.jpg',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io'],
    category: 'Web App',
    date: '2024',
    github: '#',
    live: '#',
    featured: true
  },
  {
    id: 3,
    title: 'Mobile Fitness App',
    description: 'Cross-platform mobile app for fitness tracking with workout plans, progress monitoring, and social features.',
    image: '/api/placeholder/600/400',
    technologies: ['React Native', 'Firebase', 'Redux', 'Expo'],
    category: 'Mobile',
    date: '2023',
    github: '#',
    live: '#',
    featured: false
  },
  {
    id: 4,
    title: 'AI-Powered Analytics Dashboard',
    description: 'Business intelligence dashboard with AI-driven insights, data visualization, and predictive analytics.',
    image: '/api/placeholder/600/400',
    technologies: ['Vue.js', 'Python', 'TensorFlow', 'D3.js'],
    category: 'Data Science',
    date: '2023',
    github: '#',
    live: '#',
    featured: false
  },
  {
    id: 5,
    title: 'Real Estate Platform',
    description: 'Modern real estate platform with property listings, virtual tours, and mortgage calculator.',
    image: '/api/placeholder/600/400',
    technologies: ['React', 'GraphQL', 'MongoDB', 'Mapbox'],
    category: 'Web Platform',
    date: '2023',
    github: '#',
    live: '#',
    featured: false
  },
  {
    id: 6,
    title: 'Blockchain Voting System',
    description: 'Secure voting system built on blockchain technology ensuring transparency and immutability.',
    image: '/api/placeholder/600/400',
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'React'],
    category: 'Blockchain',
    date: '2022',
    github: '#',
    live: '#',
    featured: false
  }
]

const categories = ['All', 'Full Stack', 'Web App', 'Mobile', 'Data Science', 'Web Platform', 'Blockchain']

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(projects)

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(project => project.category === selectedCategory))
    }
  }, [selectedCategory])

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section id="projects" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Here are some of my recent projects that showcase my skills and passion for creating 
              innovative digital solutions.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'glass-effect hover:bg-cyan-500/10 text-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Projects */}
          <motion.div variants={itemVariants} className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center">Featured Work</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredProjects.filter(project => project.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.3 }}
                  className="glass-effect rounded-2xl overflow-hidden hover-lift group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 glass-effect rounded-full hover:bg-cyan-500/20"
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 glass-effect rounded-full hover:bg-cyan-500/20"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Tag size={16} className="text-cyan-400" />
                        <span className="text-sm text-cyan-400">{project.category}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-400">{project.date}</span>
                      </div>
                    </div>
                    
                    <h4 className="text-xl font-semibold mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h4>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Other Projects */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-8 text-center">Other Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.filter(project => !project.featured).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.5 }}
                  className="glass-effect rounded-xl overflow-hidden hover-lift group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                      <div className="text-4xl opacity-20">💻</div>
                    </div>
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <motion.a
                        href={project.github}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 glass-effect rounded-full hover:bg-cyan-500/20"
                      >
                        <Github size={16} />
                      </motion.a>
                      <motion.a
                        href={project.live}
                        whileHover={{ scale: 1.1 }}
                        className="p-2 glass-effect rounded-full hover:bg-cyan-500/20"
                      >
                        <ExternalLink size={16} />
                      </motion.a>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-cyan-400">{project.category}</span>
                      <span className="text-xs text-gray-400">{project.date}</span>
                    </div>
                    
                    <h4 className="text-lg font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h4>
                    
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs text-gray-400">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
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

export default ProjectsSection

