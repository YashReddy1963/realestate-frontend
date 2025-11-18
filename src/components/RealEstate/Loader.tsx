import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="animate-spin text-primary mb-4" size={48} />
      <p className="text-muted-foreground text-lg">Analyzing your query...</p>
    </div>
  );
};

export default Loader;
