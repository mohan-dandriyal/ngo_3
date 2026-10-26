
import DonateHero from "@/app/components/donate/DonateHero";
import DonationSection from "@/app/components/donate/DonationSection";
import donateData from "@/app/data/donate.json";
import type { DonatePageData } from "@/app/types/donate";

export const metadata = {
  title: "Donate | WKX Foundation",
  description:
    "Support WKX Foundation's community-led initiatives and help create lasting positive change."
};

const data = donateData as DonatePageData;

export default function DonatePage() {
  return (
    <main className="min-h-screen bg-[#0A0B09]">
      <DonateHero data={data.hero} />
      <DonationSection data={data.donation} />
    </main>
  );
}
