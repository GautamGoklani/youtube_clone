// A functional component representing a spinner/loading indicator
export default function Spinner() {
  return (
    // Container for the spinner, using Flexbox for alignment
    <div className="flex items-center w-full justify-center py-3">
      {/* Spinner element with specific styling */}
      <div className="w-10 h-10 border-2 border-red-600 border-solid rounded-full animate-spin border-t-transparent"></div>
    </div>
  );
}
