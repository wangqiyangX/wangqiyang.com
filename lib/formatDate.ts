export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo} 年前`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo} 月前`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo} 天前`;
  } else {
    formattedDate = "今天";
  }

  const fullDate = targetDate.toLocaleString("zh-cn", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}
