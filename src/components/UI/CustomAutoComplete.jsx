import React, { forwardRef, useEffect, useRef, useState } from "react";

const CustomAutoComplete = forwardRef(
    (
        {
            value,
            placeholder,
            fetchSuggestions,
            suggestions = [],
            loading,
            onChange,
            onSelect,
            itemTemplate,
            displayField = "label",
            name,
            onClick,
            className = "",
        },
        ref
    ) => {
        const [query, setQuery] = useState(value || "");
        const [show, setShow] = useState(false);
        const [activeIndex, setActiveIndex] = useState(-1);
        const isSelectingRef = useRef(false);
        const isUserTypingRef = useRef(false);

        const wrapperRef = useRef(null);
        const listRef = useRef(null);
        const forceOpenRef = useRef(false);

        const selectItem = (item) => {
            isUserTypingRef.current = false; // 🔒 prevent effect
            isSelectingRef.current = true;

            setQuery(item.label);
            onSelect?.(item);

            setShow(false);
            setActiveIndex(-1);
        };

        useEffect(() => {
            isUserTypingRef.current = false; // 🔒 important
            setQuery(value || "");
        }, [value]);

        useEffect(() => {
            // ❌ ignore programmatic updates
            if (!isUserTypingRef.current) return;

            const safeQuery = typeof query === "string" ? query.trim() : "";

            if (safeQuery) {
                fetchSuggestions?.(safeQuery);
                setShow(true);
                setActiveIndex(-1);
            } else {
                setShow(false);
            }

            // reset after handling
            isUserTypingRef.current = false;
        }, [query]);
        // Close on outside click
        useEffect(() => {
            const handleClickOutside = (e) => {
                if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                    setShow(false);
                    setActiveIndex(-1);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () =>
                document.removeEventListener("mousedown", handleClickOutside);
        }, []);

        // Scroll active item into view
        useEffect(() => {
            if (listRef.current && activeIndex >= 0) {
                const el = listRef.current.children[activeIndex];
                el?.scrollIntoView({ block: "nearest" });
            }
        }, [activeIndex]);

        const getDisplayValue = (item) =>
            typeof item === "object" ? item?.[displayField] : item;

        const handleKeyDown = (e) => {
            if (!show || suggestions.length === 0) return;

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setActiveIndex((prev) =>
                        prev < suggestions.length - 1 ? prev + 1 : 0
                    );
                    break;

                case "ArrowUp":
                    e.preventDefault();
                    setActiveIndex((prev) =>
                        prev > 0 ? prev - 1 : suggestions.length - 1
                    );
                    break;

                case "Enter":
                    if (activeIndex >= 0) {
                        e.preventDefault();
                        selectItem(suggestions[activeIndex]);
                    }
                    break;

                case "Escape":
                    setShow(false);
                    setActiveIndex(-1);
                    break;

                default:
                    break;
            }
        };

        const toggleDropdown = () => {
            forceOpenRef.current = true;

            if (show) {
                setShow(false);
                setActiveIndex(-1);
                return;
            }

            // safe call with string
            fetchSuggestions?.(query || "");
            setShow(true);
        };


        return (
            <div ref={wrapperRef} className="relative w-full">
                <div className={` flex items-center justify-between ${className}`}>
                    <input
                        ref={ref}
                        name={name}
                        value={query}
                        placeholder={placeholder}
                        onClick={onClick}
                        onChange={(e) => {
                            isUserTypingRef.current = true; // ✅ user typed
                            setQuery(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                        className="w-full outline-none bg-transparent"
                        autoComplete="off"
                        onFocus={() => {
                            forceOpenRef.current = true;
                            fetchSuggestions?.(query || "");
                            setShow(true);
                        }}
                    />
                    <span
                        className="icon-arrow-down cursor-pointer"
                        onMouseDown={(e) => e.preventDefault()} // prevent blur
                        onClick={toggleDropdown}
                    />                </div>


                {loading && (
                    <div className="absolute right-2 top-2 text-xs">
                        Loading...
                    </div>
                )}

                {show && suggestions.length > 0 && (
                    <ul
                        ref={listRef}
                        className="absolute z-20 w-full bg-white border rounded shadow max-h-60 overflow-x-auto"
                    >
                        {suggestions.map((item, index) => (
                            <li
                                key={index}
                                className={`px-3 py-2 cursor-pointer text-14 text-g1 text-left word-break ${index === activeIndex ? "bg-gray-200" : "hover:bg-gray-200"}`}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseDown={(e) => e.preventDefault()} // prevent blur
                                onClick={() => selectItem(item)}
                            >
                                {itemTemplate
                                    ? itemTemplate(item)
                                    : getDisplayValue(item)}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    }
);

export default CustomAutoComplete;
