import { FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  summary: string;
}

const SummaryCard = ({ summary }: SummaryCardProps) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow border-2 border-border">
      <CardHeader className="bg-accent/10 border-b border-border">
        <CardTitle className="flex items-center gap-2 text-primary">
          <FileText size={24} />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-foreground leading-relaxed whitespace-pre-line">
          {summary}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
