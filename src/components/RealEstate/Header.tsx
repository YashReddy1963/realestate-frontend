import { Building2 } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border py-6 px-4 md:px-6 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-primary p-2 rounded-lg">
            <Building2 className="text-primary-foreground" size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-primary">
            Real Estate Analysis Assistant
          </h1>
        </div>
        <p className="text-muted-foreground text-sm md:text-base ml-14">
          Ask any locality-based query and view your insights instantly.
        </p>
      </div>
    </header>
  );
};

export default Header;
