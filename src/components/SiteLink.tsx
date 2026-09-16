import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { navigate } from '../hooks/useRoute';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Anchor for in-app pages. Plain left-clicks switch pages without a reload;
 * modified clicks, same-page hash links and external URLs keep native behavior.
 */
export function SiteLink({ href, onClick, ...rest }: Props) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        )
            return;
        const [path, hash] = href.split('#');
        if (path === window.location.pathname) return;
        event.preventDefault();
        navigate(href);
        // The new page has rendered by the next frame; land on its anchor or its top.
        requestAnimationFrame(() => {
            const target = hash ? document.getElementById(hash) : null;
            if (target) target.scrollIntoView();
            else window.scrollTo({ top: 0 });
        });
    };
    return <a href={href} onClick={handleClick} {...rest} />;
}
