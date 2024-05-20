"use client";
import useDebounce from '@/hooks/debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type SearchbarProps = {
    onSearch?: (query: string) => void,
};

export default function Searchbar(props: SearchbarProps) {
    const onSearch = useDebounce((value: string) => {
        if (props.onSearch) props.onSearch(value);
    }, 1000);

    return (
        <div className="flex justify-center mt-8 mb-4 relative w-2/3 m-auto">
            <MagnifyingGlassIcon className="size-7 left-3 absolute h-full" />
            <input
                type="search"
                placeholder="Enter repository name or url"
                className="w-full py-4 pr-4 pl-12 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={e => onSearch(e.target.value)}
            />
        </div>
    )
};
