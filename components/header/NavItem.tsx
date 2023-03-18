import { tw } from "twind";
import { css, theme } from "twind/css";
import Text from "$store/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

const hoverDepartmenet = css`
  & {
    & > a {
      transition: ease-out 0.2s;
      border-bottom: 2px solid transparent;
      &:hover{
        border-bottom: 2px solid  ${theme("borderColor.store-color")};
      }
    }
  }
`;

export interface INavItem {
  label: string;
  href: string;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li
      class={`group flex items-center ${
        tw(hoverDepartmenet)
      } pt-[0.938rem] pb-[10px]`}
    >
      <a href={href} class="font-medium text-primary text-[1rem]">
        {label}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed invisible hover:visible group-hover:visible bg-default z-50 flex items-start justify-center gap-6 border-t-1 border-b-2 border-default w-screen mt-[7.438rem]`}
            style={{ top: "-0.625rem", left: "0" }}
          >
            {image?.src && (
              <Image
                class="p-6"
                src={image.src}
                alt={image.alt}
                width={300}
                height={332}
                loading="lazy"
              />
            )}
            <ul class="flex flex-col items-start justify-center gap-2">
              {children.map((itemLvl2) => (
                <>
                  <li className="">
                    <a
                      class="hover:underline text-[1.375rem] lg:(text-[1.2rem])"
                      href={itemLvl2.href}
                    >
                      {itemLvl2.label}
                    </a>
                  </li>
                  {itemLvl2.children?.map((itemLvl3) => (
                    <li className="h-24">
                      <a class="hover:underline" href={itemLvl3.href}>
                        <Text variant="caption">{itemLvl3.label}</Text>
                      </a>
                    </li>
                  ))}
                </>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
