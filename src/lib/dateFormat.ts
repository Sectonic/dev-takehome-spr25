
export default function formatDate(date: string | Date | undefined): string {
    if (!date) return "";
    const validDate = typeof date === "string" ? new Date(date) : date;

    const mm = String(validDate.getMonth() + 1).padStart(2, "0");
    const dd = String(validDate.getDate()).padStart(2, "0");
    const yy = String(validDate.getFullYear()).slice(-2);
    
    return `${mm}/${dd}/${yy}`;
}