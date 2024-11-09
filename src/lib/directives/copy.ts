import type {Action} from "svelte/action";
import {writeText} from "@tauri-apps/plugin-clipboard-manager";
import toast from "svelte-french-toast";

export const copy: Action<HTMLElement, string> = (node, content: string) => {
    let _content: string | null = content;
    const startCopy = async () => {
        console.log(_content);
        if (!_content) _content = "";
        await writeText(_content!);
        toast.success("复制成功！！");
    };
    console.log(node);
    node.addEventListener("click", startCopy, true);

    return {
        update(content) {
            _content = content;
            node.removeEventListener("click", startCopy, true);
            node.addEventListener("click", startCopy, true);
        },
        destroy() {
            _content = null;
            node.removeEventListener("click", startCopy);
        }
    };
};
