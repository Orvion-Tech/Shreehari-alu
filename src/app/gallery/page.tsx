import { redirect } from "next/navigation";

// The gallery is now a section of the Projects page.
export default function GalleryPage() {
  redirect("/projects#gallery");
}
