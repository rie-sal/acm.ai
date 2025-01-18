import { Book, FileText, Video, Users, LinkIcon, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const resources = [
  {
    title: "Learning Materials",
    description: "Curated tutorials, articles, and documentation",
    items: [
      { name: "Machine Learning Basics", link: "#", icon: Book },
      { name: "Python Programming Guide", link: "#", icon: FileText },
      { name: "AI Research Papers", link: "#", icon: Download }
    ]
  },
  {
    title: "Video Resources",
    description: "Recorded lectures and tutorials",
    items: [
      { name: "Workshop Recordings", link: "#", icon: Video },
      { name: "Guest Speaker Sessions", link: "#", icon: Users },
      { name: "Tutorial Series", link: "#", icon: Video }
    ]
  }
]

export function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
          Student Resources
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link 
                        href={item.link}
                        className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.name}</span>
                        <LinkIcon className="h-3 w-3 ml-auto" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
