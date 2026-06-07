"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Trophy,
  TrendingUp,
  Lightbulb,
  MessageSquare,
  Handshake,
  BarChart3,
  Presentation,
  Globe,
  Instagram,
  Linkedin,
  Star,
  Zap,
  Crown,
  ChevronDown,
  Target,
  Rocket,
  Download,
  Smartphone,
  X,
} from "lucide-react";

/* ─── PWA Types ─── */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

/* ─── Animation on Scroll Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Typing Effect ─── */
function TypingText({ texts, speed = 80, pause = 2000 }: { texts: string[]; speed?: number; pause?: number }) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];

    if (deleting && charIdx === 0) {
      const nextIdx = (idx + 1) % texts.length;
      const timer = setTimeout(() => {
        setDeleting(false);
        setIdx(nextIdx);
      }, speed / 2);
      return () => clearTimeout(timer);
    }

    let timer: NodeJS.Timeout;

    if (!deleting && charIdx < current.length) {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, charIdx + 1));
        setCharIdx(charIdx + 1);
      }, speed);
    } else if (!deleting && charIdx === current.length) {
      timer = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timer = setTimeout(() => {
        setDisplay(current.slice(0, charIdx - 1));
        setCharIdx(charIdx - 1);
      }, speed / 2);
    }

    return () => clearTimeout(timer);
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return (
    <span className="typing-cursor">{display}</span>
  );
}

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal();

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [visible, target]);

  return <span ref={ref} className="counter-glow">{count}{suffix}</span>;
}

/* ─── Data ─── */
const TYPING_PHRASES = [
  "Estratega Comercial",
  "Líder Transformacional",
  "Oficial Senior Corporativo",
  "El estándar es la excelencia",
];

const STATS = [
  { value: 7, suffix: "+", label: "Años de Trayectoria", icon: TrendingUp },
  { value: 136, suffix: "", label: "Años CCG", icon: Crown },
  { value: 100, suffix: "%", label: "Compromiso", icon: Target },
];

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Estrategia Comercial",
    desc: "Diseño e implementación de estrategias de venta que transforman resultados. Desde el diagnóstico hasta la ejecución.",
    badge: "Core",
    badgeColor: "bg-brand-gold/15 text-brand-gold",
  },
  {
    icon: Lightbulb,
    title: "Liderazgo Transformacional",
    desc: "Conduzco equipos hacia su máximo potencial con visión, intuición y un estándar de excelencia que inspira.",
    badge: "Esencia",
    badgeColor: "bg-brand-gold/15 text-brand-gold",
  },
  {
    icon: Handshake,
    title: "Gestión Corporativa",
    desc: "Relaciones estratégicas con socios clave, instituciones y tomadores de decisión en el ecosistema empresarial.",
    badge: "Premium",
    badgeColor: "bg-purple-500/15 text-purple-400",
  },
  {
    icon: BarChart3,
    title: "Consultoría de Ventas",
    desc: "Análisis profundo de procesos comerciales y optimización de funnel para maximizar conversiones y revenue.",
    badge: "Popular",
    badgeColor: "bg-emerald-500/15 text-emerald-400",
  },
  {
    icon: Presentation,
    title: "Conferencias & Capacitación",
    desc: "Keynotes y talleres sobre ventas, liderazgo y transformación comercial. Energía que inspira acción.",
    badge: "Nuevo",
    badgeColor: "bg-cyan-500/15 text-cyan-400",
  },
  {
    icon: Globe,
    title: "Red de Negocios CCG",
    desc: "Acceso directo a la red de socios y beneficios de la Cámara de Comercio de Guayaquil. 136 años de respaldo.",
    badge: "Exclusivo",
    badgeColor: "bg-amber-500/15 text-amber-400",
  },
];

const EXPERTISE = [
  "Estrategia Comercial", "Ventas B2B & B2C", "Liderazgo Transformacional",
  "Negociación de Alto Nivel", "Gestión de Cuentas Key", "Marketing Relacional",
  "Expansión de Mercado", "Consultoría Empresarial", "Networking Estratégico", "Capacitación Comercial",
];

const MARQUEE_ITEMS = [
  "Excelencia", "✦", "Intuición", "✦", "Crecimiento", "✦",
  "Estrategia", "✦", "Liderazgo", "✦", "Transformación", "✦",
  "Compromiso", "✦", "Visión", "✦", "Resultados", "✦",
];

