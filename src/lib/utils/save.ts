import {save} from '@tauri-apps/plugin-dialog';

import {downloadDir} from '@tauri-apps/api/path';
import {writeFile} from "@tauri-apps/plugin-fs";

export const saveFile = async (filename: string, content: string) => {
    // Save into the default downloads directory, like in the browser
    const filePath = await save({
        defaultPath: (await downloadDir()) + "/" + filename,
    });
    if (!filePath) throw new Error("invalid file path");
    // Now write the file to the disk
    await writeFile(filePath, Uint8Array.from(Array.from(content).map(letter => letter.charCodeAt(0))));
};
