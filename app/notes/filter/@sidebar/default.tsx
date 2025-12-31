import Link from "next/link";
import css from "./Sidebar.module.css";

const SidebarDefault = () => {
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <nav className={css.sidebarNav}>
      <Link href="/notes/filter/all" className={css.navItem}>
        All notes
      </Link>

      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/notes/filter/${tag.toLowerCase()}`}
          className={css.navItem}
        >
          {tag}
        </Link>
      ))}
    </nav>
  );
};

export default SidebarDefault;
