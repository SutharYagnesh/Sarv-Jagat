import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, Award, GraduationCap } from "lucide-react"

export function LeadershipTeam() {
  const leaders = [
    {
      name: "Rajesh Kumar",
      position: "Chief Executive Officer",
      experience: "25+ years",
      education: "MBA, IIM Ahmedabad",
      image: "/placeholder-9a3ht.png",
      bio: "Visionary leader with extensive experience in industrial manufacturing and strategic business development.",
      achievements: ["Led 300% revenue growth", "Expanded to 25+ countries", "Industry Innovation Award 2023"],
      linkedin: "#",
      email: "rajesh.kumar@industrialcorp.com",
    },
    {
      name: "Dr. Priya Sharma",
      position: "Chief Technology Officer",
      experience: "20+ years",
      education: "PhD in Mechanical Engineering, IIT Delhi",
      image: "/indian-woman-engineer.png",
      bio: "Technology innovator driving digital transformation and Industry 4.0 initiatives across our operations.",
      achievements: ["50+ patents filed", "Led IoT integration", "Women in Tech Leadership Award"],
      linkedin: "#",
      email: "priya.sharma@industrialcorp.com",
    },
    {
      name: "Amit Patel",
      position: "Chief Operating Officer",
      experience: "22+ years",
      education: "B.Tech, NIT Surat",
      image: "/indian-operations-manager.png",
      bio: "Operations excellence expert focused on lean manufacturing, quality improvement, and global supply chain optimization.",
      achievements: ["Achieved 99.5% quality rating", "Reduced costs by 30%", "Operational Excellence Award"],
      linkedin: "#",
      email: "amit.patel@industrialcorp.com",
    },
    {
      name: "Sarah Johnson",
      position: "Chief Financial Officer",
      experience: "18+ years",
      education: "CPA, MBA Finance",
      image: "/professional-cfo.png",
      bio: "Financial strategist with expertise in international markets, mergers & acquisitions, and sustainable growth.",
      achievements: ["IPO preparation lead", "Secured $100M funding", "CFO of the Year 2022"],
      linkedin: "#",
      email: "sarah.johnson@industrialcorp.com",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Leadership
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our Executive Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our leadership team combines decades of industry experience with innovative thinking to drive
              IndustrialCorp's continued growth and success in the global marketplace.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leaders.map((leader, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      src={leader.image || "/placeholder.svg"}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                      <p className="text-red-200 font-medium">{leader.position}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Award className="w-4 h-4" />
                        {leader.experience}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <GraduationCap className="w-4 h-4" />
                        {leader.education}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{leader.bio}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Key Achievements:</h4>
                      <ul className="space-y-1">
                        {leader.achievements.map((achievement, achievementIndex) => (
                          <li key={achievementIndex} className="text-sm text-gray-600 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-2" />
                          LinkedIn
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`mailto:${leader.email}`}>
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-gray-50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Join Our Leadership Journey</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We're always looking for exceptional leaders to join our team and help shape the future of industrial
                  manufacturing. If you're passionate about innovation and excellence, we'd love to hear from you.
                </p>
                <Button asChild>
                  <a href="/careers">View Career Opportunities</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
