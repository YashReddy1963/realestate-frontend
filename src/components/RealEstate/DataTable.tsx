import { Table } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DataTableProps {
  data: any[];
  columns: string[];
}

const DataTable = ({ data, columns }: DataTableProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow border-2 border-border">
      <CardHeader className="bg-accent/10 border-b border-border">
        <CardTitle className="flex items-center gap-2 text-primary">
          <Table size={24} />
          Filtered Data
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <ScrollArea className="h-[400px] w-full rounded-md border border-border">
          <UITable>
            <TableHeader>
              <TableRow className="bg-accent/20 hover:bg-accent/30">
                {columns.map((column) => (
                  <TableHead key={column} className="font-bold text-primary">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="hover:bg-accent/10 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell key={column} className="text-foreground">
                      {row[column]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </UITable>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DataTable;
