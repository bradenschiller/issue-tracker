"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { FaBug } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";

const links = [
  { href: "/", label: "Dashboard", icon: MdSpaceDashboard },
  { href: "/issues", label: "Issues", icon: FaBug },
];

interface LinkProps {
  href: string;
  label: string;
  icon: React.ComponentType;
}

export default function Navbar() {
  const currentPathName = usePathname();

  return (
    <nav className="bg-gray-800 h-screen w-48">
      <ul className="flex flex-col space-y-2 m-2">
        {links.map(({ href, label, icon: Icon }: LinkProps) => (
          <li
            key={href}
            className={`p-2 flex space-x-1 items-center ${
              currentPathName === href ? "bg-gray-600 rounded-lg" : null
            } hover:bg-gray-600 rounded-lg cursor-pointer transition-colors`}
          >
            <Icon />
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
