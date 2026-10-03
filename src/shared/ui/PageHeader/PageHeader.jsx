import './PageHeader.css';

/* Top app bar: overline, headline and whatever the page puts under it. */
export function PageHeader({ title, sticky = false, className = '', children }) {
  const classes = ['page-header', sticky && 'page-header--sticky', className].filter(Boolean).join(' ');
  return (
    <header className={classes}>
      <div>
        <div className="page-header__overline">Пушкинский музей</div>
        <h1 className="t-headline-m">{title}</h1>
      </div>
      {children}
    </header>
  );
}
