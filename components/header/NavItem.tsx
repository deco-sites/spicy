import { tw } from "twind";
import { css, theme } from "twind/css";
import Text from "$store/components/ui/Text.tsx";
import Image from "deco-sites/std/components/Image.tsx";
import { headerHeight } from "./constants.ts";

const hoverDepartmenet = css`
    &:last-child > a {
      transition: ease-out 0.2s;
      border-bottom: 2px solid transparent;
      &:hover{
        border-bottom: 2px solid  ${theme("borderColor.store-color")};
      }
    }
`;

const ofertaCss = css`
  &:last-child > a{
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 75px;
    height: 25px;
    color: white;
    background-color: ${theme("backgroundColor.store-color")};
    border-radius: 10px;
  }
`;

export interface INavItem {
  label: string;
  href: string;
  highlight?: boolean;
  children?: INavItem[];
  image?: { src?: string; alt?: string };
}

function NavItem({ item }: { item: INavItem }) {
  const { href, label, children, image } = item;

  return (
    <li
      class={`group flex items-center ${tw(ofertaCss)} ${
        tw(hoverDepartmenet)
      } pt-[0.938rem] pb-[10px]
      ${item?.highlight ? "font-medium" : "font-normal"}
      `}
    >
      <a href={href} class="font-medium text-primary text-[1rem]">
        {label}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`fixed invisible hover:visible group-hover:visible bg-default z-50 flex flex-row items-start justify-center gap-6 border-t-1 border-b-2 border-default w-screen mt-[7.438rem] min-h-[500px] max-h-[500px]`}
            style={{ top: "-0.625rem", left: "0" }}
          >
            <div class="flex justify-between w-full max-w-[1455px] pl-[13.75rem] pr-[3.125rem]">
              <ul class="flex flex-col flex-wrap max-h-[500px] min-w-[570px] gap-y-[0.5rem]">
                {children.map((itemLvl2) => (
                  <>
                    <ul className="flex flex-col mt-[1.25rem] mr-[3.125rem] w-[fit-content]">
                      <li className="h-[fit-content] mb-[1.25rem] leading-[1.438rem]  last:mb-0">
                        <a
                          class={`hover:no-underline !lg:(text-[1.188rem]) text-primary ${
                            itemLvl2.highlight ? "font-medium" : "font-normal"
                          }`}
                          href={itemLvl2.href}
                        >
                          {itemLvl2.label}
                        </a>
                      </li>
                      {itemLvl2.children?.map((itemLvl3) => (
                        <li className="h-[fit-content] mb-[0.625rem] last:mb-0 leading-[0.75rem]">
                          <a
                            href={itemLvl3.href}
                          >
                            <Text
                              variant="caption"
                              class="hover:no-underline font-normal lg:(text-[1rem]) !text-[#53565a] !hover:text-[#53565a80] ease-out duration-300"
                            >
                              {itemLvl3.label}
                            </Text>
                          </a>
                        </li>
                      ))}
                      <li className="h-[fit-content] mb-[0.75rem] last:mb-0 leading-[0.75rem]">
                        <a
                          href={itemLvl2.href}
                        >
                          <Text
                            variant="caption"
                            class="hover:no-underline font-normal lg:(text-[1rem]) !text-[#53565a80] !hover:text-[#53565a] ease-out duration-300"
                          >
                            Ver tudo {">"}
                          </Text>
                        </a>
                      </li>
                    </ul>
                  </>
                ))}
              </ul>
              {image?.src?.length
                ? (
                  <div class="inline-flex flex-1 items-center max-w-[440px]">
                    <img
                      src={image.src}
                      alt={image?.alt}
                      width="100%"
                      height="auto"
                    />
                  </div>
                )
                : <></>}
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
