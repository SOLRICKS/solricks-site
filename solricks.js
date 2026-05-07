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

  menuOpen.addEventListener("click", openMenu);

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
  initShareButton();
  loadGitHubSocialProof();
}

initSolricksSite();