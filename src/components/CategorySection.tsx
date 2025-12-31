interface CategorySectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const CategorySection = ({ id, title, icon, children }: CategorySectionProps) => {
  return (
    <section id={id} className="scroll-mt-20 py-12">
      <div className="flex items-center justify-center gap-3 mb-10">
        <div className="text-primary text-2xl">{icon}</div>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground tracking-tight">{title}</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
    </section>
  );
};

export default CategorySection;