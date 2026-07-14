import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, Menu, X, MapPin, Phone, Clock, Star } from "lucide-react";

const Instagram = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </svg>
);
const Facebook = (p: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const Route = createFileRoute("/")({
  component: Index,
});

/* ---------- helpers ---------- */

function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: React.ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const MotionTag = motion(Tag);
  return (
    <MotionTag
      ref={ref as never}
      initial={reduce ? undefined : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}

function Photo({
  label,
  className = "",
  arch = false,
  ratio = "4/5",
}: {
  label: string;
  className?: string;
  arch?: boolean;
  ratio?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-[color:var(--color-cream-elevated)] ${className}`}
      style={{
        aspectRatio: ratio,
        borderTopLeftRadius: arch ? "9999px" : undefined,
        borderTopRightRadius: arch ? "9999px" : undefined,
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="eyebrow mb-2 opacity-70">Foto pendiente</div>
          <div className="font-[var(--font-display)] text-sm italic text-[color:var(--color-ink)]/60">
            [FOTO: {label}]
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[color:var(--color-ink)]/5" />
    </div>
  );
}

function Cta({
  href,
  variant = "primary",
  children,
}: {
  href: string;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
}) {
  if (variant === "ghost") {
    return (
      <a
        href={href}
        className="link-underline inline-flex items-center gap-2 py-3 text-[15px] font-medium text-[color:var(--color-ink)]"
      >
        {children}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </a>
    );
  }
  return (
    <a
      href={href}
      className="group inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-[color:var(--color-terracotta)] px-6 py-3 text-[15px] font-medium text-[color:var(--color-cream)] transition-all duration-300 hover:bg-[color:var(--color-terracotta-deep)] active:scale-[0.98]"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

/* ---------- header ---------- */

const NAV = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Tratamientos" },
  { href: "#formacion", label: "Formación" },
  { href: "#resenas", label: "Reseñas" },
  { href: "#blog", label: "Blog" },
  { href: "#contacto", label: "Contacto" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[color:var(--color-cream)]/95 backdrop-blur-[2px] border-b border-[color:var(--color-hairline)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1240px] items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <a href="#top" className="group flex flex-col leading-none">
            <span className="font-[var(--font-display)] text-[19px] tracking-tight text-[color:var(--color-ink)]">
              Centro Sara Montes
            </span>
            <span className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink)]/55">
              Logroño · desde 2004
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[13.5px] font-medium text-[color:var(--color-ink)]/80 transition-colors hover:text-[color:var(--color-terracotta)]"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className="hidden min-h-11 items-center rounded-[4px] bg-[color:var(--color-terracotta)] px-5 py-2.5 text-[13.5px] font-medium text-[color:var(--color-cream)] transition-colors hover:bg-[color:var(--color-terracotta-deep)] md:inline-flex"
            >
              Reserva tu cita
            </a>
            <button
              aria-label="Abrir menú"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center text-[color:var(--color-ink)] lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-[color:var(--color-cream)] transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <span className="font-[var(--font-display)] text-[19px]">Centro Sara Montes</span>
          <button
            aria-label="Cerrar menú"
            onClick={() => setOpen(false)}
            className="grid h-11 w-11 place-items-center"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-6 flex flex-col px-5">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-[color:var(--color-hairline)] py-5 font-[var(--font-display)] text-[28px] text-[color:var(--color-ink)]"
              style={{
                transitionDelay: `${i * 30}ms`,
              }}
            >
              {n.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex min-h-11 items-center justify-center rounded-[4px] bg-[color:var(--color-terracotta)] px-6 py-4 text-[15px] font-medium text-[color:var(--color-cream)]"
          >
            Reserva tu cita
          </a>
        </nav>
      </div>
    </>
  );
}

/* ---------- sections ---------- */

function Hero() {
  return (
    <section id="top" className="relative pt-28 md:pt-32">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6 lg:pt-10">
          <Reveal>
            <span className="eyebrow">Logroño · La Rioja</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1
              className="mt-5 text-[color:var(--color-ink)]"
              style={{
                fontSize: "clamp(2.35rem, 5.4vw, 4.4rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.02em",
              }}
            >
              Más de 20 años cuidando tu piel{" "}
              <em className="italic text-[color:var(--color-terracotta)]">y tu bienestar</em>.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[46ch] text-[16.5px] leading-relaxed text-[color:var(--color-ink)]/75">
              Estética avanzada, micropigmentación, terapias manuales y formación profesional.
              Trato cercano, explicaciones honestas antes de cada tratamiento y la maquinaria más
              actual del sector.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Cta href="#contacto">Reserva tu cita</Cta>
              <Cta href="#nosotros" variant="ghost">
                Conoce a Sara
              </Cta>
            </div>
          </Reveal>
          <Reveal delay={0.35}>
            <div className="mt-10 inline-flex items-center gap-3 border-t border-[color:var(--color-hairline)] pt-5">
              <div className="flex items-center gap-1 text-[color:var(--color-terracotta)]">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-[14px] font-semibold text-[color:var(--color-ink)]">4,8</span>
              </div>
              <span className="text-[13px] text-[color:var(--color-ink)]/60">
                +120 opiniones reales en Google
              </span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={0.15}>
            <div className="relative">
              <Photo
                label="Sara Montes en su cabina de tratamiento, luz natural cálida"
                arch
                ratio="4/5"
                className="w-full"
              />
              <div className="absolute -bottom-4 left-4 right-4 flex items-center justify-between border border-[color:var(--color-hairline)] bg-[color:var(--color-cream)] px-5 py-3 md:-bottom-6 md:left-8 md:max-w-[320px]">
                <span className="eyebrow">Consulta previa</span>
                <span className="text-[13px] text-[color:var(--color-ink)]/70">gratuita</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* value strip */}
      <div className="mt-24 border-y border-[color:var(--color-hairline)] bg-[color:var(--color-cream-elevated)]/60">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-3 md:px-10">
          {[
            "Formadora a nivel nacional",
            "Maquinaria de última generación",
            "Consulta y diagnóstico personal",
          ].map((v) => (
            <div key={v} className="flex items-baseline gap-3">
              <span className="font-[var(--font-display)] text-[color:var(--color-terracotta)]">
                ·
              </span>
              <span className="text-[14px] text-[color:var(--color-ink)]/80">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* animated counter */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setV(to);
      return;
    }
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(eased * to * 10) / 10);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);
  const display = Number.isInteger(to) ? Math.round(v) : v.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function About() {
  return (
    <section id="nosotros" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <Photo
              label="Retrato editorial de Sara Montes, mirada directa, fondo neutro"
              ratio="4/5"
            />
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:pt-8">
          <Reveal>
            <span className="eyebrow">Sobre Sara</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-4 text-[color:var(--color-ink)]"
              style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)", lineHeight: 1.1 }}
            >
              Estética profesional con la cercanía de quien te conoce.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-[color:var(--color-ink)]/75">
              <p>
                Sara lleva más de dos décadas dedicada a la estética avanzada y la
                micropigmentación. En paralelo forma a profesionales por toda España y trabaja
                como coach en hipnosis clínica, un enfoque que le permite entender el bienestar
                más allá de la piel.
              </p>
              <p>
                Su forma de trabajar es intencionalmente distinta: antes de cualquier tratamiento
                dedica tiempo a explicarte qué va a hacer, por qué, y qué esperar de forma
                realista. Sin promesas mágicas y sin prisas.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[color:var(--color-hairline)] pt-8">
              {[
                { n: 20, suf: "+", label: "años de experiencia" },
                { n: 4.8, suf: "", label: "valoración en Google" },
                { n: 120, suf: "+", label: "clientas satisfechas" },
              ].map((s) => (
                <div key={s.label}>
                  <div
                    className="font-[var(--font-display)] text-[color:var(--color-terracotta)]"
                    style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)", lineHeight: 1 }}
                  >
                    <Counter to={s.n} suffix={s.suf} />
                  </div>
                  <div className="mt-2 text-[12.5px] uppercase tracking-wider text-[color:var(--color-ink)]/60">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  {
    tag: "01 · Tratamientos",
    title: "Faciales y corporales avanzados",
    body:
      "Limpiezas profundas, protocolos anti-edad, tratamientos para piel sensible, remodelantes, drenaje linfático, radiofrecuencia y cavitación. Trabajamos con maquinaria de última generación que otros centros de la zona todavía no incorporan.",
    photo: "Cabina en uso, aparatología moderna, luz cálida",
  },
  {
    tag: "02 · Micropigmentación",
    title: "Cejas, ojos, labios y correcciones",
    body:
      "Resultados naturales, seguros y adaptados a tu rostro. Sara diseña cada trazo antes de empezar y te explica el proceso, los cuidados y los retoques con total transparencia. También corrección de cicatrices y aureolas.",
    photo: "Detalle de trabajo de micropigmentación de cejas",
  },
  {
    tag: "03 · Terapias y masajes",
    title: "Bienestar físico y emocional",
    body:
      "Masajes relajantes, deportivos y descontracturantes. Sesiones de hipnosis clínica y coaching para abordar bloqueos, hábitos o momentos vitales complicados. Un enfoque poco habitual en un centro estético.",
    photo: "Sala de masaje, textiles naturales, luz baja",
  },
  {
    tag: "04 · Cosmética",
    title: "Selección profesional para casa",
    body:
      "Productos que Sara utiliza en cabina y recomienda personalmente después de cada tratamiento. Nada de venta cruzada agresiva: sólo lo que realmente encaja con tu piel y tu rutina.",
    photo: "Bodegón de producto sobre superficie de arcilla",
  },
  {
    tag: "05 · Formación",
    title: "Cursos con proyección nacional",
    body:
      "Formación en estética avanzada y micropigmentación dirigida a profesionales. Grupos reducidos, mucho trabajo práctico y seguimiento posterior. Reconocida a nivel nacional por sus propias alumnas.",
    photo: "Sara impartiendo una formación, grupo pequeño",
  },
];

function Services() {
  return (
    <section
      id="servicios"
      className="scroll-mt-24 border-t border-[color:var(--color-hairline)] bg-[color:var(--color-cream-elevated)]/50 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="eyebrow">Qué hacemos</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-4 text-[color:var(--color-ink)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05 }}
              >
                Cinco áreas, un mismo criterio:
                <br />
                <em className="italic text-[color:var(--color-sage)]">
                  hacerlo bien y explicártelo.
                </em>
              </h2>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          {SERVICES.map((s, i) => {
            const flip = i % 2 === 1;
            return (
              <Reveal key={s.title}>
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                  <div
                    className={`lg:col-span-5 ${flip ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <Photo label={s.photo} ratio="5/4" />
                  </div>
                  <div
                    className={`lg:col-span-7 ${flip ? "lg:order-1" : "lg:order-2"}`}
                  >
                    <span className="eyebrow text-[color:var(--color-ink)]/50">{s.tag}</span>
                    <h3
                      className="mt-3 text-[color:var(--color-ink)]"
                      style={{
                        fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)",
                        lineHeight: 1.15,
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className="mt-5 max-w-[54ch] text-[16px] leading-relaxed text-[color:var(--color-ink)]/75">
                      {s.body}
                    </p>
                    <a
                      href="#contacto"
                      className="link-underline mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-[color:var(--color-terracotta)]"
                    >
                      Consultar disponibilidad <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Me explicó todo con una calma que no había encontrado en otro sitio. Salí sabiendo exactamente qué me había hecho y por qué. Volveré, sin duda.",
    who: "Marta L.",
    service: "Tratamiento facial anti-edad",
  },
  {
    quote:
      "Llevaba años queriendo hacerme las cejas y me daba respeto. Sara me enseñó el diseño antes de tocar nada. El resultado es tan natural que amigas ni se han dado cuenta.",
    who: "Cristina R.",
    service: "Micropigmentación de cejas",
  },
  {
    quote:
      "Hice su formación de micropigmentación después de probar otras y no hay color. Se nota que enseña desde la experiencia real de cabina, no desde un manual.",
    who: "Alumna, promoción 2023",
    service: "Formación profesional",
  },
  {
    quote:
      "El centro tiene aparatología que en Logroño no había visto en otros sitios, pero lo que marca la diferencia es cómo te trata. Te vas cuidada de verdad.",
    who: "Ana S.",
    service: "Radiofrecuencia corporal",
  },
];

function Testimonials() {
  return (
    <section id="resenas" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <span className="eyebrow">Reseñas</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-4 text-[color:var(--color-ink)]"
                style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)", lineHeight: 1.1 }}
              >
                Lo que dicen quienes ya pasaron por aquí.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex items-center gap-3">
                <div className="flex items-center gap-1 text-[color:var(--color-terracotta)]">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-[14px] text-[color:var(--color-ink)]/70">
                  <strong className="text-[color:var(--color-ink)]">4,8/5</strong> · +120
                  opiniones reales en Google
                </span>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:col-span-8 lg:gap-x-12 lg:gap-y-14">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.who} delay={i * 0.05}>
                <figure>
                  <span
                    aria-hidden
                    className="block font-[var(--font-display)] text-[64px] leading-none text-[color:var(--color-terracotta)]/40"
                  >
                    “
                  </span>
                  <blockquote className="-mt-4 font-[var(--font-display)] text-[19px] leading-[1.45] text-[color:var(--color-ink)] md:text-[21px]">
                    {t.quote}
                  </blockquote>
                  <figcaption className="mt-5 flex items-baseline gap-3 text-[13px]">
                    <span className="font-semibold text-[color:var(--color-ink)]">{t.who}</span>
                    <span className="text-[color:var(--color-ink)]/55">· {t.service}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Formacion() {
  return (
    <section
      id="formacion"
      className="scroll-mt-24 border-y border-[color:var(--color-hairline)] bg-[color:var(--color-ink)] py-24 text-[color:var(--color-cream)] md:py-32"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-12 px-5 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <span
              className="eyebrow"
              style={{ color: "rgb(220, 190, 160)" }}
            >
              Formación profesional
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              className="mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", lineHeight: 1.05 }}
            >
              Aprende de quien lleva{" "}
              <em className="italic" style={{ color: "rgb(224, 168, 130)" }}>
                dos décadas
              </em>{" "}
              en cabina.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-[color:var(--color-cream)]/75">
              Cursos de estética avanzada y micropigmentación con reconocimiento a nivel nacional.
              Grupos reducidos, práctica real desde el primer día y seguimiento después del curso
              para resolver dudas cuando ya estás trabajando.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-9">
              <a
                href="#contacto"
                className="group inline-flex min-h-11 items-center gap-2 rounded-[4px] bg-[color:var(--color-cream)] px-6 py-3 text-[15px] font-medium text-[color:var(--color-ink)] transition-transform hover:-translate-y-0.5"
              >
                Solicita información
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-6">
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "Micropigmentación", v: "Cejas · ojos · labios" },
                { k: "Estética avanzada", v: "Facial y corporal" },
                { k: "Grupos", v: "Máx. 6 alumnas" },
                { k: "Nivel", v: "Iniciación y avanzado" },
              ].map((b) => (
                <div
                  key={b.k}
                  className="border border-[color:var(--color-cream)]/15 p-6"
                >
                  <div className="eyebrow" style={{ color: "rgb(220, 190, 160)" }}>
                    {b.k}
                  </div>
                  <div className="mt-3 font-[var(--font-display)] text-[18px]">{b.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const POSTS = [
  {
    cat: "Diagnóstico",
    title: "Cómo elegir el tratamiento adecuado para tu tipo de piel",
    date: "Marzo 2025",
    photo: "Detalle de piel, luz suave, macro",
  },
  {
    cat: "Micropigmentación",
    title: "Qué tener en cuenta antes de una micropigmentación de cejas",
    date: "Febrero 2025",
    photo: "Pincel de diseño sobre plantilla de cejas",
  },
  {
    cat: "Tecnología",
    title: "Aparatología avanzada en estética: qué ventajas ofrece realmente",
    date: "Enero 2025",
    photo: "Cabezal de radiofrecuencia, plano cerrado",
  },
];

function Blog() {
  return (
    <section id="blog" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <span className="eyebrow">Diario del centro</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-4 text-[color:var(--color-ink)]"
                style={{ fontSize: "clamp(1.9rem, 3.4vw, 2.8rem)", lineHeight: 1.1 }}
              >
                Lecturas sin humo, escritas desde cabina.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <a
              href="#blog"
              className="link-underline text-[14px] font-medium text-[color:var(--color-ink)]"
            >
              Ver todos los artículos <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {POSTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <article className="group">
                <Photo label={p.photo} ratio="4/3" />
                <div className="mt-5 flex items-center gap-3 text-[12px] uppercase tracking-wider text-[color:var(--color-ink)]/55">
                  <span className="text-[color:var(--color-terracotta)]">{p.cat}</span>
                  <span>·</span>
                  <span>{p.date}</span>
                </div>
                <h3
                  className="mt-3 font-[var(--font-display)] text-[color:var(--color-ink)]"
                  style={{ fontSize: "1.35rem", lineHeight: 1.2 }}
                >
                  {p.title}
                </h3>
                <a
                  href="#blog"
                  className="link-underline mt-4 inline-flex items-center gap-2 text-[13.5px] font-medium text-[color:var(--color-ink)]"
                >
                  Leer artículo <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contacto"
      className="scroll-mt-24 border-t border-[color:var(--color-hairline)] bg-[color:var(--color-cream-elevated)]/60 py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1240px] px-5 md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="eyebrow">Contacto</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                className="mt-4 text-[color:var(--color-ink)]"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", lineHeight: 1.05 }}
              >
                Ven a conocernos.
                <br />
                <em className="italic text-[color:var(--color-terracotta)]">
                  Estamos en Logroño.
                </em>
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <dl className="mt-10 space-y-6 text-[15px]">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-terracotta)]" />
                  <div>
                    <dt className="text-[12px] uppercase tracking-wider text-[color:var(--color-ink)]/55">
                      Dirección
                    </dt>
                    <dd className="mt-1 text-[color:var(--color-ink)]">
                      Avda. Club Deportivo 42, oficina 3
                      <br />
                      26007 Logroño, La Rioja
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-terracotta)]" />
                  <div>
                    <dt className="text-[12px] uppercase tracking-wider text-[color:var(--color-ink)]/55">
                      Teléfono
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="tel:+34682932305"
                        className="link-underline text-[color:var(--color-ink)]"
                      >
                        +34 682 93 23 05
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-[color:var(--color-terracotta)]" />
                  <div>
                    <dt className="text-[12px] uppercase tracking-wider text-[color:var(--color-ink)]/55">
                      Horarios
                    </dt>
                    <dd className="mt-1 text-[color:var(--color-ink)]">
                      Lunes a Sábado · 09:00 – 20:00
                      <br />
                      Domingo cerrado
                    </dd>
                  </div>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Cta href="#contacto">Reserva online</Cta>
                <div className="flex items-center gap-2">
                  <a
                    aria-label="Instagram"
                    href="https://instagram.com/centrosaramontes"
                    target="_blank"
                    rel="noopener"
                    className="grid h-11 w-11 place-items-center border border-[color:var(--color-hairline)] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-cream)]"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    aria-label="Facebook"
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener"
                    className="grid h-11 w-11 place-items-center border border-[color:var(--color-hairline)] text-[color:var(--color-ink)] transition-colors hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-cream)]"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-[color:var(--color-hairline)] bg-[color:var(--color-cream)] md:aspect-[5/4]">
                <iframe
                  title="Ubicación Centro Sara Montes"
                  src="https://www.google.com/maps?q=Avenida+Club+Deportivo+42,+26007+Logro%C3%B1o&output=embed"
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-hairline)] bg-[color:var(--color-cream)] py-12">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-8 px-5 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <div className="font-[var(--font-display)] text-[20px] text-[color:var(--color-ink)]">
            Centro Sara Montes
          </div>
          <div className="mt-2 text-[13px] text-[color:var(--color-ink)]/60">
            Avda. Club Deportivo 42 · 26007 Logroño · La Rioja
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[color:var(--color-ink)]/65">
          <a href="#" className="hover:text-[color:var(--color-terracotta)]">
            Aviso legal
          </a>
          <a href="#" className="hover:text-[color:var(--color-terracotta)]">
            Privacidad
          </a>
          <a href="#" className="hover:text-[color:var(--color-terracotta)]">
            Cookies
          </a>
        </div>
        <div className="text-[12px] text-[color:var(--color-ink)]/50">
          © {new Date().getFullYear()} Centro Sara Montes
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-[color:var(--color-cream)] text-[color:var(--color-ink)]">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Formacion />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
