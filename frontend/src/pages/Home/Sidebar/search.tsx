import { IoClose, IoSearchSharp } from "react-icons/io5"
import useConversation from "../../../zustand/useConversation"
import { ChangeEvent, useCallback, useState } from "react";
import classNames from "classnames";
import { debounce } from "../../../utils/common";

const Search = () => {
  const { search, setSearch, is_searching, setIsSearching } = useConversation();
  const [input, setInput] = useState('');

  const debouncedSetSearch = useCallback(
    debounce((input: string) => {
      setSearch(input);
      setIsSearching(false);
    }, 500),
    [setSearch]
  );

  const onChange = (input: string) => {
    setInput(input);
    if(!is_searching) setIsSearching(true);
    debouncedSetSearch(input);
  };

  const onClear = () => {
    setInput('');
    setSearch('');
    setIsSearching(false);
  };

  return (
    <div className="m-2">
      <div className="flex items-center gap-2 relative">
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered rounded-full w-full"
          value={input}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        />
        {input && <button
          onClick={onClear}
          className={classNames("btn btn-sm btn-circle text-white absolute right-2", {
            'bg-slate-500': !search,
            'bg-sky-500': search,
          })}
          disabled={is_searching}
        >
          {is_searching ? <span className="loading loading-spinner" /> : search ? <IoClose /> : <IoSearchSharp />}
        </button>}
      </div>
    </div>
  )
}

export default Search