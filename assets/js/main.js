document.addEventListener("DOMContentLoaded", () => {
  const legacyMenuBtn = document.getElementById("menuToggle");
  const legacyNav = document.getElementById("navLinks");

  if (legacyMenuBtn && legacyNav) {
    legacyMenuBtn.addEventListener("click", () => {
      const isOpen = legacyNav.classList.toggle("is-open");
      legacyMenuBtn.setAttribute("aria-expanded", String(isOpen));
      legacyMenuBtn.textContent = isOpen ? "FECHAR //" : "MENU //";
    });

    legacyNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        legacyNav.classList.remove("is-open");
        legacyMenuBtn.setAttribute("aria-expanded", "false");
        legacyMenuBtn.textContent = "MENU //";
      });
    });
  }

  const p2MenuBtn = document.getElementById("p2MenuToggle");
  const p2Drawer = document.getElementById("p2TerminalDrawer");
  const p2Links = document.querySelectorAll(".p2-nav-link, .p2-terminal-link");

  const setActiveP2Link = (targetId) => {
    p2Links.forEach((link) => {
      const isActive = link.dataset.target === targetId;
      link.classList.toggle("is-active", isActive);
    });
  };

  if (p2MenuBtn && p2Drawer) {
    const closeDrawer = () => {
      p2Drawer.classList.remove("is-open");
      p2Drawer.setAttribute("aria-hidden", "true");
      p2MenuBtn.setAttribute("aria-expanded", "false");
    };

    const openDrawer = () => {
      p2Drawer.classList.add("is-open");
      p2Drawer.setAttribute("aria-hidden", "false");
      p2MenuBtn.setAttribute("aria-expanded", "true");
    };

    p2MenuBtn.addEventListener("click", () => {
      const isOpen = p2Drawer.classList.contains("is-open");
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    p2Links.forEach((link) => {
      link.addEventListener("click", () => {
        const target = link.dataset.target;
        if (target) setActiveP2Link(target);
        closeDrawer();
      });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (!p2Drawer.contains(target) && !p2MenuBtn.contains(target)) {
        closeDrawer();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDrawer();
      }
    });
  }

  const fuseButtons = document.querySelectorAll(".p2-fuse-btn");
  const pageSections = Array.from(document.querySelectorAll("main section"));

  if (fuseButtons.length && pageSections.length) {
    const getCurrentSectionIndex = () => {
      const headerHeight =
        document.querySelector(".site-header")?.offsetHeight || 0;
      const currentPosition = window.scrollY + headerHeight + 1;
      let currentIndex = 0;

      pageSections.forEach((section, index) => {
        if (section.offsetTop <= currentPosition) {
          currentIndex = index;
        }
      });

      return currentIndex;
    };

    fuseButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const nextIndex =
          (getCurrentSectionIndex() + 1) % pageSections.length;
        pageSections[nextIndex].scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    });
  }

  const characters = [
    {
      id: "DOSSIÊ // SUJEITO 01",
      name: "Simon Jarrett",
      role: "PROTAGONISTA",
      desc: "Um jovem livreiro de Toronto cuja última memória nítida remonta ao ano de 2015. Sua perspectiva ingênua, atordoada e visceralmente humana funciona como a lente primordial através da qual o jogador tenta processar o horror ontológico do abismo.",
      quote: '"Eu nem sequer deveria estar aqui embaixo..."',
    },
    {
      id: "DOSSIÊ // SUJEITO 02",
      name: "Catherine Chun",
      role: "CIENTISTA",
      desc: "Investigadora da PATHOS-II e arquiteta central do audacioso projeto ARK — uma cápsula satélite digital que carrega a última esperança da mente humana. Uma mente calculista e pragmática indispensável diante de dilemas morais intoleráveis.",
      quote: '"Não é uma transferência mágica, Simon. É uma cópia contínua."',
    },
    {
      id: "DOSSIÊ // SUJEITO 03",
      name: "WAU",
      role: "UNIDADE DE GUARDA",
      desc: 'Inteligência Artificial de biossegurança originalmente programada para preservar a integridade da instalação e de sua equipe. Sua interpretação fria e distorcida da diretriz "manter humanos vivos" é um dos motores de pesadelo da trama.',
      quote:
        "[PULSOS DE GEL ESTRUTURAL REGISTRADOS // PROTOCOLO DE PRESERVAÇÃO FORÇADA ATIVO]",
    },
    {
      id: "DOSSIÊ // SUJEITO 04",
      name: "Vozes Sobreviventes",
      role: "REGISTROS",
      desc: "Fragmentos de áudio, logs de texto, relatórios médicos e gravações de segurança dispersos pelos consoles da PATHOS-II. Dão contorno, desespero e melancolia aos cientistas que enfrentaram o fim da civilização na mais completa escuridão.",
      quote:
        '"A luz na superfície se foi. O que resta para nós aqui em baixo?"',
    },
  ];

  const tabButtons = document.querySelectorAll(".char-item-btn");
  const detailId = document.getElementById("detailId");
  const detailName = document.getElementById("detailName");
  const detailRole = document.getElementById("detailRole");
  const detailDesc = document.getElementById("detailDesc");
  const detailQuote = document.getElementById("detailQuote");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.dataset.index, 10);
      const data = characters[index];

      if (!data) return;

      tabButtons.forEach((btn) => {
        btn.classList.remove("is-active");
        btn.setAttribute("aria-selected", "false");
      });

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");

      detailId.textContent = data.id;
      detailName.textContent = data.name;
      detailRole.textContent = data.role;
      detailDesc.textContent = data.desc;
      detailQuote.textContent = data.quote;
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
});

