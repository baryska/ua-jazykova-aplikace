import React, { useRef } from 'react';
import Image from 'next/image';
import PlayIcon from '../../public/icons/play-kids.svg';
import { useTranslation, Trans } from 'next-i18next';
import FlagCZIcon from '../../public/icons/cz.svg';
import FlagUAIcon from '../../public/icons/ua.svg';

export interface Translation {
  cz_translation: string;
  ua_translation: string;
  ua_transcription: string;
  cz_transcription: string;
}

interface TranslationContainerProps extends Translation {
  searchText?: string;
  setAudioIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  audioIsPlaying: boolean;
  image: string;
}

export const KidsTranslationsContainer = ({
  cz_translation,
  ua_translation,
  ua_transcription,
  cz_transcription,
  image,
  setAudioIsPlaying,
  audioIsPlaying,
}: TranslationContainerProps): JSX.Element => {
  const { t } = useTranslation();

  const player = useRef<HTMLAudioElement>();

  const handleTranslationAudioPlay = (language: string, text: string) => {
    const source = `https://translate.google.com/translate_tts?tl=${language}&q=${encodeURIComponent(text)}&client=tw-ob`;
    const audio = new Audio(source);
    player.current = audio;
    audio.onended = () => {
      setAudioIsPlaying(false);
    };
    audio.play();
    setAudioIsPlaying(true);
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-xl w-72 m-5 md:m-8 bg-primary-yellow max-h-[32rem]">
      <div className="w-72 h-72 relative bg-white">
        <Image src={`/${image}.svg`} layout="fill" sizes="100%" objectFit="cover" alt={cz_translation} />
      </div>
      <div className="px-6 py-4 ">
        <div className="flex justify-between items-center py-2 ">
          <div className="w-full">
            <div className="flex">
              <FlagCZIcon width="30px" className="mr-3 shadow" />
              <p>
                <Trans className="block my-2">{t('dictionary_page.czech')}</Trans>
              </p>
            </div>
            <p className="self-start w-full font-semibold">{cz_translation}</p>
            <p className="text-gray-500">{cz_transcription}</p>
          </div>
          <button onClick={() => (audioIsPlaying ? {} : handleTranslationAudioPlay('cs', cz_translation))} aria-label="play">
            <PlayIcon className="cursor-pointer active:scale-75 transition-all duration-300" />
          </button>
        </div>
        <div className="flex justify-between self-center  py-2 items-center ">
          <div className="w-full pr-4">
            <div className="flex">
              <FlagUAIcon width="30px" className="mr-3 shadow" />
              <p>
                <Trans className="block my-2">{t('dictionary_page.ukrainian')}</Trans>
              </p>
            </div>
            <p className="w-full font-semibold">{ua_translation}</p>
            <p className="text-gray-500">{ua_transcription}</p>
          </div>
          <button onClick={() => (audioIsPlaying ? {} : handleTranslationAudioPlay('uk', ua_translation))} aria-label="play">
            <PlayIcon className="cursor-pointer active:scale-75 transition-all duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};
