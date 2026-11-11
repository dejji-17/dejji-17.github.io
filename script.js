const projects = {
  fim: {
    category: "DFIR / PYTHON / FIRST PROJECT",
    title: "DFIR File Integrity Monitor",
    description: "A Python command-line file-integrity monitor that creates a JSON baseline of file SHA-256 hashes and filesystem modification times, then reports new, modified, deleted, and timestamp-only changes.",
    steps: [
      "Create a baseline for a directory or an individual file.",
      "Verify the current files against the saved baseline.",
      "Review change reports and non-zero exit codes.",
      "Run the included unit tests with python -m unittest -v test_fim."
    ]
  },
  traffic: {
    category: "BLUE TEAM / LEARNING LAB",
    title: "Reading the signal",
    description: "Practice building a careful picture of network activity from a provided capture or an authorized training environment. The goal is to explain observations, not jump to conclusions.",
    steps: [
      "Establish a baseline from known, benign traffic.",
      "Filter and inspect protocol, endpoint, and timing patterns.",
      "Record notable evidence and alternative explanations.",
      "Summarize findings and identify a defensive next step."
    ]
  },
  appsec: {
    category: "APPSEC / LEARNING LAB",
    title: "Trust, tested",
    description: "Use a deliberately vulnerable training application to explore how authentication and authorization differ. Keep all testing inside the provided lab.",
    steps: [
      "Map the intended user roles and access rules.",
      "Review how the training app handles sessions and permissions.",
      "Document a finding with impact, evidence, and a safe reproduction.",
      "Recommend a proportionate remediation and retest plan."
    ]
  },
  response: {
    category: "FOUNDATIONS / PROJECT STARTER",
    title: "Ready to respond",
    description: "Draft a practical first-response outline for a small organization. This is a planning exercise, not a substitute for an organization-specific incident-response plan.",
    steps: [
      "Define who receives reports and who can make decisions.",
      "List safe first actions for triage and evidence preservation.",
      "Outline escalation, communications, and recovery checkpoints.",
      "Add a short post-incident review and improvement loop."
    ]
  }
};

const filters = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const dialog = document.querySelector(".project-dialog");
const toast = document.querySelector(".toast");
let toastTimer;

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-pressed", String(active));
    });
    projectCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

document.querySelectorAll(".project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.dataset.project];
    if (!project) return;

    document.querySelector("#dialog-category").textContent = project.category;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-description").textContent = project.description;
    const steps = document.querySelector("#dialog-steps");
    steps.replaceChildren(...project.steps.map((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      return item;
    }));
    dialog.showModal();
  });
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  });
});

const contactLink = document.querySelector('.contact-inner .button');
contactLink.addEventListener("click", (event) => {
  const recipient = contactLink.getAttribute("href").slice("mailto:".length).split("?")[0];
  if (!recipient) {
    event.preventDefault();
    showToast("Add your email address to this link in index.html before publishing.");
  }
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 3800);
}

document.querySelector("#year").textContent = new Date().getFullYear();
