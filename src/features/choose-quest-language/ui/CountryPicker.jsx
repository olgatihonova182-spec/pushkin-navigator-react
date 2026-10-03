import { Chip, ChipGroup } from '@/shared/ui';
import { COUNTRIES, OTHER_COUNTRY, langProps } from '@/shared/config';
import { useQuestStore } from '@/entities/quest';

/* Where the student comes from: each listed country has its own quest. Names are bilingual. */
export function CountryPicker() {
  const country = useQuestStore((s) => s.country);
  const setCountry = useQuestStore((s) => s.setCountry);
  return (
    <ChipGroup label="Ваша страна · Your country">
      {COUNTRIES.map((c) => (
        <Chip key={c.id} selected={country === c.id} onClick={() => setCountry(c.id)}>
          <span>{c.name} · <span {...langProps(c.lang)}>{c.native}</span></span>
        </Chip>
      ))}
      <Chip selected={country === OTHER_COUNTRY} onClick={() => setCountry(OTHER_COUNTRY)}>
        Другая страна · Other
      </Chip>
    </ChipGroup>
  );
}
