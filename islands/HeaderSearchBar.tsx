import { useEffect, useState } from "preact/hooks";
import { JSX } from "preact";
import Icon from "$store/components/ui/Icon.tsx";

function SearchBar() {
  const isSearchPage: boolean = window?.location?.pathname === "/s";
  const initialValue = isSearchPage
    ? (window.localStorage.getItem("searchQuery") ?? "")
    : "";
  const [inputValue, setInputValue] = useState(initialValue);
  let timeout: any = null;

  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }

    const query = e.currentTarget.value;
    setInputValue(query);

    window.localStorage.setItem("searchQuery", query);
    if (window.innerWidth >= 1000) {
      timeout = setTimeout(() => {
        window.location.href = `/s?q=${query}`;
      }, 2500);
    }
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    window.location.href = `/s?q=${inputValue}`;
  };

  if (!isSearchPage) {
    window.localStorage.removeItem("searchQuery");
  }

  useEffect(() => {
  }, [inputValue]);

  return (
    <form
      onSubmit={handleSubmit}
      class="flex-1 relative flex items-center xl:mr-[1rem]"
    >
      <Icon
        id="Microphone"
        width="12px"
        height="18px"
        strokeWidth={0}
        fill="#53565a"
        class="absolute z-[1] left-[8px] cursor-pointer"
      />
      <input
        class="flex flex-1 h-[2.25rem] px-[1.875rem] bg-[#bfbfbf1a] outline-none border-b-2 border-solid border-search-bar text-[14px] font-regular"
        type="text"
        onChange={handleInput}
        value={inputValue}
        width="100%"
        height="40px"
      />
      <button type="submit" class="flex items-center">
        <Icon
          id="Search"
          width="15px"
          height="15px"
          strokeWidth={0}
          fill="#000"
          class="absolute z-[1] right-[8px] cursor-pointer"
        />
      </button>
    </form>
  );
}

export default SearchBar;
