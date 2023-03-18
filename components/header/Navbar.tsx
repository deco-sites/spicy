import SearchBar from "$store/islands/SearchBar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import { navbarHeight } from "./constants.ts";
import type { INavItem } from "./NavItem.tsx";
import HeaderButton from "$store/islands/HeaderButton.tsx";

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
        class={`hidden md:flex flex-row w-full max-w-[1440px] h-[110px] mx-auto pl-[2.813rem] pr-[2.813rem]`}
      >
        <div class="flex-none mr-[2.813rem]">
          <a
            href="/"
            aria-label="Store logo"
            class="relative z-[51] inline-block h-[110px]"
          >
            <Icon id="Logo" width="130px" height="130px" class="bg-white" />
          </a>
        </div>
        <div class="flex flex-col justify-end flex-1">
          <div class="flex items-center justify-between">
            <div class="flex flex-1 items-center max-w-[480px]">
              <SearchBar />
            </div>
            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Log in"
            >
              <Icon id="User" width="1.625rem" height="auto" strokeWidth={1} />
              <div class="flex flex-col">
                <span class="inline-block text-[0.688rem] font-normal leading-[0.75rem]">
                  Olá Visitante!
                </span>
                <span class="inline-block text-[0.688rem] font-bold leading-[0.75rem]">
                  Entre agora ou Registre-se
                </span>
              </div>
            </Button>
            <HeaderButton variant="cart" />
          </div>
          <div class="w-full h-[fit-content]">
            <ul className="flex-auto flex justify-between">
              {items.map((item) => <NavItem item={item} />)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
