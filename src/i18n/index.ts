import i18n from 'sveltekit-i18n';
import type {Config} from "sveltekit-i18n";
import en from "./en";
import zh from "./zh";
import lang from "./lang.json";

const config: Config = ({
    initLocale: 'zh',
    translations: {
        en: {
            ...en,
            lang
        },
        zh: {
            ...zh,
            lang
        }
    }
});
export const {t, locale, locales, loading, loadTranslations} = new i18n(config);

