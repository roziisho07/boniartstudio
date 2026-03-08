import { redirect } from "next/navigation";
import { getLatestYear } from "./lib/api";

export default async function Home() {
  const latestYear = await getLatestYear();
  if (!latestYear) {
    redirect("/about");
  }

  redirect(`/year/${latestYear}`);
}
