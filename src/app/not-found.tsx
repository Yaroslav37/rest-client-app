import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFoundPage() {
  const t = useTranslations('NotFound');
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4"
      data-testid="not-found-container"
    >
      <Image
        src="/404.gif"
        alt="Page not found"
        width={150}
        height={150}
        className="mb-6 border-2 border-transparent"
        style={{
          borderImage: 'linear-gradient(to right, #87c232, #3b82f6) 1',
        }}
        priority
      />
      <p className="text-light-green text-[16px] xs:text-[24px] mb-4">{t('not-found')}</p>
      <Link href="/" className="transition-colors text-white hover:text-green hover:underline">
        {t('back')}
      </Link>
    </div>
  );
}
