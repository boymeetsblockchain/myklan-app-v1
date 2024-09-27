// utils/timeAgo.ts
export function TimeAgo(dateInput: Date | string) {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();

  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 1) return "just now";
  if (minutesAgo < 60)
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;

  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;

  const daysAgo = Math.floor(hoursAgo / 24);
  if (daysAgo < 7) return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;

  const weeksAgo = Math.floor(daysAgo / 7);
  if (weeksAgo < 4) return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;

  const monthsAgo = Math.floor(daysAgo / 30);
  if (monthsAgo < 12)
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;

  const yearsAgo = Math.floor(daysAgo / 365);
  return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
}
