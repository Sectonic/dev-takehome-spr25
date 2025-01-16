"use client";

import { RequestStatus } from "@/lib/types/request";
import { useState, useEffect, useRef } from "react";
import Item from "./Item";

export default function Dropdown({ disabled, editRequests } : { disabled: boolean, editRequests: (newStatus: string) => Promise<void> }) {
    const [showList, setShowList] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowList(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex justify-between items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm w-[150px] px-3 py-1.5 whitespace-nowrap"
                type="button"
                onClick={() => setShowList((prev) => !prev)}
                disabled={disabled}
            >
                Status
                <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {showList && (
                <div className="absolute m-0 translate-y-1 inset-auto z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow">
                    <ul
                        className="p-3 space-y-1 text-sm text-gray-700"
                        aria-labelledby="dropdownRadioButton"
                    >
                        {Object.values(RequestStatus).map((status, idx) => (
                            <li key={idx}>
                                <div className="pl-1 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
                                    <Item status={status} editRequests={editRequests} setShowList={setShowList} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}