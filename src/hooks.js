import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

export function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll(".reveal")];
    els.forEach((el) => {
      const siblings = [...(el.parentElement?.children || [])].filter((n) =>
        n.classList?.contains("reveal")
      );
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--d", `${idx * 90}ms`);
    });

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function useSpotlight() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e) => {
      const t = e.target.closest("[data-spot]");
      if (!t) return;
      const r = t.getBoundingClientRect();
      t.style.setProperty("--sx", `${((e.clientX - r.left) / r.width) * 100}%`);
      t.style.setProperty("--sy", `${((e.clientY - r.top) / r.height) * 100}%`);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
}

export function useHeroTilt() {
  useEffect(() => {
    const stage = document.querySelector(".hero-art");
    const card = document.querySelector(".profile-card");
    if (!stage || !card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const move = (e) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty("--rx", `${(-y * 10).toFixed(2)}deg`);
      card.style.setProperty("--ry", `${(x * 12).toFixed(2)}deg`);
    };
    const leave = () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    };

    stage.addEventListener("pointermove", move);
    stage.addEventListener("pointerleave", leave);
    return () => {
      stage.removeEventListener("pointermove", move);
      stage.removeEventListener("pointerleave", leave);
    };
  }, []);
}

export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);
  return active;
}
