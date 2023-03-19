import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useSignal } from "@preact/signals";
import type { INavItem } from "./NavItem.tsx";

export interface Props {
  items: INavItem[];
}

function MenuItem({ item, level = 0 }: { item: INavItem; level?: number }) {
  const open = useSignal(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const title = (
    <Text
      class={`flex-grow min-h-[40px] flex items-center justify-start text-[1.375rem] font-normal 
      ${item.label === "Ofertas" ? "!text-white min-h[37px] !flex !justify-center" : ""}
      ${
        level === 0
          ? "px-[15px]"
          : level === 1
          ? "px-[45px]"
          : "text-white px-[75px]"
      }
      `}
      variant={level === 0 ? "menu" : "caption"}
    >
      {item.label}
    </Text>
  );

  return (
    <li class={`!border-t-0 ${item.label === "Ofertas" ? '!border-b-1' : ''}`}>
      <div
        class={`flex justify-between items-center w-full py-[4px] border-b-1 
        ${item.label === "Ofertas" ? "py-0 my-2 bg-store-color border-b-1" : ""}
        ${
          level === 0
            ? "bg-transparent"
            : level === 1
            ? "border-white bg-[#D7D9DD]"
            : level === 2
            ? "border-white bg-bar-mobile"
            : ""
        }`}
        onClick={() => {
          if (hasChildren) open.value = !open.value;
        }}
      >
        {hasChildren
          ? title
          : <a class={`w-full inline-block`} href={item.href}>{title}</a>}

        {hasChildren && (
          <Button variant="icon">
            <Icon
              class={`ease-out duration-300 ${open.value === true ? "rotate-[180deg]" : ""}`}
              id="ChevronDown"
              height={20}
              width={20}
              strokeWidth={1.5}
            />
          </Button>
        )}
      </div>

      {hasChildren && (
        <ul
          class={`flex-col ${open.value === true ? "flex" : "hidden"}`}
        >
          {item.children!.map((node) => (
            <MenuItem
              item={node}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function Menu({ items }: Props) {
  const noOrdenedItems = items;
  const ordenedItems = noOrdenedItems;
  const indexNovidades = ordenedItems.findIndex((obj) =>
    obj.label === "Novidades"
  ); // encontra o índice do objeto com label 'Novidades'
  const novidades = ordenedItems.splice(indexNovidades, 1);
  ordenedItems.unshift(novidades[0]); // adiciona o objeto armazenado na primeira posição do array
  const indexOfertas = ordenedItems.findIndex((obj) => obj.label === "Ofertas");
  const ofertas = ordenedItems.splice(indexOfertas, 1);
  ordenedItems.unshift(ofertas[0]); // adiciona o objeto armazenado na primeira posição do array
  return (
    <>
      <ul class="flex-grow flex flex-col divide-y divide-default">
        {window.innerWidth > 1000
          ? noOrdenedItems.map((item) => <MenuItem item={item} />)
          : ordenedItems.map((item) => <MenuItem item={item} />)}
      </ul>
    </>
  );
}

export default Menu;
