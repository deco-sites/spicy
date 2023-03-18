import Icon from "$store/components/ui/Icon.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useUI } from "$store/sdk/useUI.ts";
import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";

function SearchButton() {
  const { displaySearchbar } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="search icon button"
      onClick={() => {
        displaySearchbar.value = !displaySearchbar.peek();
      }}
    >
      <Icon id="MagnifyingGlass" width={20} height={20} strokeWidth={0.1} />
    </Button>
  );
}

function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      variant="icon"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" width={20} height={20} strokeWidth={0.01} />
    </Button>
  );
}

function CartButton() {
  const { displayCart } = useUI();
  const { loading, cart } = useCart();
  const totalProducts = cart.value?.items?.length || "0";
  const totalItems = cart?.value?.items.reduce(
    (acc, item) => acc + item.quantity,
    0,
  ) || "0";

  return (
    <Button
      variant="icon"
      class="relative hover:bg-transparent"
      aria-label="open cart"
      disabled={loading.value}
      onClick={() => {
        displayCart.value = true;
      }}
    >
      <Icon
        id="ShoppingCart"
        width="1.75rem"
        height="1.75rem"
        strokeWidth={1}
      />
      <span class="absolute text-[9px] right-[-0.625rem] top-[-0.375rem] rounded-full bg-badge text-white w-[fit-content] h-[fit-content] flex items-center justify-center px-[8px] py-[5px] leading-[1] text-[0.625rem]">
        {totalItems}
      </span>
    </Button>
  );
}

function HeaderButton({ variant }: { variant: "cart" | "search" | "menu" }) {
  if (variant === "cart") {
    return <CartButton />;
  }

  if (variant === "search") {
    return <SearchButton />;
  }

  if (variant === "menu") {
    return <MenuButton />;
  }

  return null;
}

export default HeaderButton;
