import { Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface DownloadButtonProps {
  data: any[];
  filename?: string;
}

const DownloadButton = ({ data, filename = "real-estate-data" }: DownloadButtonProps) => {
  const downloadCSV = () => {
    if (data.length === 0) {
      toast.error("No data available to download");
      return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers.map((header) => `"${row[header]}"`).join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();

    toast.success("CSV file downloaded successfully!");
  };

  const downloadExcel = () => {
    // Mock Excel download - in production, use a library like xlsx
    toast.info("Excel download functionality coming soon!");
  };

  return (
    <div className="flex justify-center mt-6">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-8"
          >
            <Download className="mr-2" size={20} />
            Download Data
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          <DropdownMenuItem onClick={downloadCSV} className="cursor-pointer">
            <FileSpreadsheet className="mr-2" size={18} />
            Download as CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={downloadExcel} className="cursor-pointer">
            <FileSpreadsheet className="mr-2" size={18} />
            Download as Excel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DownloadButton;
