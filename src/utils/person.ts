export function normalizeName(value: string | null | undefined): { firstName: string; lastName: string; fullName: string; initials: string } {
  const fallback = "Utilisateur";
  const raw = (value ?? "").trim();

  if (!raw || raw === "Non assignée" || raw === "undefined") {
    return { firstName: fallback, lastName: "", fullName: fallback, initials: "U" };
  }

  const cleaned = raw.includes("@") ? raw.split("@")[0] : raw;
  const candidate = cleaned
    .replace(/[._-]+/g, " ")
    .replace(/[\s]{2,}/g, " ")
    .trim();

  const words = candidate
    .split(" ")
    .map((part) => part.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ]/g, ""))
    .filter(Boolean);

  if (!words.length) {
    return { firstName: fallback, lastName: "", fullName: fallback, initials: "U" };
  }

  const firstName = words[0]?.charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  const lastName = words.slice(1).map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()).join(" ");
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const initials = (fullName.match(/[A-ZÀ-ÖØ-Ý]/g) ?? [firstName[0] ?? "U"]).slice(0, 2).join("").toUpperCase();

  return { firstName, lastName, fullName, initials };
}

export function formatPersonLabel(value: string | null | undefined): string {
  const { fullName, initials } = normalizeName(value);
  return fullName === "Utilisateur" && (!value || value === "Non assignée" || value === "undefined")
    ? "Non assignée"
    : `${fullName} (${initials})`;
}

export function getInitials(value: string | null | undefined): string {
  return normalizeName(value).initials;
}
