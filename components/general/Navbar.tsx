import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { ModeToggle } from "./mode-toggle";
import { LogoIcon } from "./Icons";

import { navbarLinksList, NavProps } from "@/config/nav";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { MobileNavFragment } from "./MobileNavFragment";
const { title } = siteConfig;

export const Navbar = () => {
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <Link href="/" className="ml-2 font-bold text-xl flex">
              <LogoIcon />
              <span className="hidden md:block">{"Stream Saver"}</span>
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <div className="flex md:hidden">
            <ModeToggle />
            <MobileNavFragment />
          </div>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            {navbarLinksList.map((route: NavProps, i) => (
              <Link
                href={route.href}
                key={i}
                className={`text-[17px] ${buttonVariants({
                  variant: "ghost",
                })}`}
              >
                {route.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex gap-2">
            <Link
              href=""
              target="_blank"
              className={`border ${buttonVariants({ variant: "secondary" })}`}
            >
              {/* <GitHubLogoIcon className="mr-2 w-5 h-5" /> */}
            Get Started
            </Link>

            <ModeToggle />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
