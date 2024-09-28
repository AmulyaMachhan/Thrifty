import NavLinks from "./NavLinks";

function BottomNav() {
  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-[1000] bg-black flex justify-around items-center py-4 shadow-lg border-t border-gray-700">
      <NavLinks />
    </div>
  );
}

export default BottomNav;
