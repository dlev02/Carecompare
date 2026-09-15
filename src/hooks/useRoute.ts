import { useEffect, useState } from 'react';

export type Route = 'home' | 'faq' | 'about';

const routeFor = (pathname: string): Route => {
    const path = pathname.replace(/\/+$/, '');
    if (path === '/faq') return 'faq';
    if (path === '/about') return 'about';
    return 'home';
};

/** Push a new in-app path and let every `useRoute` subscriber re-render. */
export function navigate(href: string) {
    window.history.pushState(null, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
}

/** Client-side router for the calculator at `/`, the FAQ at `/faq` and About at `/about`. */
export function useRoute(): Route {
    const [route, setRoute] = useState<Route>(() =>
        routeFor(window.location.pathname)
    );
    useEffect(() => {
        const onChange = () => setRoute(routeFor(window.location.pathname));
        window.addEventListener('popstate', onChange);
        return () => window.removeEventListener('popstate', onChange);
    }, []);
    return route;
}
