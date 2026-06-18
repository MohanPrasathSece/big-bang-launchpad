export default function WhatsAppButton() {
  const phone = "918668274952"; // +91 86682 74952
  const message = encodeURIComponent("Hi, I'd like to know more about Big Bang Tech Solutions.");
  const href = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
    >
      {/* WhatsApp SVG icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width="30"
        height="30"
        fill="white"
        aria-hidden="true"
      >
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.489-2.001A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.25a13.21 13.21 0 0 1-6.738-1.847l-.483-.287-4.998 1.178 1.234-4.86-.314-.498A13.193 13.193 0 0 1 2.75 16C2.75 8.682 8.682 2.75 16 2.75S29.25 8.682 29.25 16 23.318 29.25 16 29.25zm7.22-9.822c-.396-.198-2.343-1.156-2.707-1.287-.363-.132-.627-.198-.891.198-.264.396-1.023 1.287-1.254 1.551-.23.264-.462.297-.858.099-.396-.198-1.672-.616-3.184-1.965-1.177-1.05-1.972-2.346-2.203-2.742-.23-.396-.025-.61.173-.807.178-.177.396-.462.594-.693.198-.231.264-.396.396-.66.132-.264.066-.495-.033-.693-.099-.198-.891-2.145-1.221-2.937-.321-.771-.648-.667-.891-.679l-.759-.013c-.264 0-.693.099-.1056.495-.363.396-1.386 1.354-1.386 3.3 0 1.947 1.419 3.828 1.617 4.092.198.264 2.793 4.263 6.766 5.979.946.408 1.683.652 2.258.835.949.302 1.813.26 2.495.158.761-.114 2.343-.957 2.673-1.882.33-.924.33-1.717.231-1.882-.099-.165-.363-.264-.759-.462z" />
      </svg>

      {/* Pulse ring */}
      <span
        className="absolute inline-flex w-full h-full rounded-full opacity-50 animate-ping"
        style={{ backgroundColor: "#25D366" }}
      />
    </a>
  );
}
