import { Navbar } from "@nextui-org/react";

const Brand = () => {
  return (
    <header className="p-4 bg-black">
      <Navbar variant="static" className="container mx-auto">
        <div className="flex justify-center items-center w-full">
          <span className="text-white text-4xl font-abril font-semibold">
            thrifty!
          </span>
        </div>
      </Navbar>
    </header>
  );
};

export default Brand;
