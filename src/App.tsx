import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Code,
  User,
  Cpu,
  FolderLock,
  ChevronRight,
  Clock,
  CheckCircle,
  Users,
  Send,
  Dribbble,
  ArrowRight
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  type: 'Frontend' | 'Backend' | 'Full Stack';
  link?: string;
  github?: string;
  image?: string;
}

interface Skill {
  name: string;
  percentage: number;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "Coffee Shop",
    description: "A warm, inviting digital café experience — beautifully crafted with pure HTML & CSS to bring the aroma of coffee to your screen.",
    tags: ["HTML", "CSS"],
    gradient: "from-amber-600/80 to-stone-900/80",
    type: "Frontend",
    link: "https://coffe-shop-website-kappa.vercel.app/",
    image: "/project_coffee.png"
  },
  {
    title: "Greener Nigeria",
    description: "A tree planting awareness campaign encouraging Nigerians to join the movement to plant and protect trees for a greener future.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-green-600/80 to-emerald-900/80",
    type: "Frontend",
    link: "https://treeplanting-two.vercel.app/",
    image: "/project_greener.png"
  },
  {
    title: "Studify",
    description: "A focused student workspace to upload study materials, generate practice questions, and keep up with daily review — all in one place.",
    tags: ["HTML", "CSS", "JavaScript"],
    gradient: "from-violet-600/80 to-blue-900/80",
    type: "Frontend",
    link: "https://student-forge.vercel.app/",
    image: "/project_studify.png"
  }
];

const SKILLS: Skill[] = [
  { name: "HTML", percentage: 95 },
  { name: "CSS", percentage: 90 },
  { name: "JavaScript", percentage: 85 },
  { name: "React", percentage: 80 },
  { name: "Node.js", percentage: 75 }
];

const TOOLS = ["Git", "GitHub", "VS Code", "Figma", "REST APIs", "MongoDB"];

// --- Components ---