(function () {
  "use strict";

  var fmt = {
    num: function (v, opts) {
      return new Intl.NumberFormat("pt-BR", opts || {}).format(v);
    },
    brl: function (v) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(v);
    },
    pct: function (v) {
      return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        maximumFractionDigits: 1,
      }).format(v);
    },
  };

  function axisFmt(v) {
    return fmt.num(v, { notation: "compact", maximumFractionDigits: 1 });
  }

  function coerceFormat(spec) {
    if (typeof spec === "function") return spec;
    if (typeof spec === "string" && fmt[spec]) return fmt[spec];
    return function (v) {
      return fmt.num(v);
    };
  }

  function accent() {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#2563eb"
    );
  }
  function mutedColor() {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue("--text-muted")
        .trim() || "#5b6472"
    );
  }
  function svgEl(tag, attrs) {
    var el = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }
  function frame(el, w, h) {
    var svg = svgEl("svg", { viewBox: "0 0 " + w + " " + h, role: "img" });
    el.innerHTML = "";
    el.appendChild(svg);
    return svg;
  }

  function maxOf(values) {
    var m = values.length ? Math.max.apply(null, values) : 0;
    return m > 0 ? m : 1;
  }

  function bar(el, cfg) {
    var W = 640,
      H = 280,
      padL = 46,
      padB = 30,
      padT = 12;
    var svg = frame(el, W, H);
    var max = maxOf(cfg.values);
    var n = cfg.values.length;
    var plotW = W - padL - 12,
      plotH = H - padT - padB;
    var step = plotW / n,
      bw = Math.min(step * 0.62, 64);
    var color = cfg.color || accent();
    var f = coerceFormat(cfg.format);
    for (var g = 0; g <= 4; g++) {
      var gy = padT + plotH - (plotH * g) / 4;
      svg.appendChild(
        svgEl("line", {
          x1: padL,
          y1: gy,
          x2: W - 12,
          y2: gy,
          stroke: "currentColor",
          "stroke-opacity": 0.08,
        }),
      );
      var lbl = svgEl("text", {
        x: padL - 8,
        y: gy + 4,
        "text-anchor": "end",
        "font-size": 10,
        fill: mutedColor(),
      });
      lbl.textContent = axisFmt((max * g) / 4);
      svg.appendChild(lbl);
    }
    cfg.values.forEach(function (v, i) {
      var bh = Math.max(0, (v / max) * plotH);
      var x = padL + i * step + (step - bw) / 2;
      var y = padT + plotH - bh;
      var r = svgEl("rect", {
        x: x,
        y: y,
        width: bw,
        height: bh,
        rx: 4,
        fill: color,
      });
      var t = svgEl("title", {});
      t.textContent = cfg.labels[i] + ": " + f(v);
      r.appendChild(t);
      svg.appendChild(r);
      var tx = svgEl("text", {
        x: x + bw / 2,
        y: H - 10,
        "text-anchor": "middle",
        "font-size": 11,
        fill: mutedColor(),
      });
      tx.textContent = cfg.labels[i];
      svg.appendChild(tx);
    });
  }

  function line(el, cfg) {
    var W = 640,
      H = 280,
      padL = 46,
      padB = 30,
      padT = 12;
    var svg = frame(el, W, H);
    var max = maxOf(cfg.values);
    var n = cfg.values.length;
    var plotW = W - padL - 16,
      plotH = H - padT - padB;
    var color = cfg.color || accent();
    var f = coerceFormat(cfg.format);
    for (var g = 0; g <= 4; g++) {
      var gy = padT + plotH - (plotH * g) / 4;
      svg.appendChild(
        svgEl("line", {
          x1: padL,
          y1: gy,
          x2: W - 16,
          y2: gy,
          stroke: "currentColor",
          "stroke-opacity": 0.08,
        }),
      );
      var lbl = svgEl("text", {
        x: padL - 8,
        y: gy + 4,
        "text-anchor": "end",
        "font-size": 10,
        fill: mutedColor(),
      });
      lbl.textContent = axisFmt((max * g) / 4);
      svg.appendChild(lbl);
    }
    var pts = cfg.values.map(function (v, i) {
      var x = padL + (n === 1 ? plotW / 2 : (plotW * i) / (n - 1));
      var y = padT + plotH - (v / max) * plotH;
      return [x, y];
    });
    var d = pts
      .map(function (p, i) {
        return (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1);
      })
      .join(" ");
    svg.appendChild(
      svgEl("path", {
        d: d,
        fill: "none",
        stroke: color,
        "stroke-width": 2,
        "stroke-linejoin": "round",
      }),
    );
    pts.forEach(function (p, i) {
      var c = svgEl("circle", { cx: p[0], cy: p[1], r: 3.5, fill: color });
      var t = svgEl("title", {});
      t.textContent = cfg.labels[i] + ": " + f(cfg.values[i]);
      c.appendChild(t);
      svg.appendChild(c);
      var tx = svgEl("text", {
        x: p[0],
        y: H - 10,
        "text-anchor": "middle",
        "font-size": 11,
        fill: mutedColor(),
      });
      tx.textContent = cfg.labels[i];
      svg.appendChild(tx);
    });
  }

  function donut(el, cfg) {
    var W = 320,
      H = 280,
      cx = W / 2,
      cy = H / 2,
      R = 92,
      r = 58;
    var svg = frame(el, W, H);
    var total =
      cfg.values.reduce(function (a, b) {
        return a + b;
      }, 0) || 1;
    var palette = cfg.colors || [
      accent(),
      "#1baf7a",
      "#eda100",
      "#e34948",
      "#4a3aa7",
      "#e87ba4",
    ];
    var a0 = -Math.PI / 2;
    cfg.values.forEach(function (v, i) {
      var a1 = a0 + (v / total) * Math.PI * 2;
      var large = a1 - a0 > Math.PI ? 1 : 0;
      var p = [
        "M",
        cx + R * Math.cos(a0),
        cy + R * Math.sin(a0),
        "A",
        R,
        R,
        0,
        large,
        1,
        cx + R * Math.cos(a1),
        cy + R * Math.sin(a1),
        "L",
        cx + r * Math.cos(a1),
        cy + r * Math.sin(a1),
        "A",
        r,
        r,
        0,
        large,
        0,
        cx + r * Math.cos(a0),
        cy + r * Math.sin(a0),
        "Z",
      ].join(" ");
      var path = svgEl("path", { d: p, fill: palette[i % palette.length] });
      var t = svgEl("title", {});
      t.textContent =
        cfg.labels[i] + ": " + fmt.num(v) + " (" + fmt.pct(v / total) + ")";
      path.appendChild(t);
      svg.appendChild(path);
      a0 = a1;
    });
    var center = svgEl("text", {
      x: cx,
      y: cy + 5,
      "text-anchor": "middle",
      "font-size": 20,
      "font-weight": 650,
      fill: "currentColor",
    });
    center.textContent = fmt.num(total);
    svg.appendChild(center);
  }

  window.skipShell = { fmt: fmt };
  window.skipChart = { bar: bar, line: line, donut: donut };
})();
