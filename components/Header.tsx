import { ComputerIcon, PawPrintIcon } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 bg-white right-0 border-b z-20 h-14 flex items-center justify-between px-4">
      <div className="flex text-primary gap-2 items-center">
        <ComputerIcon size={16} />
        YuemIT
      </div>
      <div className="flex items-center gap-2">{/* <ThemeToggle /> */}</div>
    </header>
  );
};

export default Header;
