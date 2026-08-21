import { redirect } from "next/navigation";

// "Industries" is now a section of the About page.
export default function IndustriesPage() {
  redirect("/about#industries");
}