const GALLERY = [
  { src: "/images/jose/podio-ccg.jpg", alt: "Hablando en el evento 136 años de la CCG" },
  { src: "/images/jose/guinness.jpg", alt: "Certificado Guinness World Records" },
  { src: "/images/jose/alfombra-roja.jpg", alt: "Presencia en alfombra roja" },
  { src: "/images/jose/microfono-evento.jpg", alt: "Presentando en evento corporativo" },
  { src: "/images/jose/lounge.jpg", alt: "Look ejecutivo premium" },
  { src: "/images/jose/podio-gris.jpg", alt: "Conferencia empresarial" },
];

const TESTIMONIALS = [
  {
    initial: "M",
    name: "María Fernanda L.",
    role: "Directora Comercial, Grupo Empresarial del Litoral",
    text: "José Adrián no solo es un estratega comercial excepcional, es un catalizador de cambio. Su capacidad para identificar oportunidades donde otros ven obstáculos es lo que lo distingue en el mercado.",
  },
  {
    initial: "R",
    name: "Roberto S.",
    role: "CEO, Distribuidora Pacífico",
    text: "Trabajar con José Adrián transformó nuestra visión comercial. Su intuición para los negocios y su liderazgo nos ayudaron a abrir mercados que nunca imaginamos. Un verdadero game changer.",
  },
  {
    initial: "A",
    name: "Andrea P.",
    role: "Gerente de Ventas, Tecnología Andina",
    text: "La energía y el profesionalismo de José Adrián son contagiantes. Su consultoría nos permitió reestructurar todo nuestro proceso de ventas y los resultados hablan solos: 40% más de conversiones.",
  },
];

const PILARES = [
  {
    icon: Target,
    title: "Excelencia",
    desc: "Cada detalle cuenta. Mi estándar no tiene punto medio.",
    gradient: "from-brand-gold to-brand-gold-light",
  },
  {
    icon: Lightbulb,
    title: "Intuición",
    desc: "Leo el mercado antes de que el mercado hable. Esa es mi ventaja.",
    gradient: "from-brand-gold-light to-amber-400",
  },
  {
    icon: Rocket,
    title: "Crecimiento",
    desc: "Mi único destino. Si no creces, algo está mal. Y yo lo arreglo.",
    gradient: "from-amber-400 to-brand-gold-dim",
  },
];

