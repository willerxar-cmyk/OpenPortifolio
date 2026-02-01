import { Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js, Tailwind CSS, and Shadcn UI.
        </p>
        <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
            </a>
             <a href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
            </a>
        </div>
      </div>
    </footer>
  );
}
