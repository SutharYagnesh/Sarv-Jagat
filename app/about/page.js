import { PageHero } from "@/components/page-hero"
import { CompanyOverview } from "@/components/sections/company-overview"
import { MilestonesTimeline } from "@/components/sections/milestones-timeline"
import { LeadershipTeam } from "@/components/sections/leadership-team"

export const metadata = {
  title: "About Us | Sarv Jagat Corporation - 25+ Years of Industrial Excellence",
  description:
    "Learn about Sarv Jagat Corporation's journey, leadership team, and commitment to industrial air compressor innovation spanning over 25 years in Gujarat, India.",
  openGraph: {
    title: "About Us | Sarv Jagat Corporation",
    description:
      "Learn about Sarv Jagat Corporation's journey, leadership team, and commitment to industrial air compressor innovation.",
    images: ["/sarv-jagat-facility.png"],
  },
}

export default function AboutPage() {
  const breadcrumbItems = [{ label: "About Us" }]

  return (
    <>
      <PageHero
        title="About Sarv Jagat Corporation"
        description="Leading the compressed air revolution for over 25 years with innovative air compressor solutions, exceptional quality, and unwavering commitment to customer success across India."
        breadcrumbItems={breadcrumbItems}
        backgroundImage="/sarv-jagat-manufacturing-facility.png"
      />
      <CompanyOverview />
      <MilestonesTimeline />
      <LeadershipTeam />
    </>
  )
}
