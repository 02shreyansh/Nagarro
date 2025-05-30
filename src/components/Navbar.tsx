import { useState } from 'react';
import { Menu, Home, FileText, GitPullRequest, Leaf } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../components/ui/navigation-menu";
import { Button } from "../components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Separator } from "../components/ui/separator";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Top 4 important features
  const NavItems = [
    { name: "Dashboard", icon: <Home className="h-4 w-4 mr-2" />, link: 'dashboard' },
    { name: "Report", icon: <FileText className="h-4 w-4 mr-2" />, link: 'report' },
    { name: "Request", icon: <GitPullRequest className="h-4 w-4 mr-2" />, link: 'request' },
    { name: "Impact", icon: <Leaf className="h-4 w-4 mr-2" />, link: 'impact' },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo & Brand */}
          <div className="flex-shrink-0 flex items-center">
            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span className="ml-2 font-bold text-xl cursor-pointer">
              <a href="/">Facility Services Portal</a>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            <NavigationMenu>
              <NavigationMenuList>
                {NavItems.map((item) => (
                  <NavigationMenuItem key={item.name}>
                    <NavLink
                      className={({ isActive }) =>
                        `group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${isActive
                          ? "bg-gray-100 text-green-600"
                          : "bg-white hover:bg-gray-100 hover:text-green-600"
                        }`
                      }
                      to={`/${item.link}`}
                    >
                      {item.icon}
                      {item.name}
                    </NavLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* User profile & settings */}
          <div className="hidden md:flex md:items-center space-x-2">
            <Button
              variant="outline"
              className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
              onClick={() => navigate('/reward')}
            >
              Rewards
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100"
              onClick={() => navigate('/chatbot')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </Button>
            <Avatar onClick={() => navigate('/profile')} className="cursor-pointer h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-white"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <span className="ml-2 font-bold text-xl">Facility Services Portal</span>
                    </div>
                  </SheetTitle>
                  <SheetDescription>
                    Facility management and service portal
                  </SheetDescription>
                </SheetHeader>
                <Separator className="my-4" />
                <div className="flex flex-col space-y-2 mt-4">
                  {NavItems.map((item) => (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className={
                        `justify-start ${location.pathname === `/${item.link}`
                          ? "bg-gray-100 text-green-600"
                          : "hover:bg-gray-100 hover:text-green-600"
                        }`
                      }
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        navigate(`/${item.link}`);
                      }}
                    >
                      {item.icon}
                      {item.name}
                    </Button>
                  ))}
                  <Separator className="my-2" />
                  <Button
                    variant="outline"
                    className="text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/reward');
                    }}
                  >
                    Rewards
                  </Button>
                  <Button
                    variant="ghost"
                    className="justify-start hover:bg-gray-100 hover:text-green-600"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/chatbot');
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    Chatbot
                  </Button>
                  <div className="flex items-center justify-between px-2 pt-2">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8" onClick={() => navigate('/profile')}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-gray-500">john@example.com</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}