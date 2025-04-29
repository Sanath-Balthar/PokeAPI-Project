const LoadigGraphic = () => {
  return (
    <div className="text-center mt-10">
      <button
        type="button"
        class="flex items-center bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-amber-300 opacity-75 cursor-not-allowed"
        disabled
      >
        <svg
          class="mr-3 h-5 w-5 animate-spin text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        Loading...
      </button>
    </div>
  );
};

export default LoadigGraphic;
