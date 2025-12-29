const Footer = () => {
  return (
    <footer className="mt-16 py-10 text-center">
      <div className="space-y-3">
        <div className="text-lg font-bold text-foreground">
          صُنع بحب في فيفاء 🤍
        </div>
        <div className="text-sm text-muted-foreground">
          مطور الموقع:{" "}
          <a
            href="https://instagram.com/wu3x"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary hover:underline transition-all duration-300"
          >
            wu3x
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;