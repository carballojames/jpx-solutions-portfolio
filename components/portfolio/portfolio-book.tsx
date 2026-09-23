'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AlertCircle, ArrowUpRight, CheckCircle2, Link2, Loader2, Mail, MapPin, Menu, X } from 'lucide-react'
import { portfolioData } from '@/src/data/portfolio'

const nav = ['about', 'projects', 'services', 'contact'] as const

export default function PortfolioBook() {
  const [active, setActive] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.2, 0.5] }
    )

    nav.forEach((id) => {
      const node = document.getElementById(id)
      if (node) observer.observe(node)
    })

    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const handleContactSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('submitting')
    setFormMessage('')

    const form = event.currentTarget
    const formData = new FormData(form)
    formData.append(
      'access_key',
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '606a1594-e516-4ece-86a6-b4e01c38eb54'
    )
    formData.append('subject', 'New Project Inquiry from JPX Solutions Portfolio')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus('success')
        setFormMessage('Thank you! Your message has been sent successfully.')
        form.reset()
      } else {
        setFormStatus('error')
        setFormMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setFormStatus('error')
      setFormMessage('Unable to send message right now. Please email directly.')
    }
  }

  return (
    <main className="portfolio-shell">
      <div className="paper-noise" aria-hidden="true" />

      <header className="site-header">
        <a className="wordmark" href="#about">
          JPX Solutions.
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((id, i) => (
            <button
              key={id}
              className={active === id ? 'active' : ''}
              onClick={() => go(id)}
            >
              <span>0{i + 1}</span>
              {id}
            </button>
          ))}
        </nav>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav">
          {nav.map((id, i) => (
            <button key={id} onClick={() => go(id)}>
              <span>0{i + 1}</span>
              {id}
            </button>
          ))}
        </nav>
      )}

      <div className="book-progress">
        <span
          style={{
            height: `${(nav.indexOf(active as (typeof nav)[number]) + 1) * 25}%`,
          }}
        />
      </div>

      <div className="book-content">
        <section id="about" className="book-page">
          <div className="page-inner">
            <p className="eyebrow">Curriculum Vitae / Portfolio</p>

            <div className="resume-top">
              <h1>
                {portfolioData.profile.firstName} {portfolioData.profile.lastName}
                <br />
                {portfolioData.profile.surname}
              </h1>
              <span>Davao / PH</span>
            </div>

            <div className="about-grid">
              <div>
                <div className="page-number">
                  <span>01</span>
                  <i />
                  About me
                </div>
                <h2 className="hero-title">
                  Building digital tools that make work feel <em>simpler.</em>
                </h2>
                <p className="hero-copy">{portfolioData.profile.bio}</p>
                <div className="hero-actions">
                  <a className="dark-button" href="#projects">
                    View selected work <ArrowUpRight size={14} />
                  </a>
                  <span className="availability">
                    <b />
                    {portfolioData.profile.availability}
                  </span>
                </div>
              </div>

              <aside className="about-aside">
                <div className="photo-card">
                  <div className="photo-card-image">
                    <Image
                      src="/images/profile-picture-me.jpg"
                      alt="Portrait of James Paul U. Carballo"
                      fill
                      priority
                      sizes="(max-width: 800px) 100vw, 360px"
                    />
                  </div>
                  <div className="photo-card-caption">
                    <strong>James Paul U. Carballo</strong>
                    <span>Full-stack developer</span>
                    <small>Davao City, Philippines</small>
                  </div>
                </div>
                <p>
                  An engineer with a designer&apos;s eye for clear systems, considered
                  interfaces, and useful details.
                </p>
                <div className="aside-meta">
                  Based in Davao City
                  <br />
                  Working worldwide / remotely
                </div>
              </aside>
            </div>

            <div className="profile-grid">
              <div>
                <p className="section-kicker">01 / Profile</p>
                <p className="muted-copy">
                  I care about the space between a great idea and a dependable
                  product: the architecture, interface, and small decisions that
                  help people do their best work.
                </p>
                <p className="meta-line">
                  <MapPin size={13} />
                  {portfolioData.profile.location}
                </p>
              </div>

              <div className="skills-grid">
                {Object.entries(portfolioData.skills).map(([key, items]) => (
                  <div key={key}>
                    <h3>{key}</h3>
                    <p>{items.join(' / ')}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="book-page">
          <div className="page-inner">
            <div className="section-header">
              <div className="page-number">
                <span>02</span>
                <i />
                Selected work
              </div>
              <div className="header-row">
                <h2>Projects with a purpose.</h2>
                <p>
                  A selection of systems, tools, and digital products built to
                  solve real problems.
                </p>
              </div>
            </div>

            {portfolioData.projects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-row">
                  <span className="project-number">PROJECT {project.number}</span>
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.category}</p>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <ArrowUpRight className="project-arrow" size={20} />
                </div>
                <div className="project-tags">
                  <span>{project.year}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="book-page">
          <div className="page-inner">
            <div className="section-header">
              <div className="page-number">
                <span>03</span>
                <i />
                Services
              </div>
              <div className="header-row">
                <h2>Built around your needs.</h2>
                <p>
                  Development services for individuals, businesses, and growing
                  teams.
                </p>
              </div>
            </div>

            {portfolioData.services.map((service, i) => (
              <article className="service-row" key={service.id}>
                <span className="service-number">0{i + 1}</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-details">
                  <div>
                    <p className="section-kicker">Engagement</p>
                    <strong>Tailored scope</strong>
                    <span>{service.timeline}</span>
                  </div>
                  <ul>
                    {service.features.slice(0, 6).map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="book-page">
          <div className="page-inner">
            <div className="section-header">
              <div className="page-number">
                <span>04</span>
                <i />
                Get in touch
              </div>
              <div className="header-row">
                <h2>Let&apos;s build something.</h2>
                <p>{portfolioData.contact.message}</p>
              </div>
            </div>

            <div className="contact-grid">
              <div>
                <p className="contact-lead">
                  Good work starts with a clear conversation.
                </p>
                <div className="contact-links">
                  <a href={`mailto:${portfolioData.contact.email}`}>
                    <Mail size={17} />
                    {portfolioData.contact.email}
                  </a>
                  <a href={portfolioData.contact.github}>
                    <Link2 size={17} />
                    GitHub
                  </a>
                  <a href={portfolioData.contact.linkedin}>
                    <Link2 size={17} />
                    LinkedIn
                  </a>
                </div>
              </div>

              <form onSubmit={handleContactSubmit}>
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />
                <input
                  type="hidden"
                  name="from_name"
                  value="JPX Solutions Portfolio"
                />

                <div className="form-two">
                  <label>
                    <span className="flex flex-row items-center gap-1">
                      <span>Name</span>
                      <span className="text-red-500">*</span>
                    </span>
                    <input name="name" required />
                  </label>
                  <label>
                    <span className="flex flex-row items-center gap-1">
                      <span>Email</span>
                      <span className="text-red-500">*</span>
                    </span>
                    <input name="email" required type="email" />
                  </label>
                </div>
                <label>
                  Project type
                  <select name="service" defaultValue="">
                    <option value="" disabled>
                      Select a service
                    </option>
                    {portfolioData.services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Message
                  <textarea name="message" required rows={4} />
                </label>
                <div className="flex flex-col gap-3 items-start">
                  <button
                    className="accent-button"
                    type="submit"
                    disabled={formStatus === 'submitting'}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        Sending... <Loader2 size={14} className="animate-spin" />
                      </>
                    ) : (
                      <>
                        Start a project <ArrowUpRight size={14} />
                      </>
                    )}
                  </button>

                  {formStatus === 'success' && (
                    <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 py-2.5 px-3 rounded-sm">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>{formMessage}</span>
                    </div>
                  )}

                  {formStatus === 'error' && (
                    <div className="flex items-center gap-2 text-xs text-red-800 bg-red-50 border border-red-200 py-2.5 px-3 rounded-sm">
                      <AlertCircle size={15} className="text-red-600 shrink-0" />
                      <span>{formMessage}</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <span>© 2026 JPX Solutions</span>
        <span className="footer-center">
          Portfolio / Selected work &amp; services
        </span>
        <button onClick={() => go('about')}>Back to top</button>
      </footer>
    </main>
  )
}
