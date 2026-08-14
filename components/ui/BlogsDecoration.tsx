const BlogsDecoration = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 select-none overflow-hidden">
      {/* Desktop right glow */}
      <div className="hidden 2xl:block absolute top-24 -right-24 w-[34rem] h-[34rem]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-l from-primary-100/40 via-primary-50/20 to-transparent blur-3xl" />
        <div className="absolute top-14 right-20 w-24 h-24 rounded-full bg-primary-400/10 blur-2xl" />

        <div className="absolute top-28 right-28 grid grid-cols-4 gap-4 opacity-35">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary-400/70" />
          ))}
        </div>
      </div>

      {/* Desktop left glow */}
      <div className="hidden xl:block absolute bottom-16 -left-28 w-[28rem] h-[28rem]">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-secondary-100/40 via-primary-50/15 to-transparent blur-3xl" />
        <div className="absolute bottom-24 left-16 w-28 h-28 rounded-full bg-primary-500/10 blur-2xl" />

        <div className="absolute bottom-40 left-20 grid grid-cols-3 gap-4 opacity-25 -rotate-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-primary-500/70" />
          ))}
        </div>
      </div>

      {/* Soft center accent */}
      <div className="hidden lg:block absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-50/25 blur-3xl" />

      {/* Mobile decoration */}
      <div className="lg:hidden absolute inset-0">
        <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-primary-50/60 blur-3xl" />
        <div className="absolute top-40 -left-20 w-64 h-64 rounded-full bg-secondary-50/60 blur-3xl" />
        <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-72 h-72 rounded-full bg-primary-100/20 blur-3xl" />
      </div>
    </div>
  );
};

export default BlogsDecoration;