const GlassButton = ({ children, primary = false, className = "", onClick }: { children: React.ReactNode, primary?: boolean, className?: string, onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`glow-border glass-pill px-8 py-3 rounded-full font-semibold uppercase tracking-widest text-xs transition-all duration-300 ${primary ? 'bg-primary-container/20 border-primary/30 text-primary shadow-[0_0_20px_rgba(92,92,255,0.2)] hover:border-primary/60' : 'text-white hover:bg-white/10 border-white/10'} ${className}`}
  >
    {children}
  </motion.button>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-[90%] md:w-auto px-6 md:px-8 py-3 bg-white/10 backdrop-blur-[60px] rounded-full border border-white/20 shadow-[0_20px_50px_rgba(92,92,255,0.15)] transition-all duration-300 ${scrolled ? 'scale-95' : 'scale-100'}`}
    >
      <div className="md:mr-8 text-xl font-bold text-white tracking-tighter">Esther Ilori</div>
      <div className="hidden md:flex gap-8">
        {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-white/60 hover:text-white transition-colors font-serif text-sm px-2 py-1"
          >
            {item}
          </a>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="md:ml-8 px-5 py-2 bg-primary-container/30 border border-primary/30 text-white rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap"
      >
        Hire Me
      </motion.button>
    </motion.nav>
  );
};

const SectionHeading = ({ subtitle, title }: { subtitle?: string, title: string }) => (
  <div className="mb-12">
    {subtitle && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-primary font-semibold uppercase tracking-[0.3em] text-[10px] mb-2"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="text-5xl md:text-6xl font-bold text-white tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

const ProgressCircle: React.FC<Skill> = ({ percentage, name }) => (
  <div className="flex flex-col items-center group">
    <div className="relative w-28 h-28 mb-4">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="40"
          className="stroke-white/10 fill-none"
          strokeWidth="6"
        />
        <motion.circle
          cx="50" cy="50" r="40"
          className="stroke-primary fill-none group-hover:stroke-secondary transition-colors duration-500"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ strokeDasharray: "251.2", strokeDashoffset: "251.2" }}
          whileInView={{ strokeDashoffset: String(251.2 - (251.2 * percentage) / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">
        {percentage}%
      </div>
    </div>
    <span className="text-white/60 group-hover:text-white transition-colors font-medium">
      {name}
    </span>
  </div>
);

export default function App() {
  const [filter, setFilter] = useState<'All' | 'Frontend' | 'Backend' | 'Full Stack'>('All');
  const [isImageToggled, setIsImageToggled] = useState(false);
  const [theme, setTheme] = useState<'theme-default' | 'theme-blaze' | 'theme-cyber'>('theme-default');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Apply theme class to root so body background also updates
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-blaze', 'theme-cyber');
    if (theme !== 'theme-default') root.classList.add(theme);
  }, [theme]);

  const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.type === filter);

  // Pick the correct image pair based on active theme
  const heroImageMap = {
    'theme-default': { src: '/hero_abstract_shape.png',       alt: '/hero_indigo_alt.png' },
    'theme-blaze':   { src: '/hero_abstract_shape_hover.png', alt: '/hero_abstract_shape_cyber.png' },
    'theme-cyber':   { src: '/hero_abstract_shape_cyber.png', alt: '/hero_abstract_shape.png' },
  };
  const { src: heroSrc, alt: heroAlt } = heroImageMap[theme];

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-primary/30">
      <Nav />

      {/* Atmospheric Background Layers */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(92,92,255,0.05)_0%,transparent_70%)]" />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between relative">
        
        {/* Floating Particles Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full shadow-[0_0_10px_rgba(193,193,255,0.8)]"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: Math.random() * 0.5 + 0.1
              }}
              animate={{ 
                y: [null, Math.random() * -200 - 100],
                opacity: [null, 0]
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Left Column: Big Typography */}
        <div className="w-full lg:w-[50%] z-10 flex flex-col relative">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[15vw] lg:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 leading-[0.85] tracking-tighter uppercase"
          >
            Esther
          </motion.h1>
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[15vw] lg:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-primary via-secondary to-tertiary leading-[0.85] tracking-tighter uppercase lg:ml-12 drop-shadow-[0_0_30px_rgba(92,92,255,0.3)]"
          >
            Ilori
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-primary to-transparent mt-8 lg:mt-12 max-w-md hidden md:block"
          />

          {/* Intro Text & Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 lg:mt-12 max-w-xl"
          >
            <p className="text-lg md:text-2xl text-on-surface-variant font-medium mb-8 leading-relaxed">
              Full Stack Developer crafting <span className="text-primary italic font-serif glow-text">unconventional</span>, high-performance web experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GlassButton primary onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="border-primary hover:bg-primary hover:text-white">
                View Work
              </GlassButton>
              <GlassButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Contact
              </GlassButton>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Dynamic Abstract Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="w-full lg:w-[45%] mt-16 lg:mt-0 z-20 flex justify-center lg:justify-end relative"
        >
          {/* Glowing backdrop for the image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-secondary/20 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full max-w-lg aspect-square"
          >
            {/* Layered Glass Frames */}
            <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] rotate-6 transition-transform duration-500 hover:rotate-12"></div>
            <div className="absolute inset-0 rounded-[3rem] border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-xl shadow-[0_0_30px_rgba(92,92,255,0.2)] -rotate-3 transition-transform duration-500 hover:-rotate-6"></div>
            
            {/* The Generated Abstract Image */}
            <div 
              className="absolute inset-0 rounded-[3rem] overflow-hidden p-2 group cursor-pointer"
              onClick={() => setIsImageToggled(!isImageToggled)}
            >
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Default image — visible normally, fades on hover or click */}
                <img
                  src={heroSrc}
                  alt="Hero shape default"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                    group-hover:opacity-0 group-hover:scale-105
                    ${isImageToggled ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
                />
                {/* Alt image — hidden normally, shows on hover or click */}
                <img
                  src={heroAlt}
                  alt="Hero shape alt"
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700
                    group-hover:opacity-100 group-hover:scale-100
                    ${isImageToggled ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="glass-card p-4 rounded-xl rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden relative">
                <img
                  src="/profile.jpg"
                  alt="Esther Ilori"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-60" />
              </div>
              {/* Chips */}
              <motion.div
                initial={{ rotate: -12, scale: 0 }}
                whileInView={{ rotate: -12, scale: 1 }}
                className="absolute -top-8 -left-8 glass-pill px-6 py-2 rounded-full text-[10px] font-bold text-primary shadow-xl"
              >
                Problem Solver
              </motion.div>
              <div className="absolute top-1/2 -right-12 glass-pill px-6 py-2 rounded-full text-[10px] font-bold text-secondary shadow-xl rotate-12">
                Creative Thinker
              </div>
              <div className="absolute -bottom-6 left-1/4 glass-pill px-6 py-2 rounded-full text-[10px] font-bold text-tertiary shadow-xl -rotate-3">
                Tech Enthusiast
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="glass-card p-12 rounded-xl">
              <h2 className="text-4xl font-bold text-white mb-8">Hello, I'm Esther.</h2>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                I'm a passionate Full Stack Developer who builds sleek, performant web applications using modern technologies. I love turning complex problems into elegant, user-centric digital experiences.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
                My approach combines rigorous logic with an eye for ethereal, refined aesthetics. I believe every pixel should serve a purpose while maintaining a sense of visual delight.
              </p>

              <div className="grid grid-cols-3 gap-6">
                {[
                  { icon: Clock, label: "3+ Years", sub: "Experience" },
                  { icon: CheckCircle, label: "20+", sub: "Projects" },
                  { icon: Users, label: "10+", sub: "Clients" }
                ].map((stat, i) => (
                  <div key={i} className="text-center">
                    <stat.icon className="mx-auto mb-3 text-primary" size={24} />
                    <div className="text-2xl font-bold text-white">{stat.label}</div>
                    <div className="text-[10px] uppercase text-on-surface-variant tracking-[0.2em]">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
        <SectionHeading subtitle="Expertise" title="Tech Stack" />

        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {SKILLS.map((skill) => (
            <ProgressCircle key={skill.name} name={skill.name} percentage={skill.percentage} />
          ))}
        </div>

        <div className="glass-card p-12 rounded-xl">
          <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/5 pb-6">Tools & Workflow</h3>
          <div className="flex flex-wrap gap-4">
            {TOOLS.map((tool) => (
              <motion.div
                key={tool}
                whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)" }}
                className="glass-pill px-8 py-3 rounded-full text-sm font-medium text-on-surface-variant transition-all cursor-default border-white/5"
              >
                {tool}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeading title="Featured Projects" />
          <div className="flex flex-wrap justify-center gap-4">
            {['All', 'Frontend', 'Backend', 'Full Stack'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-8 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${filter === f ? 'bg-primary-container text-white border-primary-container shadow-lg shadow-primary/20' : 'bg-white/5 text-on-surface-variant border-white/10 hover:bg-white/10'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4 }}
                key={project.title}
                onClick={() => setSelectedProject(project)}
                className="glass-card rounded-xl overflow-hidden group border-white/10 cursor-pointer"
              >
              <div className={`h-48 bg-gradient-to-br ${project.gradient} overflow-hidden relative`}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full p-8 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center"
                      >
                        <Code className="text-white" size={32} />
                      </motion.div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-2 font-bold">{project.type}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-primary/60 font-bold flex items-center gap-1 group-hover:text-primary transition-colors">
                    View details <ChevronRight size={12} />
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl overflow-hidden w-full max-w-lg border-white/10 shadow-2xl shadow-black/60"
            >
              {/* Modal Header Banner */}
              <div className="h-52 relative overflow-hidden">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className={`w-full h-full bg-gradient-to-br ${selectedProject.gradient}`} />
                )}
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-1">{selectedProject.type}</div>
                    <h2 className="text-3xl font-black text-white tracking-tight">{selectedProject.title}</h2>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8">
                <p className="text-on-surface-variant text-base leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mb-3">Built with</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-4 py-1.5 rounded-full border border-secondary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-primary-container/20 border border-primary/30 text-primary font-bold uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 hover:border-primary/60 transition-all"
                    >
                      Visit Live Site <ExternalLink size={14} />
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-white/5 border border-white/10 text-white/60 font-bold uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
                    >
                      GitHub <Code size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="glass-pill px-5 py-3 rounded-full text-white/40 hover:text-white text-xs font-bold uppercase tracking-widest transition-all border-white/10"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-6">Let's Build Something Together</h2>
            <p className="text-on-surface-variant text-lg">
              I'm open to freelance projects, full-time roles, and collaborations.
            </p>
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="glass-card p-12 rounded-xl"
          >
            <form className="space-y-6">
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'John Doe' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'hello@example.com' }
              ].map((field) => (
                <div key={field.id} className="space-y-2">
                  <label htmlFor={field.id} className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest pl-1">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.id}
                    placeholder={field.placeholder}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
              <div className="space-y-2">
                <label htmlFor="message" className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest pl-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="How can I help you?"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-primary-container/20 border border-primary/30 text-primary font-bold uppercase tracking-widest text-xs rounded-full flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(92,92,255,0.15)] hover:border-primary/60 transition-all"
              >
                Send Message <Send size={16} />
              </motion.button>
            </form>
          </motion.div>

          <div className="flex justify-center gap-4 mt-12">
            {[
              { icon: Github, label: "GitHub", href: "https://github.com/estheroluwatosin45-starlight" },
              { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/-esther-ilori" },
              { icon: Twitter, label: "Twitter", href: "https://twitter.com/EstherOluw91095" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-pill px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold text-on-surface-variant hover:text-white transition-all border-white/10"
              >
                <social.icon size={16} /> {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 mt-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold text-white tracking-tighter">Esther Ilori</div>
          <p className="text-white/30 text-xs uppercase tracking-widest font-serif">
            © 2024 Esther Ilori. Crafted with precision.
          </p>
          <div className="flex gap-8">
            {[
              { label: 'LinkedIn', href: 'https://linkedin.com/in/-esther-ilori' }, 
              { label: 'Dribbble', href: 'https://dribbble.com/esther_ilori' }, 
              { label: 'GitHub', href: 'https://github.com/estheroluwatosin45-starlight' }, 
              { label: 'Twitter', href: 'https://twitter.com/EstherOluw91095' }
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Theme Switcher */}
      <div className="fixed bottom-6 right-6 z-50 glass-pill px-4 py-3 rounded-full flex gap-3 shadow-2xl shadow-black/50 border-white/20">
        <button 
          onClick={() => setTheme('theme-default')}
          className={`w-6 h-6 rounded-full bg-[#c1c1ff] border-2 transition-all ${theme === 'theme-default' ? 'border-white scale-125' : 'border-transparent hover:scale-110'}`}
          title="Indigo Theme"
        />
        <button 
          onClick={() => setTheme('theme-blaze')}
          className={`w-6 h-6 rounded-full bg-[#ffb4a9] border-2 transition-all ${theme === 'theme-blaze' ? 'border-white scale-125' : 'border-transparent hover:scale-110'}`}
          title="Blaze Theme"
        />
        <button 
          onClick={() => setTheme('theme-cyber')}
          className={`w-6 h-6 rounded-full bg-[#58dfc4] border-2 transition-all ${theme === 'theme-cyber' ? 'border-white scale-125' : 'border-transparent hover:scale-110'}`}
          title="Cyber Theme"
        />
      </div>
    </div>
  );
}
