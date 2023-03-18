import Modals from "$store/islands/HeaderModals.tsx";
import type { Image } from "deco-sites/std/components/types.ts";
import Navbar from "./Navbar.tsx";
import { headerHeight } from "./constants.ts";

export interface NavItem {
  label: string;
  href: string;
  highlight?: boolean;
  children?: Array<{
    label: string;
    href: string;
    highlight?: boolean;
    children?: Array<{
      label: string;
      href: string;
    }>;
  }>;
  image?: {
    src?: Image;
    alt?: string;
  };
}

export interface Props {
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: NavItem[];
}

function Header(
  {
    navItems = [],
  }: Props,
) {
  return (
    <header>
      <div class="bg-default fixed w-full z-50">
        <Navbar items={navItems} />
      </div>

      <Modals
        menu={{ items: navItems }}
      />
    </header>
  );
}

export default Header;
