mod network;
mod server;

use tauri::Manager;
use tokio::sync::mpsc;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let (async_proc_input_tx, async_proc_input_rx) = mpsc::channel::<String>(1);
    let (async_proc_output_tx, mut async_proc_output_rx) = mpsc::channel::<String>(1);


    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_sql::Builder::new().build())
        .plugin(tauri_plugin_store::Builder::new().build())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            network::get_my_ip,
            network::list_network_interfaces,
            server::start_server,
            server::end_server,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
// A function that sends a message from Rust to JavaScript via a Tauri Event
fn rs2js<R: tauri::Runtime>(_message: String, manager: &impl Manager<R>) {}
