import { Mail } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About ACM AI</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            The ACM AI Club is dedicated to exploring and advancing AI at Texas State University.
          </p>
          <p className="text-lg font-medium">Find us on social media</p>
          <div className="flex gap-6">
            <Link
              href="https://discord.gg/VY4sy2Y7Vm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Discord"
            >
              <Image src="/images/discord_icon.svg" alt="Discord" width={50} height={50} />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Image src="/images/github_icon.svg" alt="GitHub" width={50} height={50} />
            </Link>
            <Link
              href="https://www.instagram.com/acm.txst/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Image src="/images/instagram_icon.svg" alt="Instagram" width={50} height={50} />
            </Link>
            <Link
              href="mailto:acmaitxstate@gmail.com"
              className="hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Image src="/images/email_icon.svg" alt="Email" width={50} height={50} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
