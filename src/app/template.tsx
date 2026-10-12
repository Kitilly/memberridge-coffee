/**
 * Templates re-mount on every navigation, so this gives each page a quiet
 * fade-in. Pure CSS: it can't delay or block interaction.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
