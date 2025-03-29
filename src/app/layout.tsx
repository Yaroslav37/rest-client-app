import '@/styles/globals.css';

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

import { Header } from '@/components';
import Footer from '@/components/layout/Footer/Footer';
import { AuthProvider } from '@/context/authContext';
import { inter, montserrat, openSans } from '@/utils/fonts';

export const metadata: Metadata = {
  title: 'Rest Client API | RS School',
  description:
    'Rest Client API helps developers test and send HTTP requests, analyze responses, and streamline API development',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className={`${openSans.variable} ${montserrat.variable} ${inter.variable}`}>
        <AuthProvider>
          <NextIntlClientProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
