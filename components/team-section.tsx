import Image from 'next/image'
import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
  details: {
    year?: string
    major?: string
    interests?: string[]
    aiUsage?: string[]
  }
  social: {
    linkedin?: string
    github?: string
    email?: string
  }
}

const teamMembers: TeamMember[] = [
  {
    name: "Saksham Adhikari",
    role: "Vice President",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Born in Nepal and raised across Nepal and India, I'm passionate about entrepreneurship and artificial intelligence.",
    details: {
      year: "Sophomore",
      major: "Computer Information Systems",
      interests: ["Reading books", "Meditation", "Entrepreneurship", "Recommendation engines"],
      aiUsage: [
        "Claude for writing and coding",
        "Replit for AI backend and API deployment",
        "Vercel and v0 for frontend",
        "LLM APIs integration"
      ]
    },
    social: {
      linkedin: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Zach",
    role: "Officer",
    image: "https://github.com/rie-sal/acm.ai/blob/gh-pages/images/zach_photo.png",
    bio: "Dedicated to advancing AI education and research at Texas State.",
    details: {
      year: "Senior",
      major: "Computer Science"
    },
    social: {
      linkedin: "#",
      github: "#",
      email: "#"
    }
  },
  {
    name: "Samuel Gomez",
    role: "Finance Director",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Focused on the intersection of Computer Science and Finance.",
    details: {
      year: "Junior",
      major: "Computer Science",
      interests: ["Data Science", "Ethics", "Software Engineering", "Music", "Video Games", "Reading"],
      aiUsage: [
        "Perplexity AI for web searching",
        "ChatGPT for code improvement",
        "GitHub Copilot for boilerplate code"
      ]
    },
    social: {
      linkedin: "#",
      github: "#",
      email: "#"
    }
  }
]

export function TeamSection() {
  return (
    <section id="team" className="py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">Our Team</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card key={index} className="group relative overflow-hidden">
              <CardContent className="p-6">
                <div className="aspect-square relative mb-4 overflow-hidden rounded-full">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={`${member.name}'s photo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.details.year} - {member.details.major}</p>
                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <p className="text-sm">{member.bio}</p>
                    {member.details.interests && (
                      <div>
                        <h4 className="font-semibold">Interests</h4>
                        <p className="text-sm">{member.details.interests.join(", ")}</p>
                      </div>
                    )}
                    {member.details.aiUsage && (
                      <div>
                        <h4 className="font-semibold">AI Tools</h4>
                        <ul className="text-sm list-disc list-inside">
                          {member.details.aiUsage.map((tool, i) => (
                            <li key={i}>{tool}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {member.social.linkedin && (
                      <Link 
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        <Image 
                          src="/images/github_icon.svg" 
                          alt="LinkedIn" 
                          width={24} 
                          height={24} 
                        />
                      </Link>
                    )}
                    {member.social.github && (
                      <Link 
                        href={member.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        <Github className="h-6 w-6" />
                      </Link>
                    )}
                    {member.social.email && (
                      <Link 
                        href={`mailto:${member.social.email}`}
                        className="hover:text-primary transition-colors"
                      >
                        <Mail className="h-6 w-6" />
                      </Link>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
