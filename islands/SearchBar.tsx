import { JSX } from "preact";
import Icon from "$store/components/ui/Icon.tsx";
// import { route } from "preact-router";

function SearchBar() {
  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    console.log("Alooo");
    console.log(e);
    // route(`/search?query=${query}`);
  };

  return (
    <div class="flex-1 relative flex items-center">
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
        width="100%"
        height="40px"
      />
      <Icon
        id="Search"
        width="15px"
        height="15px"
        strokeWidth={0}
        fill="#000"
        class="absolute z-[1] right-[8px] cursor-pointer"
      />
    </div>
  );
}

export default SearchBar;
