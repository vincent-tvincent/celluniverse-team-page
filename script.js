const people = [
  {
    name: "Prof. Wayne B Hayes",
    callsign: "Member 01",
    role: "Professor",
    title: "Professor",
    school: "University of California, Irvine",
    photo: "assets/default_profile.svg",
    links: {
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/",
      email: "mailto:professor@example.edu",
      phone: "tel:+10000000000"
    }
  },
  {
    name: "Jihang Li",
    callsign: "Member 02",
    role: "MS Student",
    title: "MS Student",
    school: "University of California, Irvine",
    photo: "assets/jihang_li.jpeg",
    links: {
      github: "https://github.com/JihangLi1121",
      linkedin: "https://www.linkedin.com/in/jihang-li21/",
      email: "jihangl3@uci.edu",
      phone: "tel:+15107664360"
    }
  },
  {
    name: "Yuancen Pu",
    callsign: "Member 03",
    role: "MS Student",
    title: "MS Student",
    school: "University of California, Irvine",
    photo: "assets/yuancen_pu.jpeg",
    links: {
      github: "https://github.com/vincent-tvincent",
      linkedin: "https://www.linkedin.com/in/yuancen-pu-139444220/",
      email: "mailto:puv@uci.edu",
      phone: "tel:+17746415310"
    }
  },
  {
    name: "Name 2",
    callsign: "Member 04",
    role: "MS Student",
    title: "MS Student",
    school: "University of California, Irvine",
    photo: "assets/yiding_wang.jpeg",
    links: {
      github: "https://github.com/",
      linkedin: "https://www.linkedin.com/",
      email: "mailto:sofia@example.edu",
      phone: "tel:+10000000003"
    }
  }
];

const contactLabels = {
  github: "GitHub",
  linkedin: "LinkedIn",
  email: "MAIL",
  phone: "TEL"
};

const contactOrder = ["email", "phone", "github", "linkedin"];
const plainContactTypes = new Set(["email", "phone"]);

function contactTextFor(type, url) {
  if (type === "email") {
    return url.replace(/^mailto:/i, "");
  }

  if (type === "phone") {
    return url.replace(/^tel:/i, "");
  }

  return url;
}

function initialsFor(name) {
  return name
    .replace(/^Prof\.\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function renderPeople() {
  const grid = document.querySelector("#people-grid");
  const template = document.querySelector("#person-card-template");

  people.forEach((person) => {
    const card = template.content.firstElementChild.cloneNode(true);
    const isProfessor = person.role.toLowerCase().includes("professor");

    card.classList.toggle("is-professor", isProfessor);
    card.classList.toggle("has-photo", Boolean(person.photo));
    card.querySelector(".callsign").textContent = person.callsign;
    card.querySelector(".person-name").textContent = person.name;
    card.querySelector(".role-tag").textContent = person.role;
    card.querySelector(".person-title").textContent = `${person.title} - ${person.school}`;

    const photo = card.querySelector(".profile-photo");
    const fallback = card.querySelector(".photo-fallback");
    photo.alt = `${person.name} profile photo`;
    fallback.textContent = initialsFor(person.name);
    photo.addEventListener("error", () => {
      photo.removeAttribute("src");
      card.classList.remove("has-photo");
    });
    photo.src = person.photo;

    const links = card.querySelector(".contact-links");
    contactOrder.forEach((type) => {
      const url = person.links[type];
      if (!url) {
        return;
      }

      if (plainContactTypes.has(type)) {
        const row = document.createElement("div");
        const label = document.createElement("span");
        const value = document.createElement("span");

        row.className = "contact-text";
        label.textContent = contactLabels[type] ?? type;
        value.className = "contact-value";
        value.textContent = contactTextFor(type, url);
        row.append(label, value);
        links.append(row);
        return;
      }

      const link = document.createElement("a");
      link.className = "contact-link";
      link.href = url;
      link.target = type === "email" || type === "phone" ? "" : "_blank";
      link.rel = type === "email" || type === "phone" ? "" : "noreferrer";
      link.setAttribute("aria-label", `${person.name} ${type}`);
      link.innerHTML = `<span>${contactLabels[type] ?? type}</span><span aria-hidden="true">&gt;</span>`;
      links.append(link);
    });

    grid.append(card);
  });
}

renderPeople();
