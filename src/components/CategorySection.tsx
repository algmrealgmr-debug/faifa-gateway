import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CategorySectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const CategorySection = ({ id, title, icon, children }: CategorySectionProps) => {
  return (
    <section id={id} className="scroll-mt-20">
      <Card className="shadow-card border-0 overflow-hidden">
        <CardHeader className="bg-gradient-card text-center py-8">
          <div className="flex items-center justify-center gap-4 text-secondary-foreground">
            <div className="text-3xl">{icon}</div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="grid gap-6">
            {children}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default CategorySection;