export default function StandardBadge({ children = "Standards" }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-[15px] font-semibold text-softInk shadow-sm">
      <span className="relative inline-flex h-3.5 w-6 items-center">
        <span className="absolute left-0 h-[5px] w-3.5 rotate-[-35deg] rounded-full bg-renew" />
        <span className="absolute left-2.5 h-[5px] w-4 rotate-[-50deg] rounded-full bg-renew" />
      </span>
      {children}
    </span>
  );
}
