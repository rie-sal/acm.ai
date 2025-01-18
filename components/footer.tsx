import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4">
          <p className="text-lg font-medium">Find us on social media</p>
          <div className="flex gap-6">
            <Link
              href="https://discord.gg/VY4sy2Y7Vm"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Discord"
            >
              <Image src="/images/discord_icon.svg" alt="Discord" width={32} height={32} />
            </Link>
            <Link
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Google Drive"
            >
              <Image 
                src="" 
                alt="Google Drive" 
                width={32} 
                height={32} 
              />
            </Link>
            <Link
              href="https://www.instagram.com/acm.txst/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Image 
                src="" 
                alt="Instagram" 
                width={32} 
                height={32} 
              />
            </Link>
            <Link
              href="mailto:acmaitxstate@gmail.com"
              className="hover:text-primary transition-colors"
              aria-label="Email"
            >
              <Image src="/images/email_icon.svg" alt="Email" width={32} height={32} />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} ACM AI at TXST. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
