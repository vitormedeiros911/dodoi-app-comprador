export default function getFirstName(fullName: string): string {
  if (!fullName) return "";

  return fullName.split(" ")[0];
}
