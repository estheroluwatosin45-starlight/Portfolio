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
}

interface Skill {
  name: string;
  percentage: number;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "A high-performance scalable headless commerce solution with real-time inventory management.",
    tags: ["Next.js", "Stripe", "Tailwind"],
    gradient: "from-emerald-500/80 to-teal-900/80",
    type: "Full Stack"
  },
  {
    title: "Social Dashboard",
    description: "Real-time analytics dashboard aggregating multiple social media feeds into a unified clean interface.",
    tags: ["React", "Node.js", "GraphQL"],
    gradient: "from-orange-500/80 to-pink-900/80",
    type: "Frontend"
  },
  {
    title: "FinTech App",
    description: "Secure mobile-first banking interface with predictive budgeting and visual data representation.",
    tags: ["Vue.js", "Python", "PostgreSQL"],
    gradient: "from-blue-600/80 to-indigo-900/80",
    type: "Full Stack"
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

  const filteredProjects = PROJECTS.filter(p => filter === 'All' || p.type === filter);

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
      <section className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between relative">
        {/* Background edgy elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border border-primary/40 rotate-45 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-20 w-64 h-64 border border-secondary/20 rounded-full pointer-events-none mix-blend-overlay"></div>
        
        {/* Left Column: Big Typography */}
        <div className="w-full md:w-[60%] z-10 flex flex-col relative">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[18vw] md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50 leading-[0.85] tracking-tighter uppercase"
          >
            Esther
          </motion.h1>
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-[18vw] md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary leading-[0.85] tracking-tighter uppercase ml-0 md:ml-12 lg:ml-24"
          >
            Ilori
          </motion.h1>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px bg-gradient-to-r from-primary to-transparent mt-12 max-w-md hidden md:block"
          />
        </div>

        {/* Right Column: Overlapping Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full md:w-[45%] mt-12 md:mt-0 md:-ml-[10%] z-20"
        >
          <div className="glass-card rounded-none md:rounded-2xl border-l-4 border-l-primary border-t border-r border-b border-white/10 p-8 md:p-12 relative overflow-hidden backdrop-blur-xl bg-white/5 shadow-2xl shadow-black/50">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 blur-3xl rounded-full pointer-events-none" />
            
            <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed">
              Full Stack Developer crafting <span className="text-primary italic font-serif">unconventional</span>, high-performance web experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <GlassButton primary onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="!rounded-none border-primary hover:bg-primary hover:text-white">
                View Work
              </GlassButton>
              <GlassButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="!rounded-none">
                Contact
              </GlassButton>
            </div>

            {/* Edgy accent */}
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/50" />
            <div className="absolute top-0 right-8 w-px h-16 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
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
            {filteredProjects.map((project, i) => (
              <motion.article
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.4 }}
                key={project.title}
                className="glass-card rounded-xl overflow-hidden group border-white/10"
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} p-8 flex items-center justify-center overflow-hidden`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center"
                  >
                    <Code className="text-white" size={32} />
                  </motion.div>
                </div>
                <div className="p-8">
                  <div className="text-[10px] uppercase tracking-widest text-primary mb-2 font-bold">{project.type}</div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button className="glass-pill p-3 rounded-full hover:text-primary transition-colors border-white/10">
                      <Code size={18} />
                    </button>
                    <button className="glass-pill p-3 rounded-full hover:text-primary transition-colors border-white/10">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

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
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Twitter, label: "Twitter", href: "#" }
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
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
            {['LinkedIn', 'Dribbble', 'GitHub', 'Twitter'].map(link => (
              <a
                key={link}
                href="#"
                className="text-white/40 hover:text-primary transition-colors text-[10px] uppercase tracking-widest font-bold"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
