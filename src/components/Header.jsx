export default function Header({ pageTitle }) {
  return (
    <header className="bg-[#1c1c1e] px-4 lg:px-8 py-2 lg:py-4 flex items-center justify-between border-b border-[#2c2c2e]">
      {/* Mobile: Logo */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="w-[38px] h-[38px] bg-[#e8362a] rounded-[10px] flex items-center justify-center text-lg">
          🍽️
        </div>
        <span className="text-xl font-bold tracking-tight">HeyMozo</span>
      </div>

      {/* Desktop: Page title */}
      <h1 className="hidden lg:block text-2xl font-bold tracking-tight">
        {pageTitle}
      </h1>

      {/* Sector selector */}
      <button
        type="button"
        className="bg-transparent border-[1.5px] border-[#555] text-white px-3 py-[7px] rounded-lg text-[13px] font-medium flex items-center gap-1.5 cursor-pointer"
      >
        Select Sector
        <span className="text-[11px] text-[#aaa]">▾</span>
      </button>
    </header>
  );
}
