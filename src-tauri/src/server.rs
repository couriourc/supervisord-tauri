use std::path::PathBuf;
use std::sync::Mutex;
use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use lazy_static::lazy_static;
use tauri::async_runtime::JoinHandle;
use actix_web::{Result};
use actix_files::Files;
struct Server {
    port: u16,
    server_handler: Option<JoinHandle<std::io::Result<()>>>,
}

lazy_static! {
    static ref g_server: Mutex<Server> = Mutex::new(Server{port: 80,server_handler:None});
}



impl Server {
    fn start_server(&mut self) {
        let handler = Some(tauri::async_runtime::spawn(
            HttpServer::new(|| {
                App::new()
                    .service(ping)
                    // We allow the visitor to see an index of the resources at `/`.
                    .service(Files::new("/", "resources/").show_files_listing())
            }).bind(("127.0.0.1", self.port)).unwrap().run()
        ));
        self.server_handler = handler;
    }
    fn end_server(&mut self) {
        if self.server_handler.is_some() {
            self.server_handler.as_mut().unwrap().abort();
            self.server_handler = None;
        }
    }
}

#[get("/ping")]
async fn ping() -> impl Responder {
    HttpResponse::Ok().body("pong!")
}
#[tauri::command]
pub fn start_server(port: u16) -> bool {
    let mut server = g_server.lock().unwrap();
    if server.server_handler.is_some() {
        return false;
    }
    server.port = port;
    server.start_server();
    true
}
#[tauri::command]
pub fn end_server() {
    g_server.clear_poison();
    let mut server = g_server.lock().unwrap();
    server.end_server();
}