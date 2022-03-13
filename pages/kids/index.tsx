import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import React, { useState } from 'react';
import kidsWords from '../../data/translations/pro-deti.json';
import { KidsTranslationsContainer } from '../../components/basecomponents/KidsTranslationsContainer';
export { getStaticProps } from '../../utils/localization';

const Dictionary = () => {
  const [audioIsPlaying, setAudioIsPlaying] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-[#fdf6d2] to-[#99bde4]">
      <Head>
        <meta name="referrer" content="no-referrer" />
        <title>{t('seo.dictionary_page_title')}</title>
        <meta name="description" content={t('seo.dictionary_page_description')} />
        <meta name="twitter:title" content={t('seo.dictionary_page_title')} />
      </Head>
      <div className="flex flex-wrap justify-center min-h-screen m-auto sm:py-10 px-2 sm:px-4">
        {kidsWords.map((word, index) => {
          return <KidsTranslationsContainer key={index} {...word} setAudioIsPlaying={setAudioIsPlaying} audioIsPlaying={audioIsPlaying} />;
        })}
      </div>
    </div>
  );
};

export default Dictionary;
