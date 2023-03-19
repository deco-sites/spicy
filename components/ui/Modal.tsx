import { tw } from "twind";
import { css, theme } from "twind/css";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import { useEffect, useRef } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import type { JSX } from "preact";

import Icon from "./Icon.tsx";

const backdropSearchMobile = css`
  &::backdrop {
    
  }
`;

// Lazy load a <dialog> polyfill.
if (IS_BROWSER && typeof window.HTMLDialogElement === "undefined") {
  await import(
    "https://raw.githubusercontent.com/GoogleChrome/dialog-polyfill/5033aac1b74c44f36cde47be3d11f4756f3f8fda/dist/dialog-polyfill.esm.js"
  );
}

export type Props = JSX.IntrinsicElements["dialog"] & {
  title?: string;
  mode?: "sidebar-right" | "sidebar-left" | "center" | "searchBar";
  onClose?: () => Promise<void> | void;
  loading?: "lazy" | "eager";
};

const styles = {
  "sidebar-right": "animate-slide-left sm:ml-auto",
  "sidebar-left": "animate-slide-right",
  "searchBar": "absolute left-0 top-0",
  center: "",
};

const Modal = ({
  open,
  title,
  mode = "sidebar-right",
  onClose,
  children,
  loading,
  ...props
}: Props) => {
  const lazy = useSignal(false);
  const ref = useRef<HTMLDialogElement>(null);
  const variant = styles[mode];

  useEffect(() => {
    if (ref.current?.open === true && open === false) {
      document.getElementsByTagName("body").item(0)?.removeAttribute(
        "no-scroll",
      );
      ref.current.close();
    } else if (ref.current?.open === false && open === true) {
      document.getElementsByTagName("body").item(0)?.setAttribute(
        "no-scroll",
        "",
      );
      ref.current.showModal();
      lazy.value = true;
    }
  }, [open]);

  if (mode === "searchBar") {
    return (
      <dialog
        ref={ref}
        class={`
        ${open ? "flex" : "hidden"}
        flex items-start w-full h-full`}
        style={`
        padding: 0;
        height: fit-content;
        width: calc(100% - 30px);
        max-width: unset;
        z-index: 50;
        margin: 90px auto 0;
        `}
        onClick={(e) =>
          (e.target as HTMLDialogElement).tagName === "DIALOG" && onClose?.()}
      >
        <section class="flex w-full">
          {loading === "lazy" ? lazy.value && children : children}
        </section>
      </dialog>
    );
  }

  return (
    <dialog
      {...props}
      ref={ref}
      class={` ${
        open ? "flex" : "hidden"
      } items-start bg-transparent p-0 m-0 max-w-full sm:max-w-lg w-full max-h-full h-full backdrop ${variant} ${
        props.class ?? ""
      }`}
      onClick={(e) =>
        (e.target as HTMLDialogElement).tagName === "DIALOG" && onClose?.()}
    >
      <section class="overflow-y-auto h-full bg-default flex flex-col">
        <header
          class={`flex pl-[0.438rem] pr-[0.938rem] py-[3px] justify-between items-center ${
            mode === "sidebar-left" ? "bg-bar-mobile" : ""
          }`}
        >
          {mode === "sidebar-left"
            ? (
              <>
                <Button
                  as="a"
                  variant="icon"
                  href="/login"
                  aria-label="Log in"
                  class="hover:bg-transparent"
                >
                  <Icon
                    id="User"
                    width="1.625rem"
                    height="auto"
                    strokeWidth={1}
                    style={{ filter: "brightness(10)" }}
                  />

                  <div class="flex flex-col">
                    <span class="inline-block text-white text-[1rem] font-normal leading-[1rem]">
                      Olá Visitante!{" "}
                      <span class="inline-block text-white text-[1rem] font-semibold leading-[1rem]">
                        Entre agora ou Registre-se
                      </span>
                    </span>
                  </div>
                </Button>
                <Button variant="icon" onClick={onClose} class="p-0">
                  <Icon
                    id="XMark"
                    width={35}
                    height={35}
                    strokeWidth={3}
                    style={{ color: "#fff" }}
                  />
                </Button>
              </>
            )
            : (
              <>
                <h1>
                  <Text variant="heading-2">{title}</Text>
                </h1>
                <Button variant="icon" onClick={onClose}>
                  <Icon id="XMark" width={20} height={20} strokeWidth={2} />
                </Button>
              </>
            )}
        </header>
        {mode === "sidebar-left"
          ? (
            <ul class="flex flex-wrap">
              <li class="flex w-full border-b-1 border-[#D4DBD7] py-[10px] px-[15px] h-[fit-content]">
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
                    class="opacity-[0.85]"
                  />
                  <span class="text-menu-mobile text-[1.5rem] font-normal ml-[10px]">
                    Favoritos
                  </span>
                </Button>
              </li>
              <li class="flex w-full border-b-1 border-[#D4DBD7] py-[10px] px-[15px] h-[fit-content]">
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
                  <span class="text-menu-mobile text-[1.5rem] font-normal ml-[10px]">
                    Lista de Casamento
                  </span>
                </Button>
              </li>
            </ul>
          )
          : <></>}

        <div class="h-full flex flex-col">
          {loading === "lazy" ? lazy.value && children : children}
        </div>
      </section>
    </dialog>
  );
};

export default Modal;
