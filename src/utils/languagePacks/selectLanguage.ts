import {getLocalStorageLanguage} from '../localStorage';
import {default as EN} from './en.json';
import {default as PL} from './pl.json';

export const language = (lng: string) => {
  switch (lng) {
    case 'pl':
      return PL;
    case 'en':
      return EN;

    default:
      return EN;
  }
};
