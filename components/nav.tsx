import Link from "next/link";

const navItems = {
  "/": {
    name: "首页",
  },
  "/blog": {
    name: "文章",
  },
  "/tags": {
    name: "标签",
  },
  "/projects": {
    name: "项目",
  },
  "/archives": {
    name: "归档",
  },
  "/about": {
    name: "关于",
  },
};

export function Navbar() {
  return (
    <aside className="mb-16 -ml-[8px] tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="fade relative flex scroll-pr-6 flex-row items-start px-0 pb-0 md:relative md:overflow-auto"
          id="nav"
        >
          <div className="flex flex-row space-x-0 pr-10">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="relative m-1 flex px-2 py-1 align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200"
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
}
