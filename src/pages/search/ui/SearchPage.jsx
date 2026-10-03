import { PageHeader } from '@/shared/ui';
import { SearchField } from '@/features/search-collection';
import { SearchResults } from '@/widgets/search-results';

/* "Search": the field sticks to the top, results below. */
export function SearchPage() {
  return (
    <>
      <PageHeader title="Поиск" sticky>
        <SearchField />
      </PageHeader>
      <SearchResults />
    </>
  );
}
