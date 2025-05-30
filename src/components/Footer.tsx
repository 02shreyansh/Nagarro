import { Github, Twitter, Linkedin, Mail, Heart } from 'lucide-react';
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { 
      section: "Services", 
      links: [
        { name: "Issue Report", path: "/report" },
        { name: "Service Request", path: "/request" },
        { name: "Feedback", path: "/feedback" },
        { name: "Rewards", path: "/reward" }
      ] 
    },
    { 
      section: "Resources", 
      links: [
        { name: "Chatbot", path: "/chatbot" },
        { name: "Dashboard", path: "/dashboard" },
        { name: "Sustainability", path: "/impact" },
        { name: "FAQ", path: "#" }
      ] 
    },
    { 
      section: "Company", 
      links: [
        { name: "About", path: "#" },
        { name: "Blog", path: "#" },
        { name: "Careers", path: "#" },
        { name: "Contact", path: "#" }
      ] 
    },
    { 
      section: "Legal", 
      links: [
        { name: "Privacy", path: "#" },
        { name: "Terms", path: "#" },
        { name: "Security", path: "#" },
        { name: "Cookies", path: "#" }
      ] 
    }
  ];
  
  return (
    <footer className="bg-gray-50 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Footer top section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="h-5 w-5 text-white"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
              </div>
              <span className="ml-2 font-bold text-xl">Facility Services Portal</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 max-w-md">
              Streamlining facility management with intuitive tools for reporting issues, requesting services, and tracking sustainability impact.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Button>
            </div>
          </div>
          
          {/* Footer links - responsive grid */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:col-span-2 lg:col-span-3 lg:grid-cols-4">
            {footerLinks.map((column) => (
              <div key={column.section}>
                <h3 className="text-sm font-semibold text-gray-900">{column.section}</h3>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.path} 
                        className="text-sm text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-8" />
        
        {/* Footer bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {currentYear} Facility Services Portal. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-xs text-gray-500 flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> by Facility Services Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}