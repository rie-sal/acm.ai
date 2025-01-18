import { BookOpen, Code, Brain, Database } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const courses = [
  {
    code: "CS 4375",
    name: "Introduction to Machine Learning",
    description: "Fundamentals of machine learning algorithms and techniques.",
    icon: Brain
  },
  {
    code: "CS 3339",
    name: "Computer Architecture",
    description: "Understanding computer organization and hardware-software interface.",
    icon: Code
  },
  {
    code: "CS 3358",
    name: "Data Structures",
    description: "Essential data structures and algorithms implementation.",
    icon: Database
  },
  {
    code: "MATH 2471",
    name: "Calculus I",
    description: "Fundamental concepts of calculus required for AI/ML.",
    icon: BookOpen
  }
]

export function CoursesSection() {
  return (
    <section id="courses" className="py-24">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl mb-12">
          Recommended Courses
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {courses.map((course, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <course.icon className="h-5 w-5 text-primary" />
                  <CardTitle>{course.code}</CardTitle>
                </div>
                <CardDescription>{course.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
