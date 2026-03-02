export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const ROLES = {
  ADMIN: "admin",
  STUDENT: "student",
  CONTRIBUTOR: "contributor",
};

export const THEME = {
  colors: {
    charcoal: "#0F0F0F",
    surface: "#1A1714",
    gold: "#F5C26B",
    goldHover: "#D9A54C",
    orange: "#F97316",
    textPrimary: "#F5F5F5",
    textSecondary: "#A3A3A3",
  },
  borderRadius: "1rem", // rounded-2xl
  transition: "all 0.3s ease-in-out",
};

export const PAGINATION_LIMIT = 10;

export const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom", labels: { color: "#A3A3A3" } },
  },
};