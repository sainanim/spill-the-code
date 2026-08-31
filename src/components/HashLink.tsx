"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

// Scrolls to a section of the current page and puts its hash in the address
// bar. Returns false when no such section is on this page, so callers can fall
// back to a real navigation.
export function scrollToHash(hash: string) {
  const target = document.getElementById(hash);
  if (!target) return false;

  // Next patches history.replaceState, so this also keeps the router's own idea
  // of the current URL in sync instead of letting it drift from the address bar.
  window.history.replaceState(null, "", `#${hash}`);

  // The mobile menu closes on this same click and the sticky header republishes
  // its height from a ResizeObserver, which runs after requestAnimationFrame
  // callbacks. Waiting two frames lets both land first, so the scroll lines up
  // with the collapsed header instead of the expanded one.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => target.scrollIntoView());
  });

  return true;
}

// A Link that also works when the URL already carries the hash it points at.
// The App Router only scrolls for a same-page navigation when the hash actually
// changes, so clicking "Contact Us" a second time — after scrolling away, with
// #contact-us still in the URL — is a silent no-op. Here the scroll is ours.
const HashLink = ({ href, onClick, ...props }: HashLinkProps) => {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    const [path, hash] = href.split("#");
    if (!hash || event.defaultPrevented) return;
    // Leave new-tab / new-window clicks to the browser.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Pointing at another page: an ordinary navigation lands on the section.
    if ((path || pathname) !== pathname) return;

    if (scrollToHash(hash)) event.preventDefault();
  };

  return <Link href={href} onClick={handleClick} {...props} />;
};

export default HashLink;
