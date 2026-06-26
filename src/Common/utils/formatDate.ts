export function formatDate(
    dateString: string | undefined | null,
    language: string
  ): string {
    if (!dateString) return "";
  
    const date = new Date(dateString);
  
    if (Number.isNaN(date.getTime())) return "";
  
    return new Intl.DateTimeFormat(language, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  }