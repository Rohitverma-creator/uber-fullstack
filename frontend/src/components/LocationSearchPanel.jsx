import React from "react";

const LocationSearchPanel = ({
  suggestions = [],
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
  setSuggestions,
}) => {
  const handleSuggestionClick = (suggestion) => {
    const value =
      suggestion.name ||
      suggestion.formatted ||
      suggestion.display_name ||
      String(suggestion);

    if (activeField === "pickup") {
      setPickup(value);
    } else if (activeField === "destination") {
      setDestination(value);
    }

    setSuggestions([]);
    // setPanelOpen(false);
  };

  return (
    <div
      className="p-2 sm:p-3 max-h-[180px] sm:max-h-[250px] overflow-y-auto 
                 md:max-w-2xl md:mx-auto md:rounded-xl md:shadow-md"
    >
      {suggestions.length === 0 ? (
        <p className="text-gray-400 pt-9 text-center text-sm sm:text-base">
          No suggestions
        </p>
      ) : (
        suggestions.map((elem, idx) => {
          const displayText =
            elem.name || elem.formatted || elem.display_name || String(elem);

          return (
            <div
              key={idx}
              onClick={() => handleSuggestionClick(elem)}
              className="flex gap-2 sm:gap-4 border border-gray-200 
                         p-2 sm:p-3 rounded-xl items-center 
                         my-1 sm:my-2 cursor-pointer 
                         hover:bg-gray-100 transition"
            >
              <span className="bg-gray-200 h-7 w-7 sm:h-8 sm:w-8 flex items-center justify-center rounded-full">
                <i className="ri-map-pin-fill text-gray-600 text-sm sm:text-base"></i>
              </span>
              <h4 className="font-medium truncate text-sm sm:text-base md:text-lg">
                {displayText}
              </h4>
            </div>
          );
        })
      )}
    </div>
  );
};

export default LocationSearchPanel;
