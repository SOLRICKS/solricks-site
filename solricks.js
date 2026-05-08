const SITE_SHARE_DATA = {
  title: "Solricks",
  text: "SOLRICKS: SOLUTION BRICKS FOR AI-POWERED SYSTEMS.",
  url: "https://solricks.com"
};

const GITHUB_REPO_URL = "https://api.github.com/repos/SOLRICKS/comfyui-solricks";
const GITHUB_STARGAZERS_URL =
  "https://api.github.com/repos/SOLRICKS/comfyui-solricks/stargazers?per_page=3";

function initMenu() {
  const body = document.body;
  const menuOpen = document.getElementById("menuOpen");
  const menuClose = document.getElementById("menuClose");
  const menuDrawer = document.getElementById("menuDrawer");
  const menuBackdrop = document.getElementById("menuBackdrop");
  const closeMenuLinks = document.querySelectorAll("[data-close-menu]");

  if (!menuOpen || !menuDrawer) return;

  function openMenu() {
    body.classList.add("menu-open");
    menuDrawer.setAttribute("aria-hidden", "false");
    menuOpen.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    body.classList.remove("menu-open");
    menuDrawer.setAttribute("aria-hidden", "true");
    menuOpen.setAttribute("aria-expanded", "false");
  }

	menuOpen.addEventListener("click", () => {
	  if (document.body.dataset.view !== "home" && window.showSolricksView) {
		closeMenu();
		window.showSolricksView("home");
		history.replaceState(null, "", "#home");
		return;
	  }

	  openMenu();
	});

  if (menuClose) {
    menuClose.addEventListener("click", closeMenu);
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener("click", closeMenu);
  }

  closeMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function initDisabledLinks() {
  document.querySelectorAll(".menu-link-disabled").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
    });
  });
}

function initPageViews() {
  const viewLinks = document.querySelectorAll("[data-view]");
  const views = document.querySelectorAll(".site-view");

	function showView(viewName) {
	  views.forEach((view) => {
		view.classList.toggle("is-active", view.dataset.page === viewName);
	  });

	  document.body.dataset.view = viewName;

	  updateViewButton(viewName);
	}
	
	function updateViewButton(viewName) {
	  const menuButton = document.getElementById("menuOpen");
	  if (!menuButton) return;

	  const label = menuButton.querySelector("span:last-child");
	  const mark = menuButton.querySelector(".menu-mark");

	  if (viewName !== "home") {
		menuButton.setAttribute("aria-label", "Close current page");
		menuButton.classList.add("is-close-mode");

		if (label) {
		  label.textContent = "CLOSE";
		}

		if (mark) {
		  mark.innerHTML = "×";
		}

		return;
	  }

	  menuButton.setAttribute("aria-label", "Open menu");
	  menuButton.classList.remove("is-close-mode");

	  if (label) {
		label.textContent = "MENU";
	  }

	  if (mark) {
		mark.innerHTML = `
		  <svg viewBox="0 0 24 24" aria-hidden="true">
			<path d="M12 2.8L14.4 9.6L21.2 12L14.4 14.4L12 21.2L9.6 14.4L2.8 12L9.6 9.6L12 2.8Z"></path>
			<path d="M5.2 3.6L6.2 6.2L8.8 7.2L6.2 8.2L5.2 10.8L4.2 8.2L1.6 7.2L4.2 6.2L5.2 3.6Z"></path>
			<path d="M18.8 3.6L19.6 5.8L21.8 6.6L19.6 7.4L18.8 9.6L18 7.4L15.8 6.6L18 5.8L18.8 3.6Z"></path>
		  </svg>
		`;
	  }
	}
	
	window.showSolricksView = showView;

  viewLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const viewName = link.dataset.view;
      if (!viewName) return;

      showView(viewName);

      history.replaceState(null, "", `#${viewName}`);
	  
    });
  });

		if (window.location.hash === "#store") {
		  showView("store");
		} else if (window.location.hash === "#about") {
		  showView("about");
		} else if (window.location.hash === "#contact") {
		  showView("contact");
		} else {
		  showView("home");
		}
}

function initShareButton() {
  const shareSiteButton = document.getElementById("shareSite");

  if (!shareSiteButton) return;

  async function shareSite() {
    try {
      if (navigator.share) {
        await navigator.share(SITE_SHARE_DATA);
        return;
      }

      await navigator.clipboard.writeText(SITE_SHARE_DATA.url);

      shareSiteButton.textContent = "✓";

      setTimeout(() => {
        shareSiteButton.textContent = "↗";
      }, 1400);
    } catch (error) {
      console.warn("Share cancelled or failed:", error);
    }
  }

  shareSiteButton.addEventListener("click", shareSite);
}

