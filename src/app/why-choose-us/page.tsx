import { redirect } from "next/navigation";

// "Why Choose Us" is now a section of the About page.
export default function WhyChooseUsPage() {
  redirect("/about#why-choose-us");
}
