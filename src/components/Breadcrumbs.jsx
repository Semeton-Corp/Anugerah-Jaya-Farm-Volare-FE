// components/Breadcrumbs.jsx
import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { breadcrumbMap } from "../data/BreadcrumbMap";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter(Boolean);

  const trimmedPathnames = pathnames.slice(2); // 👉 Start from index 2
  const basePath = pathnames.slice(0, 2); // Keep the base for full URL reconstruction

  const buildPath = (index) =>
    "/" + [...basePath, ...trimmedPathnames.slice(0, index + 1)].join("/");

  return (
    <nav className="text-sm px-4 text-gray-600 py-2" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        {trimmedPathnames.map((segment, index) => {
          const fullPath = buildPath(index);
          const label = breadcrumbMap[segment] || segment;
          const isLast = index === trimmedPathnames.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
              )}
              {isLast ? (
                <span className="font-medium text-gray-800">{label}</span>
              ) : (
                <Link to={fullPath} className="text-blue-600 hover:underline">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