const SPEC_DATA = {
  training: {
    kicker: "AI TRAINING",
    title: "Training Systems",
    description:
      "High-performance infrastructure for model training, fine-tuning, and large-scale AI workloads.",
    image: "upload/gpu-l40s.png",
    imageAlt: "AI training infrastructure render",
    compute: "Blackwell Workstation – 900-5G153-2200-000",
    memory: "256GB Memory Configuration",
    deployment: "On-prem",
    price: "$14.328",
    subject: "Training Systems"
  },

  visual: {
    kicker: "VISUAL AI",
    title: "Visual AI Pipelines",
    description:
      "Optimized systems for image, video and creative AI production workflows.",
    image: "upload/comf-ui.png",
    imageAlt: "Visual AI pipeline infrastructure render",
    compute: "H200 141GB ",
    memory: "276GB for visual workloads",
    deployment: "Cloud-ready Workflow",
    price: "On-Demand $4.99/hr ",
    subject: "Visual AI Pipelines"
  }
};

function initSpecModal() {
  const modal = document.getElementById("specModal");
  const openButtons = document.querySelectorAll("[data-spec-modal]");
  const closeButtons = document.querySelectorAll("[data-close-spec-modal]");

  if (!modal || !openButtons.length) return;

  const image = document.getElementById("specModalImage");
  const kicker = document.getElementById("specModalKicker");
  const title = document.getElementById("specModalTitle");
  const description = document.getElementById("specModalDescription");
  const compute = document.getElementById("specModalCompute");
  const memory = document.getElementById("specModalMemory");
  const deployment = document.getElementById("specModalDeployment");
  const price = document.getElementById("specModalPrice");
  const contact = document.getElementById("specModalContact");

  function openSpecModal(type) {
    const data = SPEC_DATA[type];
    if (!data) return;

    image.src = data.image;
    image.alt = data.imageAlt;
    kicker.textContent = data.kicker;
    title.textContent = data.title;
    description.textContent = data.description;
    compute.textContent = data.compute;
    memory.textContent = data.memory;
    deployment.textContent = data.deployment;
    price.textContent = data.price;
    contact.href = `mailto:hello@solricks.com?subject=${encodeURIComponent(data.subject)}`;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeSpecModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      openSpecModal(button.dataset.specModal);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeSpecModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeSpecModal();
    }
  });
}

async function loadGitHubSocialProof() {
  const starsEl = document.getElementById("github-stars");
  const avatarEls = [
    document.getElementById("github-avatar-1"),
    document.getElementById("github-avatar-2"),
    document.getElementById("github-avatar-3")
  ];

  if (!starsEl) return;

  try {
    const repoResponse = await fetch(GITHUB_REPO_URL, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    });

    if (repoResponse.ok) {
      const repo = await repoResponse.json();
      const stars = Number(repo.stargazers_count || 0);

      starsEl.textContent = `+${stars}`;
      starsEl.title = `${stars} GitHub stars`;
    } else {
      console.warn("GitHub stars request failed:", repoResponse.status);
      starsEl.textContent = "+22";
    }
  } catch (error) {
    console.warn("Could not load GitHub stars:", error);
    starsEl.textContent = "+22";
  }

  try {
    const stargazersResponse = await fetch(GITHUB_STARGAZERS_URL, {
      headers: {
        Accept: "application/vnd.github+json"
      }
    });

    if (!stargazersResponse.ok) {
      console.warn("GitHub avatars request failed:", stargazersResponse.status);
      return;
    }

    const stargazers = await stargazersResponse.json();

    stargazers.slice(0, 3).forEach((user, index) => {
      const avatarEl = avatarEls[index];

      if (avatarEl && user.avatar_url) {
        avatarEl.onerror = () => {
          avatarEl.removeAttribute("src");
        };

        avatarEl.src = user.avatar_url;
      }
    });
  } catch (error) {
    console.warn("Could not load GitHub avatars:", error);
  }
}

function initSolricksSite() {
  initMenu();
  initDisabledLinks();
  initPageViews();
  initShareButton();
  loadGitHubSocialProof();
  initSpecModal();
}

initSolricksSite();