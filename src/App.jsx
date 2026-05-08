import { useEffect, useState } from "react";

const SPEC_DATA = {
  training: {
    kicker: "AI TRAINING",
    title: "Training Systems",
    description:
      "High-performance infrastructure for model training, fine-tuning, and large-scale AI workloads.",
    image: "/upload/gpu-l40s.png",
    imageAlt: "AI training infrastructure render",
    compute: "Blackwell Workstation",
    memory: "256GB",
    deployment: "On-prem",
    price: "$14.328"
  },

  visual: {
    kicker: "VISUAL AI",
    title: "Visual AI Pipelines",
    description:
      "Optimized systems for image, video and creative AI production workflows.",
    image: "/upload/comf-ui.png",
    imageAlt: "Visual AI pipeline infrastructure render",
    compute: "H200 141GB",
    memory: "276GB",
    deployment: "Cloud-ready",
    price: "On-Demand $4.99/hr"
  }
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const [activeSpec, setActiveSpec] = useState(null);
  const [githubStars, setGithubStars] = useState(22);
  const [githubAvatars, setGithubAvatars] = useState([]);

  function openMenu() {
    if (activeView !== "home") {
      showView("home");
      return;
    }

    setMenuOpen(true);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  function showView(viewName) {
    setActiveView(viewName);
    setMenuOpen(false);
    window.history.replaceState(null, "", `#${viewName}`);
  }

  function openSpecModal(type) {
    setActiveSpec(type);
  }

  function closeSpecModal() {
    setActiveSpec(null);
  }

  function goToContactView() {
    setActiveSpec(null);
    showView("contact");
  }
  
  useEffect(() => {
  async function loadGitHubSocialProof() {
    try {
      const repoResponse = await fetch(
        "https://api.github.com/repos/SOLRICKS/comfyui-solricks",
        {
          headers: {
            Accept: "application/vnd.github+json"
          }
        }
      );

      if (repoResponse.ok) {
        const repo = await repoResponse.json();
        setGithubStars(Number(repo.stargazers_count || 22));
      }
    } catch (error) {
      console.warn("Could not load GitHub stars:", error);
      setGithubStars(22);
    }

    try {
      const stargazersResponse = await fetch(
        "https://api.github.com/repos/SOLRICKS/comfyui-solricks/stargazers?per_page=3",
        {
          headers: {
            Accept: "application/vnd.github+json"
          }
        }
      );

      if (!stargazersResponse.ok) {
        console.warn("GitHub avatars request failed:", stargazersResponse.status);
        return;
      }

      const stargazers = await stargazersResponse.json();
      setGithubAvatars(stargazers.slice(0, 3));
    } catch (error) {
      console.warn("Could not load GitHub avatars:", error);
    }
  }

	  loadGitHubSocialProof();
	}, []);

  useEffect(() => {
    if (window.location.hash === "#store") {
      setActiveView("store");
    } else if (window.location.hash === "#about") {
      setActiveView("about");
    } else if (window.location.hash === "#contact") {
      setActiveView("contact");
    } else {
      setActiveView("home");
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setActiveSpec(null);
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const isHome = activeView === "home";

  return (
    <div className="page">
      <div className="shell">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className={`menu-toggle ${!isHome ? "is-close-mode" : ""}`}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="menuDrawer"
              aria-label={isHome ? "Open menu" : "Close current page"}
              onClick={openMenu}
            >
              <span className="menu-mark" aria-hidden="true">
                {isHome ? (
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.8L14.4 9.6L21.2 12L14.4 14.4L12 21.2L9.6 14.4L2.8 12L9.6 9.6L12 2.8Z"></path>
                    <path d="M5.2 3.6L6.2 6.2L8.8 7.2L6.2 8.2L5.2 10.8L4.2 8.2L1.6 7.2L4.2 6.2L5.2 3.6Z"></path>
                    <path d="M18.8 3.6L19.6 5.8L21.8 6.6L19.6 7.4L18.8 9.6L18 7.4L15.8 6.6L18 5.8L18.8 3.6Z"></path>
                  </svg>
                ) : (
                  "×"
                )}
              </span>

              <span>{isHome ? "MENU" : "CLOSE"}</span>
            </button>
          </div>

          <a className="brand" href="/" title="Solricks" aria-label="Solricks home">
            <img src="/upload/solricks-logo.png" alt="Solricks logo" />
          </a>

          <div className="topbar-right">
            <a
              className="call-button"
              href="https://cal.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span className="call-avatar-wrap">
                <img className="call-avatar" src="/upload/portfolio.jpeg" alt="Portfolio" />
              </span>
              <span className="call-text">Start a Project</span>
              <span className="call-mobile-icon" aria-hidden="true">
                <i className="fa-solid fa-envelope"></i>
              </span>
            </a>

            <button className="arrow-button share-button" type="button" aria-label="Share Solricks">
              ↗
            </button>
          </div>
        </header>

        <main>
          <HeroView
			  activeView={activeView}
			  githubStars={githubStars}
			  githubAvatars={githubAvatars}
			/>

          <StoreView
            activeView={activeView}
            onOpenSpec={openSpecModal}
          />

          <ContactView activeView={activeView} />
        </main>

        <MenuDrawer
          menuOpen={menuOpen}
          closeMenu={closeMenu}
          showView={showView}
        />

        <SpecModal
          spec={activeSpec ? SPEC_DATA[activeSpec] : null}
          onClose={closeSpecModal}
          onContact={goToContactView}
        />
		
		<SocialDock />
		
		<div className="site-copyright">
		  © 2026 Solricks.
		</div>
      </div>
    </div>
  );
}

function HeroView({ activeView, githubStars, githubAvatars }) {
  return (
    <section
      className={`hero-frame site-view ${activeView === "home" ? "is-active" : ""}`}
      id="home"
      data-page="home"
    >
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/upload/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="hero-overlay" aria-hidden="true"></div>

      <div className="hero-robot" aria-hidden="true">
        <img className="robot-img" src="/upload/rob.webp" alt="" />
      </div>

      <div className="hero-main">
        <div className="headline" aria-label="Build With AI">
          <div className="brand-story">
            <span className="brand-story-line">
              SOLUTION BRICKS FOR AI-POWERED SYSTEMS.
            </span>
          </div>

          <div className="headline-line">BUILD</div>
          <div className="headline-line offset">WITH</div>
        </div>

        <aside className="ai-side">
          <div className="ai-label">AI</div>
        </aside>
      </div>

      <div className="hero-copy">
        <div className="client-row">
		<div className="avatars" aria-hidden="true">
		  {[0, 1, 2].map((index) => (
			<span className="avatar" key={index}>
			  {githubAvatars[index]?.avatar_url ? (
				<img src={githubAvatars[index].avatar_url} alt="" />
			  ) : null}
			</span>
		  ))}

		  <span className="avatar-more">+{githubStars}</span>
		</div>

          <div>
            <div className="stars">★★★★★</div>
            <div className="happy">Ready-to-Deploy</div>
          </div>
        </div>

        <h2>
		  We help businesses adopt AI, automate operations, and{" "}
		  <span>build high-quality AI systems, models, and workflows.</span>
		</h2>

        <a className="journey-button" href="#" aria-label="Start your AI journey">
          <span className="journey-text-wrap">
            <span className="roll-line roll-line-top">Build With Solricks</span>
            <span className="roll-line roll-line-bottom" aria-hidden="true">
              Launching Soon
            </span>
          </span>
          <i>↗</i>
        </a>
      </div>
    </section>
  );
}

function StoreView({ activeView, onOpenSpec }) {
  return (
    <section
      className={`store-page site-view ${activeView === "store" ? "is-active" : ""}`}
      id="store"
      data-page="store"
    >
      <div className="store-bg-glow" aria-hidden="true"></div>

      <div className="store-page-shell">
        <div className="store-hero">
          <div className="store-intro">
            <div className="store-kicker">
              <span className="store-dot"></span>
              <span>ENTERPRISE AI INFRASTRUCTURE</span>
            </div>

            <h1>AI COMPUTE</h1>

            <p>
              Technical compute infrastructure for AI training, inference,
              visual pipelines, and scalable enterprise workloads.
            </p>
          </div>

          <div className="store-feature-row" aria-label="Store features">
            <div className="store-feature">
              <i className="fa-solid fa-shield-halved"></i>
              <strong>Enterprise Grade</strong>
              <span>Built for 24/7 workloads</span>
            </div>

            <div className="store-feature">
              <i className="fa-solid fa-microchip"></i>
              <strong>In Stock & Ready</strong>
              <span>Fast global delivery</span>
            </div>

            <div className="store-feature">
              <i className="fa-solid fa-headset"></i>
              <strong>Expert Support</strong>
              <span>From deployment to scale</span>
            </div>

            <div className="store-feature">
              <i className="fa-solid fa-lock"></i>
              <strong>Secure & Trusted</strong>
              <span>Enterprise-grade security</span>
            </div>
          </div>
        </div>

        <div className="store-grid store-grid-large">
          <article className="store-card store-solution-card training-card">
            <div className="store-card-visual" aria-hidden="true">
              <i className="fa-solid fa-server"></i>
            </div>

            <div className="store-card-content">
              <span className="store-badge">AI TRAINING</span>

              <h2>Training Systems</h2>

              <p>
                High-performance infrastructure for model training, fine-tuning,
                and large-scale AI workloads.
              </p>

              <div className="store-meta">
                <span><i className="fa-solid fa-microchip"></i> Multi-GPU systems</span>
                <span><i className="fa-solid fa-database"></i> High-memory compute</span>
                <span><i className="fa-solid fa-network-wired"></i> Scalable clusters</span>
              </div>

              <button
                className="store-spec-button"
                type="button"
                onClick={() => onOpenSpec("training")}
              >
                <span>Request specs</span>
                <i>↗</i>
              </button>
            </div>
          </article>

          <article className="store-card store-solution-card visual-card">
            <div className="store-card-visual" aria-hidden="true">
              <i className="fa-solid fa-diagram-project"></i>
            </div>

            <div className="store-card-content">
              <span className="store-badge">VISUAL AI</span>

              <h2>Visual AI Pipelines</h2>

              <p>
                Optimized systems for image, video, 3D, and creative AI
                production workflows.
              </p>

              <div className="store-meta">
                <span><i className="fa-solid fa-film"></i> Video generation</span>
                <span><i className="fa-solid fa-wand-magic-sparkles"></i> Creative automation</span>
                <span><i className="fa-solid fa-code-branch"></i> Workflow design</span>
              </div>

              <button
                className="store-spec-button"
                type="button"
                onClick={() => onOpenSpec("visual")}
              >
                <span>Request specs</span>
                <i>↗</i>
              </button>
            </div>
          </article>
        </div>

        <div className="store-bottom">
          <div>
            <i className="fa-solid fa-box-open"></i>
            <strong>Global Inventory</strong>
            <span>Ships from regional hubs</span>
          </div>

          <div>
            <i className="fa-solid fa-shield-halved"></i>
            <strong>Trusted by Enterprises</strong>
            <span>Secure procurement & compliance</span>
          </div>

          <div>
            <i className="fa-solid fa-clock"></i>
            <strong>Rapid Deployment</strong>
            <span>Get hardware online faster</span>
          </div>

          <div>
            <i className="fa-solid fa-users-gear"></i>
            <strong>Scalable Solutions</strong>
            <span>From single GPU to full clusters</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactView({ activeView }) {
  return (
    <section
      className={`contact-section site-view ${activeView === "contact" ? "is-active" : ""}`}
      id="contact"
      data-page="contact"
    >
      <div className="contact-bg" aria-hidden="true"></div>

      <div className="contact-shell">
        <div className="contact-copy">
          <span className="contact-kicker">WE’RE HERE TO HELP</span>

          <h1>
            LET’S BUILD<br />
            WITH AI
          </h1>

          <div className="contact-connect">
            <span>WE CAN HELP WITH</span>

            <ul>
              <li>AI automation</li>
              <li>Custom models & nodes</li>
              <li>Visual AI workflows</li>
              <li>Direct team contact</li>
            </ul>
          </div>
        </div>

        <form
          className="contact-form"
          action="mailto:hello@solricks.com"
          method="post"
          encType="text/plain"
        >
          <h2>START A PROJECT</h2>

          <label>
            <span>Name*</span>
            <input type="text" name="name" placeholder="Enter your name" required />
          </label>

          <label>
            <span>Email*</span>
            <input type="email" name="email" placeholder="Enter your email" required />
          </label>

          <label>
            <span>Message</span>
            <textarea name="message" placeholder="Tell us about your project"></textarea>
          </label>

          <button type="submit" className="contact-submit">
            <span>Send message</span>
            <i>↗</i>
          </button>
        </form>
      </div>
    </section>
  );
}

function MenuDrawer({ menuOpen, closeMenu, showView }) {
  return (
    <div
      className={`menu-drawer ${menuOpen ? "is-open" : ""}`}
      id="menuDrawer"
      aria-hidden={!menuOpen}
    >
      <div className="menu-backdrop" onClick={closeMenu}></div>

      <div className="menu-panel">
        <div className="menu-shell">
          <div className="menu-left-col">
            <div className="menu-toolbar">
              <button className="menu-close" type="button" onClick={closeMenu}>
                <span>×</span>
                <span>CLOSE</span>
              </button>
            </div>

            <nav className="menu-nav" aria-label="Main menu">
              <a href="#home" onClick={(event) => {
                event.preventDefault();
                showView("home");
              }}>
                HOME
              </a>

              <a href="#about" onClick={(event) => {
                event.preventDefault();
                showView("about");
              }}>
                ABOUT US
              </a>

              <a href="#" onClick={(event) => event.preventDefault()}>
                CASE STUDIES
              </a>

              <a href="#store" onClick={(event) => {
                event.preventDefault();
                showView("store");
              }}>
                AI COMPUTE
              </a>

              <a href="#contact" onClick={(event) => {
                event.preventDefault();
                showView("contact");
              }}>
                CONTACT
              </a>
            </nav>
          </div>

          <div className="menu-right-col">
            <div className="menu-copy">
              <div className="menu-mini-meta">
                <i className="fa-solid fa-sparkles"></i>
                <span>AI systems / workflows / models</span>
              </div>

              <h3>DISCOVER THE VISION AND SYSTEMS DRIVING YOU FORWARD</h3>

              <p>
                We build AI-powered systems that help modern businesses automate
                operations, create smarter workflows, and move forward with clarity.
              </p>
            </div>

            <div className="menu-footer">
              <div className="menu-info-block">
                <span className="menu-info-label">Location</span>
                <span className="menu-info-text">Istanbul, TR</span>
                <span className="menu-info-sub">
                  AI-powered systems for modern businesses.
                </span>
              </div>

              <div className="menu-info-block">
                <span className="menu-info-label">Contact</span>
                <a className="menu-info-link" href="mailto:hello@solricks.com">
                  hello@solricks.com
                </a>
                <span className="menu-info-sub">
                  Let’s build your next AI system.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecModal({ spec, onClose, onContact }) {
  if (!spec) return null;

  return (
    <div className="spec-modal is-open" id="specModal" aria-hidden="false">
      <div className="spec-modal-backdrop" onClick={onClose}></div>

      <div
        className="spec-modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="specModalTitle"
      >
        <button
          className="spec-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close specs"
        >
          ×
        </button>

        <div className="spec-modal-image">
          <img src={spec.image} alt={spec.imageAlt} />
        </div>

        <div className="spec-modal-content">
          <span className="spec-modal-kicker">{spec.kicker}</span>

          <h2 id="specModalTitle">{spec.title}</h2>

          <p>{spec.description}</p>

          <div className="spec-modal-grid">
            <div>
              <span>Compute</span>
              <strong>{spec.compute}</strong>
            </div>

            <div>
              <span>Memory</span>
              <strong>{spec.memory}</strong>
            </div>

            <div>
              <span>Deployment</span>
              <strong>{spec.deployment}</strong>
            </div>

            <div>
              <span>Starting price</span>
              <strong>{spec.price}</strong>
            </div>
          </div>

          <div className="spec-modal-actions">
            <button
              className="spec-modal-contact-button"
              type="button"
              onClick={onContact}
            >
              Contact Solricks
              <i>↗</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialDock() {
  return (
    <div className="social-dock" aria-label="Social links">
      <a
        className="social-link"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/SOLRICKS"
        aria-label="Github"
        title="Solricks Github"
      >
        <i className="fa-brands fa-github"></i>
      </a>

      <a
        className="social-link"
        target="_blank"
        rel="noreferrer"
        href="https://www.patreon.com/c/Solricks"
        aria-label="Patreon"
        title="Solricks Patreon"
      >
        <i className="fa-brands fa-patreon"></i>
      </a>

      <a
        className="social-link"
        target="_blank"
        rel="noreferrer"
        href="https://civitai.com/user/Solricks"
        aria-label="Civitai"
        title="Solricks Civitai"
      >
        <i className="fa-solid fa-robot"></i>
      </a>
    </div>
  );
}

export default App;