use std::net::IpAddr;
use local_ip_address::local_ip;
use local_ip_address::list_afinet_netifas;


#[tauri::command]
pub fn get_my_ip() -> IpAddr {
    let network_interface = local_ip().unwrap();

    network_interface
}

#[tauri::command]
pub fn list_network_interfaces() -> Vec<(String, IpAddr)> {
    let network_interfaces = list_afinet_netifas().unwrap();
    network_interfaces
}