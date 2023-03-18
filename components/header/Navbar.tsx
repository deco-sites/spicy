import { asset } from "$fresh/runtime.ts";
import { tw } from "twind";
import { css, theme } from "twind/css";
import HeaderButton from "$store/islands/HeaderButton.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";

const headerShadow = css` 
& {
  box-shadow: ${theme("boxShadow.default")}
}`;

function Navbar({ items }: {
  items: INavItem[];
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`md:hidden flex flex-row justify-between items-center h-[${navbarHeight}] border-b-1 border-default w-full px-2 gap-2`}
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          class={`flex-grow inline-flex items-center  no-underline min-h-[${navbarHeight}]`}
          aria-label="Store logo"
        >
          <Icon id="Logo" width={126} height={16} />
        </a>

        <div class="flex gap-1">
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div
        class={`hidden md:flex flex-row justify-between items-center border-b-1 border-default w-full pl-[2.813rem] pr-[2.813rem] ${`h-[110px]`} ${
          tw(headerShadow)
        }`}
      >
        <div class="flex-none mr-[2.813rem]">
          <a
            href="/"
            aria-label="Store logo"
            class="relative z-[51] inline-block h-[110px]"
          >
            <img
              className="bg-white"
              width="130px"
              height="130px"
              src={asset(`/spicy-logo.svg`)}
              alt="Spicy"
            />
          </a>
        </div>
        <ul className="flex-auto flex justify-between">
          {items.map((item) => <NavItem item={item} />)}
        </ul>
        <div class="flex-none w-44 flex items-center justify-end gap-2">
          <Button
            as="a"
            variant="icon"
            href="/login"
            aria-label="Log in"
          >
            <Icon id="User" width={20} height={20} strokeWidth={0.4} />
          </Button>
          <HeaderButton variant="cart" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