/* ─── Main Page ─── */
export default function HomePage() {
  const [whatsappVisible, setWhatsappVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setWhatsappVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }
    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowInstallBanner(true), 4000);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    setShowInstallBanner(false);
  }, [installPrompt]);

  const openLightbox = useCallback((i: number) => {
    setLightboxIdx(i);
    setLightboxOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <main className="flex-1 pb-4">
        {/* ═══════ HERO ═══════ */}
        <section className="relative">
          <div className="relative h-56 sm:h-72 overflow-hidden">
            <Image
              alt="Cover background"
              src="/images/jose/cover-bg.png"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 cover-gradient" />
            {/* Floating gold particles */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-brand-gold/40 animate-float" style={{ animationDelay: "0s" }} />
              <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-brand-gold/30 animate-float" style={{ animationDelay: "1s" }} />
              <div className="absolute bottom-1/4 left-1/2 w-1 h-1 rounded-full bg-brand-gold/50 animate-float" style={{ animationDelay: "2s" }} />
            </div>
          </div>

          <div className="relative max-w-lg mx-auto px-4">
            {/* Profile Photo */}
            <RevealSection delay={100}>
              <div className="relative -mt-20 mb-4 flex justify-center">
                <div className="relative animate-float" style={{ animationDuration: "6s" }}>
                  <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-brand-dark glow-gold">
                    <Image
                      alt="José Adrián Coello Moreira"
                      src="/images/jose/alfombra-roja.jpg"
                      width={144}
                      height={144}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  {/* Crown badge */}
                  <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-gradient-gold flex items-center justify-center border-2 border-brand-dark">
                    <Crown size={16} className="text-brand-dark" strokeWidth={3} />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-brand-dark pulse-online" />
                </div>
              </div>
            </RevealSection>

            {/* Name & Typing Tagline */}
            <RevealSection delay={200}>
              <div className="text-center mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
                  José Adrián Coello
                </h1>
                <div className="text-gradient-gold font-semibold text-base sm:text-lg mt-1 min-h-[28px]">
                  ✦ <TypingText texts={TYPING_PHRASES} speed={60} pause={2500} />
                </div>
                <p className="text-muted-foreground text-sm mt-3 max-w-xs mx-auto leading-relaxed italic">
                  &ldquo;La excelencia es mi estándar, la intuición es mi brújula y el crecimiento es mi único destino.&rdquo;
                </p>
              </div>
            </RevealSection>

            {/* Social Links */}
            <RevealSection delay={300}>
              <div className="flex items-center justify-center gap-3 mt-4 mb-2">
                <a
                  href="https://www.linkedin.com/in/jos%C3%A9-adri%C3%A1n-coello-moreira-22006817b"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-xl bg-brand-card hover:bg-brand-card-hover flex items-center justify-center text-muted-foreground hover:text-brand-linkedin transition-all duration-300 hover:scale-110 border border-brand-border"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="https://www.instagram.com/ja.coello"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-brand-card hover:bg-brand-card-hover flex items-center justify-center text-muted-foreground hover:text-brand-gold transition-all duration-300 hover:scale-110 border border-brand-border"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.laccg.ec"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Cámara de Comercio de Guayaquil"
                  className="w-10 h-10 rounded-xl bg-brand-card hover:bg-brand-card-hover flex items-center justify-center text-muted-foreground hover:text-brand-gold transition-all duration-300 hover:scale-110 border border-brand-border"
                >
                  <Globe size={20} />
                </a>
              </div>
            </RevealSection>

            {/* Stats with animated counters */}
            <RevealSection delay={400}>
              <div className="flex items-center justify-center gap-4 mt-4 mb-6 py-4 px-4 glass-card rounded-2xl">
                {STATS.map((stat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    {i > 0 && <div className="w-px h-10 bg-brand-border -ml-4" />}
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <stat.icon size={14} className="text-brand-gold/60" />
                        <p className="text-xl font-bold text-foreground">
                          <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                        </p>
                      </div>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </section>

        {/* ═══════ SHIMMER DIVIDER ═══════ */}
        <div className="max-w-lg mx-auto px-8"><div className="shimmer-line" /></div>

        {/* ═══════ PILARES ═══════ */}
        <section className="max-w-lg mx-auto px-4 py-8">
          <RevealSection>
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Mis <span className="text-gradient-gold">3 Pilares</span>
              </h2>
              <div className="w-12 h-1 bg-gradient-gold rounded-full mx-auto mt-2" />
            </div>
          </RevealSection>

          <div className="space-y-3">
            {PILARES.map((p, i) => (
              <RevealSection key={i} delay={i * 120}>
                <div className="glass-card rounded-2xl p-5 group hover:bg-brand-card-hover transition-all duration-300 border border-brand-border hover:border-brand-gold/20 shine-effect">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center shrink-0`}>
                      <p.icon size={22} className="text-brand-dark" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-base">{p.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ═══════ ACTION BUTTONS ═══════ */}
        <section className="max-w-lg mx-auto px-4 py-2">
          <RevealSection>
            <p className="text-center text-sm font-medium text-muted-foreground mb-4">
              Conectemos — elige cómo:
            </p>
          </RevealSection>

          <div className="space-y-3">
            <RevealSection delay={100}>
              <a
                href="https://api.whatsapp.com/send/?phone=593990000000&text=Hola%20Jos%C3%A9%20Adri%C3%A1n%2C%20vi%20tu%20perfil%20y%20quiero%20conectar.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-4 rounded-2xl border transition-all duration-300 group cursor-pointer bg-brand-whatsapp/10 hover:bg-brand-whatsapp/20 text-brand-whatsapp border-brand-whatsapp/20 btn-whatsapp"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-brand-whatsapp/20">
                  <MessageSquare size={22} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base">WhatsApp</p>
                  <p className="text-xs text-brand-whatsapp/70">Conversemos ahora</p>
                </div>
                <ChevronRight size={18} className="text-brand-whatsapp/50 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </RevealSection>

            <RevealSection delay={200}>
              <a
                href="/jose-coello.vcf"
                download="Jose_Coello.vcf"
                className="flex items-center gap-4 w-full p-4 rounded-2xl border transition-all duration-300 group cursor-pointer glass-card hover:bg-brand-card-hover text-foreground border-brand-border"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-brand-gold/10">
                  <Download size={22} className="text-brand-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base">Guardar Contacto</p>
                  <p className="text-xs text-muted-foreground">Descarga mi tarjeta digital (VCF)</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </RevealSection>

            <RevealSection delay={300}>
              <a
                href="https://www.instagram.com/ja.coello"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-4 rounded-2xl border transition-all duration-300 group cursor-pointer glass-card hover:bg-brand-card-hover text-foreground border-brand-border"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-brand-gold/10">
                  <Instagram size={22} className="text-brand-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base">Instagram</p>
                  <p className="text-xs text-muted-foreground">Sígueme en @ja.coello</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </RevealSection>

            <RevealSection delay={400}>
              <a
                href="https://reddesociosccg.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-4 rounded-2xl border transition-all duration-300 group cursor-pointer glass-card hover:bg-brand-card-hover text-foreground border-brand-border shine-effect"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-brand-gold/10">
                  <Crown size={22} className="text-brand-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm sm:text-base">Red de Socios CCG</p>
                  <p className="text-xs text-muted-foreground">Beneficios exclusivos para socios</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </RevealSection>
          </div>
        </section>

        {/* ═══════ MARQUEE ═══════ */}
        <div className="py-6 overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={i}
                className={`mx-4 text-sm font-medium ${item === "✦" ? "text-brand-gold/40" : "text-muted-foreground/30"}`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ═══════ ABOUT ═══════ */}
        <section id="sobre-mi" className="max-w-lg mx-auto px-4 py-4">
          <RevealSection>
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Sobre <span className="text-gradient-gold">Mí</span>
              </h2>
              <div className="w-12 h-1 bg-gradient-gold rounded-full mx-auto mt-2" />
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="glass-card rounded-2xl p-6 border border-brand-border">
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
                Soy{" "}
                <span className="text-foreground font-medium">
                  Oficial Senior Corporativo
                </span>{" "}
                en la{" "}
                <span className="text-foreground font-medium">
                  Cámara de Comercio de Guayaquil
                </span>
                , una institución con más de{" "}
                <span className="text-foreground font-medium">136 años</span> de
                trayectoria impulsando el desarrollo empresarial del Ecuador.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-4">
                Con más de{" "}
                <span className="text-foreground font-medium">7 años de experiencia</span>{" "}
                en la gestión estratégica de sectores comerciales, he desarrollado una
                visión única que combina{" "}
                <span className="text-foreground font-medium">intuición comercial</span>{" "}
                con{" "}
                <span className="text-foreground font-medium">
                  estrategia corporativa
                </span>
                . Mi enfoque: transformar relaciones en resultados.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base mb-6">
                Creo firmemente que cada conexión es una oportunidad. Mi compromiso es
                impulsar el crecimiento de cada negocio y persona con la que interactúo. ✦
              </p>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {EXPERTISE.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-brand-gold/10 text-brand-gold border border-brand-gold/20 hover:bg-brand-gold/15 hover:border-brand-gold/30 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ═══════ SERVICES ═══════ */}
        <section id="servicios" className="max-w-lg mx-auto px-4 py-8">
          <RevealSection>
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Mis <span className="text-gradient-gold">Servicios</span>
              </h2>
              <div className="w-12 h-1 bg-gradient-gold rounded-full mx-auto mt-2" />
            </div>
          </RevealSection>

          <div className="space-y-3">
            {SERVICES.map((service, i) => (
              <RevealSection key={i} delay={i * 80}>
                <div className="glass-card rounded-2xl p-5 group hover:bg-brand-card-hover transition-all duration-300 cursor-pointer border border-brand-border hover:border-brand-gold/20 shine-effect">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold shrink-0 group-hover:bg-brand-gold/20 transition-colors">
                      <service.icon size={26} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground text-sm sm:text-base">
                          {service.title}
                        </h3>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${service.badgeColor}`}>
                          {service.badge}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ═══════ GALLERY ═══════ */}
        <section id="galeria" className="max-w-lg mx-auto px-4 py-8">
          <RevealSection>
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                <span className="text-gradient-gold">Momentos</span> que Definen
              </h2>
              <div className="w-12 h-1 bg-gradient-gold rounded-full mx-auto mt-2" />
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="grid grid-cols-2 gap-3">
              {GALLERY.map((item, i) => (
                <button
                  key={i}
                  onClick={() => openLightbox(i)}
                  className={`gallery-item relative aspect-[3/4] rounded-2xl overflow-hidden border border-brand-border hover:border-brand-gold/30 transition-all duration-300 ${
                    i === 0 ? "col-span-2 aspect-[16/9]" : ""
                  }`}
                >
                  <Image
                    alt={item.alt}
                    src={item.src}
                    fill
                    className="object-cover"
                    sizes={i === 0 ? "(max-width: 640px) 100vw, 640px" : "(max-width: 640px) 50vw, 320px"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <p className="text-white text-xs font-medium drop-shadow-lg">{item.alt}</p>
                  </div>
                </button>
              ))}
            </div>
          </RevealSection>
        </section>

        {/* ═══════ GUINNESS ACHIEVEMENT ═══════ */}
        <section className="max-w-lg mx-auto px-4 py-4">
          <RevealSection>
            <div className="glass-card rounded-2xl p-6 border border-brand-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-brand-gold/10 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-brand-gold/5 to-transparent rounded-tr-full" />
              <div className="flex items-start gap-4 relative">
                <div className="w-14 h-14 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
                  <Trophy size={28} className="text-brand-gold" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-base mb-1 flex items-center gap-2">
                    Guinness World Records
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-gold/15 text-brand-gold">Oficial</span>
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Reconocido oficialmente por Guinness World Records. Un logro que
                    refleja mi compromiso con la excelencia y la superación constante.
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>
        </section>

        {/* ═══════ VIDEO — YouTube Shorts ═══════ */}
        <section className="max-w-lg mx-auto px-4 py-8">
          <RevealSection>
            <div className="text-center mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-3">
                <div className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span className="text-xs font-medium text-brand-gold">Video destacado</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Conóceme en <span className="text-gradient-gold">Segundos</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Una presentación que dice más que mil palabras</p>
            </div>

            {/* Phone Frame Container */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Glow ring behind phone */}
                <div className="absolute inset-0 rounded-[2.5rem] bg-brand-gold/10 blur-xl scale-110" />
                <div className="absolute -inset-2 rounded-[2.8rem] border border-brand-gold/10" />

                {/* Phone Frame */}
                <div className="relative w-[260px] sm:w-[280px] rounded-[2.2rem] overflow-hidden border-[3px] border-brand-gold/25 bg-brand-dark shadow-2xl shadow-brand-gold/10">
                  {/* Phone notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-brand-dark rounded-b-2xl z-10 flex items-center justify-center">
                    <div className="w-12 h-3 rounded-full bg-brand-card border border-brand-border" />
                  </div>

                  {/* Video container */}
                  <div className="relative aspect-[9/16] overflow-hidden">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/F-Qmffkv1qQ?rel=0&modestbranding=1&color=white&loop=1"
                      title="José Adrián Coello — Presentación"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>

                  {/* Phone bottom bar */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-foreground/20" />
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full border border-brand-gold/20 animate-float" style={{ animationDuration: "5s" }} />
                <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full border border-brand-gold/15 animate-float" style={{ animationDuration: "4s", animationDelay: "1s" }} />
                <div className="absolute top-1/3 -right-5 w-2 h-2 rounded-full bg-brand-gold/30 animate-float" style={{ animationDuration: "3s", animationDelay: "0.5s" }} />
              </div>
            </div>

            {/* CTA under video */}
            <div className="text-center mt-5">
              <a
                href="https://www.youtube.com/shorts/F-Qmffkv1qQ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-medium text-brand-gold/70 hover:text-brand-gold transition-colors duration-300"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                Ver en YouTube
              </a>
            </div>
          </RevealSection>
        </section>

        {/* ═══════ TESTIMONIALS ═══════ */}
        <section id="testimonios" className="max-w-lg mx-auto px-4 py-8">
          <RevealSection>
            <div className="text-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                Lo que dicen de <span className="text-gradient-gold">Mí</span>
              </h2>
              <div className="w-12 h-1 bg-gradient-gold rounded-full mx-auto mt-2" />
            </div>
          </RevealSection>

          <div className="space-y-3">
            {TESTIMONIALS.map((t, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="glass-card rounded-2xl p-5 border border-brand-border hover:border-brand-gold/10 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center text-brand-dark font-bold text-sm">
                      {t.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, si) => (
                        <Star key={si} size={14} fill="#d4af37" stroke="#d4af37" strokeWidth={2} />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed italic">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>

        {/* ═══════ CTA FINAL ═══════ */}
        <section className="max-w-lg mx-auto px-4 py-8">
          <RevealSection>
            <div className="glass-card rounded-2xl p-8 border border-brand-gold/20 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-gold/5 to-transparent pointer-events-none" />
              {/* Decorative circles */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border border-brand-gold/10" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border border-brand-gold/5" />

              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-brand-gold/15 flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDuration: "3s" }}>
                  <Zap size={32} className="text-brand-gold" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  ¿Listo para crecer?
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs mx-auto">
                  Cada gran negocio empieza con una conversación. Conectemos y
                  descubramos cómo impulsar tu crecimiento juntos.
                </p>
                <a
                  href="https://api.whatsapp.com/send/?phone=593990000000&text=Hola%20Jos%C3%A9%20Adri%C3%A1n%2C%20quiero%20saber%20m%C3%A1s%20sobre%20tus%20servicios.&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-gold text-brand-dark font-semibold text-sm hover:shadow-lg hover:shadow-brand-gold/25 transition-all duration-300 hover:scale-105"
                >
                  <MessageSquare size={18} />
                  Hablemos ahora
                </a>
              </div>
            </div>
          </RevealSection>
        </section>
      </main>

      {/* ═══════ FOOTER with JIMBRA ═══════ */}
      <footer className="mt-auto border-t border-brand-border">
        <div className="max-w-lg mx-auto px-4 py-6">
          <RevealSection>
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/jos%C3%A9-adri%C3%A1n-coello-moreira-22006817b"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-brand-gold transition-colors duration-300"
                >
                  <Linkedin size={18} />
                </a>
                <a
                  href="https://www.instagram.com/ja.coello"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-foreground hover:text-brand-gold transition-colors duration-300"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.laccg.ec"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="CCG"
                  className="text-muted-foreground hover:text-brand-gold transition-colors duration-300"
                >
                  <Globe size={18} />
                </a>
              </div>
              <div className="shimmer-line" />
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} José Adrián Coello Moreira — Cámara de Comercio de Guayaquil, Ecuador
              </p>
              {/* Jimbra Credit */}
              <div className="pt-2">
                <p className="text-xs text-muted-foreground/60">
                  Hecho por{" "}
                  <a
                    href="https://jimbra.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-jimbra hover:text-brand-jimbra/80 font-semibold transition-colors duration-300 hover:underline underline-offset-2"
                  >
                    Jimbra
                  </a>
                </p>
              </div>
            </div>
          </RevealSection>
        </div>
      </footer>

      {/* ═══════ INSTALL APP BANNER ═══════ */}
      {showInstallBanner && installPrompt && (
        <div className="fixed bottom-20 right-4 left-4 sm:left-auto sm:w-72 z-40 animate-slide-up">
          <div className="glass-card rounded-2xl p-4 border border-brand-gold/20 shadow-2xl shadow-brand-gold/10">
            <button
              onClick={() => setShowInstallBanner(false)}
              className="absolute top-2 right-2 text-muted-foreground/50 hover:text-foreground transition-colors"
              aria-label="Cerrar"
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-gold/15 flex items-center justify-center shrink-0">
                <Smartphone size={20} className="text-brand-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground">Instalar en tu celular</p>
                <p className="text-xs text-muted-foreground">Acceso rápido sin navegador</p>
              </div>
            </div>
            <button
              onClick={handleInstall}
              className="mt-3 w-full py-2.5 rounded-xl bg-gradient-gold text-brand-dark font-semibold text-sm hover:shadow-lg hover:shadow-brand-gold/25 transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Instalar App
            </button>
          </div>
        </div>
      )}

      {/* ═══════ FLOATING WHATSAPP ═══════ */}
      <a
        href="https://api.whatsapp.com/send/?phone=593990000000&text=Hola%20Jos%C3%A9%20Adri%C3%A1n%2C%20vi%20tu%20perfil%20digital.&type=phone_number&app_absent=0"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-brand-whatsapp flex items-center justify-center shadow-lg transition-all duration-500 hover:scale-110 glow-whatsapp ${
          whatsappVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <MessageSquare size={24} className="text-white" />
      </a>

      {/* ═══════ LIGHTBOX ═══════ */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            onClick={() => setLightboxOpen(false)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {lightboxIdx > 0 && (
            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx - 1); }}
            >
              <ChevronDown size={20} className="rotate-90" />
            </button>
          )}
          {lightboxIdx < GALLERY.length - 1 && (
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx(lightboxIdx + 1); }}
            >
              <ChevronDown size={20} className="-rotate-90" />
            </button>
          )}

          <div
            className="relative w-full max-w-2xl aspect-[3/4] sm:aspect-[4/3] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              alt={GALLERY[lightboxIdx].alt}
              src={GALLERY[lightboxIdx].src}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, 672px"
            />
          </div>
          <p className="absolute bottom-6 text-white/60 text-sm text-center">
            {lightboxIdx + 1} / {GALLERY.length} — {GALLERY[lightboxIdx].alt}
          </p>
        </div>
      )}
    </div>
  );
}
