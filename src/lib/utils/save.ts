import {save} from '@tauri-apps/plugin-dialog';

import {downloadDir} from '@tauri-apps/api/path';
import {writeFile, readFile} from "@tauri-apps/plugin-fs";
import toasts from "svelte-french-toast";
import {open} from '@tauri-apps/plugin-dialog';


export const saveFile = async (filename: string, content: string) => {
    // Save into the default downloads directory, like in the browser
    const filePath = await save({
        defaultPath: (await downloadDir()) + "/" + filename,
        filters: [
            {
                name: filename,
                extensions: [filename.split(".").pop() || "txt"],
            }
        ]
    });
    if (!filePath) {
        return toasts.error("Failed to save file");
    }

    // Now write the file to the disk
    await writeFile(filePath, Uint8Array.from(Array.from(content).map(letter => letter.charCodeAt(0))));
};
export const importFile = async () => {
    // Open a dialog
    const file = await open({
        multiple: false,
        directory: false,
    });
    return new TextDecoder("utf-8").decode(await readFile(file!));
};
