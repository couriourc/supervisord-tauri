import {getStore} from "$lib/store/index";
import {loadTranslations, locale, locales} from "$i18n/index";

export class SettingsModel {
    static Namespace: string = "settings";

    locale: string = "zh";
    #inited = false;

    constructor() {
        this.initSettings();
    }

    async initSettings() {
        if (this.#inited) return;
        this.#inited = true;
        const store = await getStore();
        Object.assign(this, await store.get<SettingsModel>(SettingsModel.Namespace));
        console.log(this.locale)
        await this.setLocale(this.locale);
    }

    async setLocale(_locale: string) {
        loadTranslations(_locale);
        locale.set(_locale);
        const store = await getStore();
        this.locale = _locale;
        await store.set(SettingsModel.Namespace, this);
        await store.save();
    }
}
