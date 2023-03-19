import SearchBar from "$store/islands/HeaderSearchBar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";

import NavItem from "./NavItem.tsx";
import type { INavItem } from "./NavItem.tsx";
import HeaderButton from "$store/islands/HeaderButton.tsx";

function Navbar({ items }: {
  items: INavItem[];
}) {
  return (
    <>
      {/* Mobile Version */}
      <div
        class={`lg:hidden flex flex-row justify-between items-center h-[60px] w-full px-2 gap-2`}
      >
        <HeaderButton variant="menu" />

        <a
          href="/"
          aria-label="Store logo"
          class="relative z-[51] inline-block h-[60px] mr-auto"
        >
          <Icon id="Logo" width="83px" height="83px" class="bg-white" />
        </a>

        <div class="flex gap-1 mr-[5px]">
          <HeaderButton variant="search" />
          <HeaderButton variant="cart" />
        </div>
      </div>

      {/* Desktop Version */}
      <div
        class={`hidden lg:flex flex-row w-full max-w-[1440px] h-[110px] mx-auto pl-[2.813rem] pr-[2.813rem]`}
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
              aria-label="Favoritos"
              class="hover:bg-transparent"
            >
              <Icon
                id="WeddingList"
                width="1.75rem"
                height="auto"
                strokeWidth={1}
              />
              <span
                class={`hidden xl:inline-block`}
              >
                Lista de Casamento
              </span>
            </Button>
            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Favoritos"
              class="hover:bg-transparent"
            >
              <Icon
                id="WishList"
                width="1.75rem"
                height="auto"
                strokeWidth={1}
              />
            </Button>
            <Button
              as="a"
              variant="icon"
              href="/login"
              aria-label="Log in"
              class="hover:bg-transparent"
            >
              <Icon id="User" width="1.625rem" height="auto" strokeWidth={1} />
              <div class="hidden xl:flex flex-col">
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
