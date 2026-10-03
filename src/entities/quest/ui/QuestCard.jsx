import { Card, Illustration, TimeChip } from '@/shared/ui';
import { langProps } from '@/shared/config';
import { pick } from '@/shared/lib';

/* Quest in the list: Russian title, and the title in the student's language under it. */
export function QuestCard({ quest, nativeLang, meta, status, actions, forYou = false }) {
  return (
    <Card image={<Illustration name={quest.drawing} className="card__image" />}>
      <div className="card__top">
        <span className="card__tag">{forYou ? 'Для вас · ' : ''}Русский {quest.level}</span>
        <TimeChip>≈ {quest.minutes} мин</TimeChip>
      </div>
      <h2 className="card__title">{quest.title.ru}</h2>
      {nativeLang && (
        <p className="card__meta" {...langProps(nativeLang)}>
          {pick(quest.title, nativeLang)}
        </p>
      )}
      <p className="card__text">{quest.about.ru}</p>
      <p className="card__meta">{meta}</p>
      {status && <p className="card__status">{status}</p>}
      {actions}
    </Card>
  );
}
