import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";

// A minimal, dependency-free client-side router. MAHUM's route list is small
// and fixed (Home / About / Services / Projects / Project Details / Contact),
// so a full router package would be an unnecessary dependency — this covers
// path matching, <Link> navigation, and scroll-to-top on route change.

const RouterContext = createContext(null);

function normalize(path) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() => normalize(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPath(normalize(window.location.pathname));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = useCallback((to) => {
    const next = normalize(to);
    if (next !== normalize(window.location.pathname)) {
      window.history.pushState({}, "", next);
      setPath(next);
    }
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

export function useLocation() {
  return useRouter().path;
}

export function useNavigate() {
  return useRouter().navigate;
}

export function useParams(pattern) {
  const { path } = useRouter();
  return useMemo(() => matchPattern(pattern, path)?.params ?? {}, [pattern, path]);
}

function matchPattern(pattern, path) {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);
  if (patternParts.length !== pathParts.length) return null;

  const params = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pp = patternParts[i];
    const ap = pathParts[i];
    if (pp.startsWith(":")) {
      params[pp.slice(1)] = decodeURIComponent(ap);
    } else if (pp !== ap) {
      return null;
    }
  }
  return { params };
}

export function Route({ path: pattern, children }) {
  const location = useLocation();
  const match = matchPattern(pattern, location);
  if (!match) return null;
  return children;
}

export function Switch({ children }) {
  const location = useLocation();
  const routes = Array.isArray(children) ? children : [children];

  for (const route of routes) {
    if (!route) continue;
    const pattern = route.props.path;
    if (pattern === undefined) return route; // fallback / catch-all
    if (matchPattern(pattern, location)) return route;
  }
  return null;
}

export function Link({ to, children, className, onClick, ...rest }) {
  const navigate = useNavigate();
  const handleClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };
  return (
    <a href={to} className={className} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}

export function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  return null;
}
