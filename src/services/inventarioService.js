const mockEquipos = [
  { id: 1, codigo: "TI-PC-00001", tipo: "Computador", marca: "Dell", modelo: "OptiPlex 7090", serial: "DL7090ABC001", procesador: "Intel Core i7-11700", ram: "16 GB", almacenamiento: "512 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-01-15", fechaGarantia: "2027-01-15", proveedor: "Dell Colombia", costo: 3200000, estado: "Activo", usuarioId: 1, area: "Sistemas", ubicacion: "Oficina Principal - Piso 2", observaciones: "Equipo de desarrollo" },
  { id: 2, codigo: "TI-PC-00002", tipo: "Computador", marca: "Dell", modelo: "OptiPlex 5090", serial: "DL5090ABC002", procesador: "Intel Core i5-11500", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-02-20", fechaGarantia: "2027-02-20", proveedor: "Dell Colombia", costo: 2400000, estado: "Activo", usuarioId: 2, area: "Contabilidad", ubicacion: "Oficina Principal - Piso 1", observaciones: "" },
  { id: 3, codigo: "TI-PC-00003", tipo: "Computador", marca: "HP", modelo: "ProDesk 400 G8", serial: "HP400G8ABC003", procesador: "Intel Core i5-11500", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-03-10", fechaGarantia: "2027-03-10", proveedor: "HP Colombia", costo: 2200000, estado: "Activo", usuarioId: 3, area: "Recursos Humanos", ubicacion: "Oficina Principal - Piso 1", observaciones: "" },
  { id: 4, codigo: "TI-PC-00004", tipo: "Computador", marca: "Lenovo", modelo: "ThinkCentre M70s", serial: "LNM70SABC004", procesador: "Intel Core i3-10100", ram: "4 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2023-06-15", fechaGarantia: "2026-06-15", proveedor: "Lenovo Colombia", costo: 1800000, estado: "Disponible", usuarioId: null, area: "", ubicacion: "Almacén de TI", observaciones: "Disponible para asignar" },
  { id: 5, codigo: "TI-PC-00005", tipo: "Computador", marca: "Dell", modelo: "OptiPlex 7080", serial: "DL7080ABC005", procesador: "Intel Core i7-10700", ram: "16 GB", almacenamiento: "512 GB SSD", so: "Windows 11 Pro", fechaCompra: "2023-01-20", fechaGarantia: "2026-01-20", proveedor: "Dell Colombia", costo: 3000000, estado: "En mantenimiento", usuarioId: 4, area: "Gerencia", ubicacion: "Oficina Gerencia - Piso 3", observaciones: "Requiere cambio de disco duro" },
  { id: 6, codigo: "TI-PC-00006", tipo: "Computador", marca: "HP", modelo: "ProDesk 600 G7", serial: "HP600G7ABC006", procesador: "Intel Core i5-10500", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 10 Pro", fechaCompra: "2022-08-10", fechaGarantia: "2025-08-10", proveedor: "HP Colombia", costo: 2100000, estado: "Dado de baja", usuarioId: null, area: "", ubicacion: "", observaciones: "Equipo obsoleto" },
  { id: 7, codigo: "TI-PC-00007", tipo: "Portátil", marca: "Dell", modelo: "Latitude 5520", serial: "DL5520ABC007", procesador: "Intel Core i5-1145G7", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-04-05", fechaGarantia: "2027-04-05", proveedor: "Dell Colombia", costo: 3500000, estado: "Activo", usuarioId: 5, area: "Ventas", ubicacion: "Oficina Ventas - Piso 1", observaciones: "Portátil para ventas externas" },
  { id: 8, codigo: "TI-PC-00008", tipo: "Portátil", marca: "Lenovo", modelo: "ThinkPad T14s", serial: "LNT14SABC008", procesador: "Intel Core i7-1165G7", ram: "16 GB", almacenamiento: "512 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-05-12", fechaGarantia: "2027-05-12", proveedor: "Lenovo Colombia", costo: 4200000, estado: "Activo", usuarioId: 6, area: "Sistemas", ubicacion: "Oficina Principal - Piso 2", observaciones: "Equipo de desarrollo" },
  { id: 9, codigo: "TI-PC-00009", tipo: "Computador", marca: "HP", modelo: "ProOne 600 G6", serial: "HP600G6ABC009", procesador: "Intel Core i5-10500T", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2023-09-18", fechaGarantia: "2026-09-18", proveedor: "HP Colombia", costo: 2800000, estado: "Activo", usuarioId: 7, area: "Recepción", ubicacion: "Recepción - Piso 1", observaciones: "All-in-One para recepción" },
  { id: 10, codigo: "TI-PC-00010", tipo: "Portátil", marca: "HP", modelo: "EliteBook 840 G8", serial: "HP840G8ABC010", procesador: "Intel Core i5-1135G7", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-01-22", fechaGarantia: "2027-01-22", proveedor: "HP Colombia", costo: 3800000, estado: "Activo", usuarioId: 8, area: "Gerencia", ubicacion: "Oficina Gerencia - Piso 3", observaciones: "" },
  { id: 11, codigo: "TI-PC-00011", tipo: "Computador", marca: "Dell", modelo: "OptiPlex 3080", serial: "DL3080ABC011", procesador: "Intel Core i3-10100", ram: "4 GB", almacenamiento: "128 GB SSD", so: "Windows 11 Pro", fechaCompra: "2023-03-05", fechaGarantia: "2026-03-05", proveedor: "Dell Colombia", costo: 1600000, estado: "Disponible", usuarioId: null, area: "", ubicacion: "Almacén de TI", observaciones: "" },
  { id: 12, codigo: "TI-PC-00012", tipo: "Computador", marca: "Lenovo", modelo: "ThinkCentre M70t", serial: "LNM70TABC012", procesador: "Intel Core i5-10400", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2023-07-20", fechaGarantia: "2026-07-20", proveedor: "Lenovo Colombia", costo: 2000000, estado: "Activo", usuarioId: 9, area: "Contabilidad", ubicacion: "Oficina Contabilidad - Piso 1", observaciones: "" },
  { id: 13, codigo: "TI-PC-00013", tipo: "Portátil", marca: "Dell", modelo: "Latitude 5420", serial: "DL5420ABC013", procesador: "Intel Core i5-1135G7", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-02-10", fechaGarantia: "2027-02-10", proveedor: "Dell Colombia", costo: 3300000, estado: "Activo", usuarioId: 10, area: "Ventas", ubicacion: "Oficina Ventas - Piso 1", observaciones: "" },
  { id: 14, codigo: "TI-PC-00014", tipo: "Computador", marca: "HP", modelo: "ProDesk 400 G9", serial: "HP400G9ABC014", procesador: "Intel Core i5-12500", ram: "16 GB", almacenamiento: "512 GB SSD", so: "Windows 11 Pro", fechaCompra: "2025-01-15", fechaGarantia: "2028-01-15", proveedor: "HP Colombia", costo: 2600000, estado: "Activo", usuarioId: 11, area: "Sistemas", ubicacion: "Oficina Principal - Piso 2", observaciones: "" },
  { id: 15, codigo: "TI-PC-00015", tipo: "Computador", marca: "Dell", modelo: "OptiPlex 7010", serial: "DL7010ABC015", procesador: "Intel Core i7-13700", ram: "32 GB", almacenamiento: "1 TB SSD", so: "Windows 11 Pro", fechaCompra: "2025-03-01", fechaGarantia: "2028-03-01", proveedor: "Dell Colombia", costo: 4500000, estado: "Activo", usuarioId: 12, area: "Sistemas", ubicacion: "Oficina Principal - Piso 2", observaciones: "Estación de desarrollo" },
  { id: 16, codigo: "TI-PC-00016", tipo: "Portátil", marca: "Lenovo", modelo: "ThinkPad E14", serial: "LNE14ABC016", procesador: "Intel Core i5-1235U", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Home", fechaCompra: "2024-06-20", fechaGarantia: "2026-06-20", proveedor: "Lenovo Colombia", costo: 2200000, estado: "Activo", usuarioId: 13, area: "Administración", ubicacion: "Oficina Administración - Piso 1", observaciones: "" },
  { id: 17, codigo: "TI-PC-00017", tipo: "Computador", marca: "HP", modelo: "ProDesk 600 G9", serial: "HP600G9ABC017", procesador: "Intel Core i7-12700", ram: "16 GB", almacenamiento: "512 GB SSD", so: "Windows 11 Pro", fechaCompra: "2025-02-10", fechaGarantia: "2028-02-10", proveedor: "HP Colombia", costo: 3400000, estado: "Activo", usuarioId: 14, area: "Gerencia", ubicacion: "Oficina Gerencia - Piso 3", observaciones: "" },
  { id: 18, codigo: "TI-PC-00018", tipo: "Portátil", marca: "Dell", modelo: "Latitude 7420", serial: "DL7420ABC018", procesador: "Intel Core i7-1165G7", ram: "16 GB", almacenamiento: "512 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-08-15", fechaGarantia: "2027-08-15", proveedor: "Dell Colombia", costo: 5200000, estado: "Activo", usuarioId: 15, area: "Gerencia", ubicacion: "Oficina Gerencia - Piso 3", observaciones: "" },
  { id: 19, codigo: "TI-PC-00019", tipo: "Computador", marca: "Lenovo", modelo: "ThinkCentre M80t", serial: "LNM80TABC019", procesador: "Intel Core i7-11700", ram: "16 GB", almacenamiento: "512 GB SSD", so: "Windows 11 Pro", fechaCompra: "2024-09-01", fechaGarantia: "2027-09-01", proveedor: "Lenovo Colombia", costo: 3100000, estado: "En mantenimiento", usuarioId: null, area: "", ubicacion: "Taller de TI", observaciones: "Cambio de fuente de poder" },
  { id: 20, codigo: "TI-PC-00020", tipo: "Computador", marca: "HP", modelo: "ProDesk 400 G7", serial: "HP400G7ABC020", procesador: "Intel Core i3-10100", ram: "4 GB", almacenamiento: "128 GB SSD", so: "Windows 10 Pro", fechaCompra: "2022-04-10", fechaGarantia: "2025-04-10", proveedor: "HP Colombia", costo: 1500000, estado: "Dado de baja", usuarioId: null, area: "", ubicacion: "", observaciones: "Equipo obsoleto - reciclaje" },
  { id: 21, codigo: "TI-PC-00021", tipo: "Portátil", marca: "HP", modelo: "ProBook 450 G9", serial: "HP450G9ABC021", procesador: "Intel Core i5-1235U", ram: "8 GB", almacenamiento: "256 GB SSD", so: "Windows 11 Pro", fechaCompra: "2025-01-20", fechaGarantia: "2028-01-20", proveedor: "HP Colombia", costo: 2800000, estado: "Activo", usuarioId: null, area: "", ubicacion: "Almacén de TI", observaciones: "Nuevo, pendiente de asignar" },
];

const mockMonitores = [
  { id: 1, codigo: "TI-MN-00001", marca: "Dell", modelo: "P2422H", serial: "DLMP242ABC001", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2024-01-15", estado: "Activo", usuarioId: 1, area: "Sistemas", ubicacion: "Oficina Principal - Piso 2" },
  { id: 2, codigo: "TI-MN-00002", marca: "Dell", modelo: "P2422H", serial: "DLMP242ABC002", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2024-01-15", estado: "Activo", usuarioId: 2, area: "Contabilidad", ubicacion: "Oficina Principal - Piso 1" },
  { id: 3, codigo: "TI-MN-00003", marca: "HP", modelo: "E243m", serial: "HMPE243ABC003", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2024-03-10", estado: "Activo", usuarioId: 3, area: "Recursos Humanos", ubicacion: "Oficina Principal - Piso 1" },
  { id: 4, codigo: "TI-MN-00004", marca: "Lenovo", modelo: "ThinkVision T24i-30", serial: "LNMVT24ABC004", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2024-05-12", estado: "Activo", usuarioId: 6, area: "Sistemas", ubicacion: "Oficina Principal - Piso 2" },
  { id: 5, codigo: "TI-MN-00005", marca: "Dell", modelo: "P2722H", serial: "DLMP272ABC005", tamano: '27"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2024-02-20", estado: "Activo", usuarioId: 4, area: "Gerencia", ubicacion: "Oficina Gerencia - Piso 3" },
  { id: 6, codigo: "TI-MN-00006", marca: "Samsung", modelo: "S24R350", serial: "SMS24R3ABC006", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2023-06-15", estado: "Disponible", usuarioId: null, area: "", ubicacion: "Almacén de TI" },
  { id: 7, codigo: "TI-MN-00007", marca: "HP", modelo: "E223", serial: "HMPE223ABC007", tamano: '22"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2023-09-18", estado: "Activo", usuarioId: 7, area: "Recepción", ubicacion: "Recepción - Piso 1" },
  { id: 8, codigo: "TI-MN-00008", marca: "Dell", modelo: "P2419H", serial: "DLMP241ABC008", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2023-01-20", estado: "Dado de baja", usuarioId: null, area: "", ubicacion: "" },
  { id: 9, codigo: "TI-MN-00009", marca: "Lenovo", modelo: "ThinkVision E24-40", serial: "LMVE24ABC009", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2025-01-15", estado: "Activo", usuarioId: 11, area: "Sistemas", ubicacion: "Oficina Principal - Piso 2" },
  { id: 10, codigo: "TI-MN-00010", marca: "HP", modelo: "E27m G4", serial: "HMPE27G4ABC010", tamano: '27"', resolucion: "2560x1440", tipoPanel: "IPS", fechaCompra: "2025-03-01", estado: "Activo", usuarioId: 12, area: "Sistemas", ubicacion: "Oficina Principal - Piso 2" },
  { id: 11, codigo: "TI-MN-00011", marca: "Dell", modelo: "S2421HN", serial: "DLMS242ABC011", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2024-06-20", estado: "Activo", usuarioId: 13, area: "Administración", ubicacion: "Oficina Administración - Piso 1" },
  { id: 12, codigo: "TI-MN-00012", marca: "Samsung", modelo: "S27R350", serial: "SMS27R3ABC012", tamano: '27"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2024-04-05", estado: "En mantenimiento", usuarioId: null, area: "", ubicacion: "Taller de TI" },
  { id: 13, codigo: "TI-MN-00013", marca: "Dell", modelo: "P2423D", serial: "DLMP242ABC013", tamano: '24"', resolucion: "2560x1440", tipoPanel: "IPS", fechaCompra: "2025-02-10", estado: "Activo", usuarioId: 14, area: "Gerencia", ubicacion: "Oficina Gerencia - Piso 3" },
  { id: 14, codigo: "TI-MN-00014", marca: "Lenovo", modelo: "ThinkVision T27hv-40", serial: "LMVT27ABC014", tamano: '27"', resolucion: "2560x1440", tipoPanel: "IPS", fechaCompra: "2024-08-15", estado: "Activo", usuarioId: 15, area: "Gerencia", ubicacion: "Oficina Gerencia - Piso 3" },
  { id: 15, codigo: "TI-MN-00015", marca: "HP", modelo: "E24i G4", serial: "HMPE24G4ABC015", tamano: '24"', resolucion: "1920x1080", tipoPanel: "IPS", fechaCompra: "2024-09-01", estado: "Disponible", usuarioId: null, area: "", ubicacion: "Almacén de TI" },
];

const mockImpresoras = [
  { id: 1, codigo: "TI-PR-00001", marca: "HP", modelo: "LaserJet Pro M404dn", serial: "HPLJ404ABC001", tipo: "Láser", ip: "192.168.1.101", ubicacion: "Oficina Principal - Piso 1", area: "Contabilidad", estado: "Activo", contador: 15420, usuarioResponsableId: 2 },
  { id: 2, codigo: "TI-PR-00002", marca: "HP", modelo: "Color LaserJet Pro M454dw", serial: "HPCM454ABC002", tipo: "Láser", ip: "192.168.1.102", ubicacion: "Oficina Principal - Piso 2", area: "Sistemas", estado: "Activo", contador: 8750, usuarioResponsableId: 1 },
  { id: 3, codigo: "TI-PR-00003", marca: "Epson", modelo: "WorkForce Pro WF-4830", serial: "EPWF483ABC003", tipo: "Inyección", ip: "192.168.1.103", ubicacion: "Oficina Recursos Humanos", area: "Recursos Humanos", estado: "Activo", contador: 5200, usuarioResponsableId: 3 },
  { id: 4, codigo: "TI-PR-00004", marca: "HP", modelo: "LaserJet Pro MFP M428fdw", serial: "HPLJM428ABC004", tipo: "Multifuncional", ip: "192.168.1.104", ubicacion: "Recepción - Piso 1", area: "General", estado: "Activo", contador: 22100, usuarioResponsableId: 7 },
  { id: 5, codigo: "TI-PR-00005", marca: "Brother", modelo: "HL-L2370DW", serial: "BRHLL237ABC005", tipo: "Láser", ip: "192.168.1.105", ubicacion: "Oficina Ventas - Piso 1", area: "Ventas", estado: "Activo", contador: 11300, usuarioResponsableId: 5 },
  { id: 6, codigo: "TI-PR-00006", marca: "Samsung", modelo: "Xpress M2020W", serial: "SMSM202ABC006", tipo: "Láser", ip: "192.168.1.106", ubicacion: "Oficina Gerencia - Piso 3", area: "Gerencia", estado: "Activo", contador: 7800, usuarioResponsableId: 15 },
  { id: 7, codigo: "TI-PR-00007", marca: "Epson", modelo: "L3150", serial: "EPL315ABC007", tipo: "Inyección", ip: "192.168.1.107", ubicacion: "Almacén", area: "Almacén", estado: "Disponible", contador: 0, usuarioResponsableId: null },
  { id: 8, codigo: "TI-PR-00008", marca: "HP", modelo: "Smart Tank 515", serial: "HPST515ABC008", tipo: "Inyección", ip: "192.168.1.108", ubicacion: "Oficina Administración", area: "Administración", estado: "En mantenimiento", contador: 9500, usuarioResponsableId: 13 },
  { id: 9, codigo: "TI-PR-00009", marca: "Brother", modelo: "MFC-L2750DW", serial: "BRMFCL275ABC009", tipo: "Multifuncional", ip: "192.168.1.109", ubicacion: "Oficina Principal - Piso 1", area: "General", estado: "Activo", contador: 18700, usuarioResponsableId: null },
  { id: 10, codigo: "TI-PR-00010", marca: "Zebra", modelo: "ZD421", serial: "ZBZD42ABC010", tipo: "Térmica", ip: "192.168.1.110", ubicacion: "Bodega", area: "Logística", estado: "Activo", contador: 3200, usuarioResponsableId: null },
];

const mockPerifericos = [
  { id: 1, codigo: "TI-PF-00001", tipo: "Teclado", marca: "Dell", modelo: "KB216", serial: "DLKB216ABC001", usuarioId: 1, estado: "Activo", ubicacion: "Oficina Principal - Piso 2" },
  { id: 2, codigo: "TI-PF-00002", tipo: "Mouse", marca: "Dell", modelo: "MS116", serial: "DLMS116ABC002", usuarioId: 1, estado: "Activo", ubicacion: "Oficina Principal - Piso 2" },
  { id: 3, codigo: "TI-PF-00003", tipo: "Headset", marca: "Logitech", modelo: "H390", serial: "LGH390ABC003", usuarioId: 5, estado: "Activo", ubicacion: "Oficina Ventas - Piso 1" },
  { id: 4, codigo: "TI-PF-00004", tipo: "Webcam", marca: "Logitech", modelo: "C920", serial: "LGC920ABC004", usuarioId: 6, estado: "Activo", ubicacion: "Oficina Principal - Piso 2" },
  { id: 5, codigo: "TI-PF-00005", tipo: "Docking Station", marca: "Dell", modelo: "WD19S", serial: "DLWD19SABC005", usuarioId: 5, estado: "Activo", ubicacion: "Oficina Ventas - Piso 1" },
  { id: 6, codigo: "TI-PF-00006", tipo: "Adaptador", marca: "Dell", modelo: "DA300", serial: "DLDA300ABC006", usuarioId: 8, estado: "Activo", ubicacion: "Oficina Gerencia - Piso 3" },
  { id: 7, codigo: "TI-PF-00007", tipo: "Cargador", marca: "Dell", modelo: "65W USB-C", serial: "DL65WABC007", usuarioId: 5, estado: "Activo", ubicacion: "Oficina Ventas - Piso 1" },
  { id: 8, codigo: "TI-PF-00008", tipo: "Teclado", marca: "HP", modelo: "SK200", serial: "HPSK200ABC008", usuarioId: 2, estado: "Activo", ubicacion: "Oficina Principal - Piso 1" },
  { id: 9, codigo: "TI-PF-00009", tipo: "Mouse", marca: "HP", modelo: "FM100", serial: "HPFM100ABC009", usuarioId: 2, estado: "Activo", ubicacion: "Oficina Principal - Piso 1" },
  { id: 10, codigo: "TI-PF-00010", tipo: "Headset", marca: "Jabra", modelo: "Evolve 20", serial: "JBE20ABC010", usuarioId: 7, estado: "Activo", ubicacion: "Recepción - Piso 1" },
  { id: 11, codigo: "TI-PF-00011", tipo: "Webcam", marca: "Microsoft", modelo: "LifeCam HD-3000", serial: "MSLCHD3ABC011", usuarioId: 3, estado: "Activo", ubicacion: "Oficina Principal - Piso 1" },
  { id: 12, codigo: "TI-PF-00012", tipo: "Teclado", marca: "Logitech", modelo: "K120", serial: "LGK120ABC012", usuarioId: 3, estado: "Activo", ubicacion: "Oficina Principal - Piso 1" },
  { id: 13, codigo: "TI-PF-00013", tipo: "Mouse", marca: "Logitech", modelo: "M100", serial: "LGM100ABC013", usuarioId: 3, estado: "Activo", ubicacion: "Oficina Principal - Piso 1" },
  { id: 14, codigo: "TI-PF-00014", tipo: "Cargador", marca: "Lenovo", modelo: "65W USB-C", serial: "LN65WABC014", usuarioId: 6, estado: "Activo", ubicacion: "Oficina Principal - Piso 2" },
  { id: 15, codigo: "TI-PF-00015", tipo: "Fuente", marca: "APC", modelo: "Back-UPS 600VA", serial: "APC600ABC015", usuarioId: null, estado: "Activo", ubicacion: "Oficina Principal - Piso 2" },
  { id: 16, codigo: "TI-PF-00016", tipo: "Cable", marca: "Genérico", modelo: "HDMI 2m", serial: "CBLHDMI016", usuarioId: null, estado: "Activo", ubicacion: "Almacén de TI" },
  { id: 17, codigo: "TI-PF-00017", tipo: "Adaptador", marca: "Lenovo", modelo: "USB-C Hub", serial: "LNUSBCH017", usuarioId: 8, estado: "Activo", ubicacion: "Oficina Gerencia - Piso 3" },
  { id: 18, codigo: "TI-PF-00018", tipo: "Teclado", marca: "Dell", modelo: "KM113", serial: "DLKM113ABC018", usuarioId: null, estado: "Disponible", ubicacion: "Almacén de TI" },
  { id: 19, codigo: "TI-PF-00019", tipo: "Mouse", marca: "Dell", modelo: "WM118", serial: "DLWM118ABC019", usuarioId: null, estado: "Disponible", ubicacion: "Almacén de TI" },
  { id: 20, codigo: "TI-PF-00020", tipo: "Docking Station", marca: "Lenovo", modelo: "ThinkPad Hybrid", serial: "LNTPHYB020", usuarioId: 10, estado: "Activo", ubicacion: "Oficina Ventas - Piso 1" },
];

const mockSoftware = [
  { id: 1, nombre: "Microsoft Office 365 ProPlus", fabricante: "Microsoft", version: "2024", tipoLicencia: "Suscripción", clave: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", cantidadAdquirida: 50, cantidadUtilizada: 42, fechaCompra: "2025-01-01", fechaVencimiento: "2026-01-01", proveedor: "Microsoft Colombia", estado: "Activo" },
  { id: 2, nombre: "Windows 11 Pro", fabricante: "Microsoft", version: "23H2", tipoLicencia: "OEM", clave: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", cantidadAdquirida: 100, cantidadUtilizada: 85, fechaCompra: "2024-06-01", fechaVencimiento: "", proveedor: "Dell/HP/Lenovo", estado: "Activo" },
  { id: 3, nombre: "Microsoft Teams", fabricante: "Microsoft", version: "2024", tipoLicencia: "Incluido", clave: "N/A", cantidadAdquirida: 50, cantidadUtilizada: 48, fechaCompra: "2025-01-01", fechaVencimiento: "2026-01-01", proveedor: "Microsoft Colombia", estado: "Activo" },
  { id: 4, nombre: "Adobe Acrobat Pro", fabricante: "Adobe", version: "2024", tipoLicencia: "Suscripción", clave: "XXXXX-XXXXX-XXXXX", cantidadAdquirida: 15, cantidadUtilizada: 12, fechaCompra: "2025-01-01", fechaVencimiento: "2026-01-01", proveedor: "Adobe Colombia", estado: "Activo" },
  { id: 5, nombre: "AutoCAD", fabricante: "Autodesk", version: "2025", tipoLicencia: "Suscripción", clave: "XXXXX-XXXXX-XXXXX", cantidadAdquirida: 5, cantidadUtilizada: 4, fechaCompra: "2025-01-01", fechaVencimiento: "2026-01-01", proveedor: "Autodesk Colombia", estado: "Activo" },
  { id: 6, nombre: "Visual Studio Code", fabricante: "Microsoft", version: "1.90", tipoLicencia: "Gratuita", clave: "N/A", cantidadAdquirida: 999, cantidadUtilizada: 10, fechaCompra: "", fechaVencimiento: "", proveedor: "Microsoft", estado: "Activo" },
  { id: 7, nombre: "Google Workspace Business", fabricante: "Google", version: "2024", tipoLicencia: "Suscripción", clave: "N/A", cantidadAdquirida: 50, cantidadUtilizada: 45, fechaCompra: "2025-01-01", fechaVencimiento: "2026-01-01", proveedor: "Google Colombia", estado: "Activo" },
  { id: 8, nombre: "Norton 360 Enterprise", fabricante: "Norton", version: "2025", tipoLicencia: "Suscripción", clave: "XXXXX-XXXXX-XXXXX", cantidadAdquirida: 100, cantidadUtilizada: 85, fechaCompra: "2025-01-01", fechaVencimiento: "2026-01-01", proveedor: "Norton Enterprise", estado: "Activo" },
  { id: 9, nombre: "SAP Business One", fabricante: "SAP", version: "10.0", tipoLicencia: "Suscripción", clave: "XXXXX-XXXXX-XXXXX", cantidadAdquirida: 20, cantidadUtilizada: 18, fechaCompra: "2024-01-01", fechaVencimiento: "2025-12-31", proveedor: "SAP Colombia", estado: "Por vencer" },
  { id: 10, nombre: "Microsoft Project", fabricante: "Microsoft", version: "2024", tipoLicencia: "Suscripción", clave: "XXXXX-XXXXX-XXXXX-XXXXX-XXXXX", cantidadAdquirida: 10, cantidadUtilizada: 6, fechaCompra: "2025-06-01", fechaVencimiento: "2026-06-01", proveedor: "Microsoft Colombia", estado: "Activo" },
];

const mockUsuarios = [
  { id: 1, nombre: "Juan Carlos", apellido: "Pérez López", documento: "1098765432", correo: "juan.perez@empresa.com", telefono: "310-123-4567", area: "Sistemas", cargo: "Desarrollador Senior", ubicacion: "Oficina Principal - Piso 2", estado: "Activo" },
  { id: 2, nombre: "María Fernanda", apellido: "García Rodríguez", documento: "1098765433", correo: "maria.garcia@empresa.com", telefono: "310-123-4568", area: "Contabilidad", cargo: "Contadora", ubicacion: "Oficina Principal - Piso 1", estado: "Activo" },
  { id: 3, nombre: "Carlos Andrés", apellido: "López Martínez", documento: "1098765434", correo: "carlos.lopez@empresa.com", telefono: "310-123-4569", area: "Recursos Humanos", cargo: "Auxiliar de RRHH", ubicacion: "Oficina Principal - Piso 1", estado: "Activo" },
  { id: 4, nombre: "Ana María", apellido: "Rodríguez Sánchez", documento: "1098765435", correo: "ana.rodriguez@empresa.com", telefono: "310-123-4570", area: "Gerencia", cargo: "Gerente General", ubicacion: "Oficina Gerencia - Piso 3", estado: "Activo" },
  { id: 5, nombre: "Pedro José", apellido: "Martínez Gómez", documento: "1098765436", correo: "pedro.martinez@empresa.com", telefono: "310-123-4571", area: "Ventas", cargo: "Ejecutivo de Ventas", ubicacion: "Oficina Ventas - Piso 1", estado: "Activo" },
  { id: 6, nombre: "Laura Valentina", apellido: "Sánchez Díaz", documento: "1098765437", correo: "laura.sanchez@empresa.com", telefono: "310-123-4572", area: "Sistemas", cargo: "Administradora de Sistemas", ubicacion: "Oficina Principal - Piso 2", estado: "Activo" },
  { id: 7, nombre: "Diego Fernando", apellido: "Hernández Vargas", documento: "1098765438", correo: "diego.hernandez@empresa.com", telefono: "310-123-4573", area: "Recepción", cargo: "Asistente de Recepción", ubicacion: "Recepción - Piso 1", estado: "Activo" },
  { id: 8, nombre: "Sandra Milena", apellido: "Torres Ramírez", documento: "1098765439", correo: "sandra.torres@empresa.com", telefono: "310-123-4574", area: "Gerencia", cargo: "Asistente de Gerencia", ubicacion: "Oficina Gerencia - Piso 3", estado: "Activo" },
  { id: 9, nombre: "Andrés Felipe", apellido: "Morales Castro", documento: "1098765440", correo: "andres.morales@empresa.com", telefono: "310-123-4575", area: "Contabilidad", cargo: "Auxiliar Contable", ubicacion: "Oficina Contabilidad - Piso 1", estado: "Activo" },
  { id: 10, nombre: "Catalina", apellido: "Vargas Ospina", documento: "1098765441", correo: "catalina.vargas@empresa.com", telefono: "310-123-4576", area: "Ventas", cargo: "Ejecutiva de Ventas", ubicacion: "Oficina Ventas - Piso 1", estado: "Activo" },
  { id: 11, nombre: "Luis Alejandro", apellido: "Rincón Muñoz", documento: "1098765442", correo: "luis.rincon@empresa.com", telefono: "310-123-4577", area: "Sistemas", cargo: "Técnico de Soporte", ubicacion: "Oficina Principal - Piso 2", estado: "Activo" },
  { id: 12, nombre: "Daniela", apellido: "Ospina Velásquez", documento: "1098765443", correo: "daniela.ospina@empresa.com", telefono: "310-123-4578", area: "Sistemas", cargo: "Desarrolladora Full Stack", ubicacion: "Oficina Principal - Piso 2", estado: "Activo" },
  { id: 13, nombre: "Julián David", apellido: "Muñoz Giraldo", documento: "1098765444", correo: "julian.munoz@empresa.com", telefono: "310-123-4579", area: "Administración", cargo: "Auxiliar Administrativo", ubicacion: "Oficina Administración - Piso 1", estado: "Activo" },
  { id: 14, nombre: "Valentina", apellido: "Giraldo Bedoya", documento: "1098765445", correo: "valentina.giraldo@empresa.com", telefono: "310-123-4580", area: "Gerencia", cargo: "Subgerente", ubicacion: "Oficina Gerencia - Piso 3", estado: "Activo" },
  { id: 15, nombre: "Santiago", apellido: "Restrepo Cardona", documento: "1098765446", correo: "santiago.restrepo@empresa.com", telefono: "310-123-4581", area: "Gerencia", cargo: "Director de Operaciones", ubicacion: "Oficina Gerencia - Piso 3", estado: "Inactivo" },
];

const mockMantenimientos = [
  { id: 1, codigo: "MTTO-001", activoId: 5, activoCodigo: "TI-PC-00005", tipo: "Correctivo", fecha: "2026-08-10", tecnico: "Luis Alejandro Rincón", descripcion: "Cambio de disco duro SSD por falla del original", costo: 280000, estado: "En proceso", proximaFecha: "2026-08-20" },
  { id: 2, codigo: "MTTO-002", activoId: 19, activoCodigo: "TI-PC-00019", tipo: "Correctivo", fecha: "2026-08-12", tecnico: "Luis Alejandro Rincón", descripcion: "Cambio de fuente de poder", costo: 180000, estado: "Programado", proximaFecha: "2026-08-19" },
  { id: 3, codigo: "MTTO-003", activoId: 12, activoCodigo: "TI-MN-00012", tipo: "Correctivo", fecha: "2026-08-05", tecnico: "Luis Alejandro Rincón", descripcion: "Reparación de panel con líneas verticales", costo: 350000, estado: "En proceso", proximaFecha: "2026-08-15" },
  { id: 4, codigo: "MTTO-004", activoId: 8, activoCodigo: "TI-PR-00008", tipo: "Preventivo", fecha: "2026-07-20", tecnico: "Técnico externo - HP", descripcion: "Mantenimiento preventivo: limpieza de cabezales y calibración", costo: 120000, estado: "Finalizado", proximaFecha: "2026-10-20" },
  { id: 5, codigo: "MTTO-005", activoId: 1, activoCodigo: "TI-PC-00001", tipo: "Preventivo", fecha: "2026-06-15", tecnico: "Luis Alejandro Rincón", descripcion: "Mantenimiento preventivo: limpieza interna, actualización de drivers", costo: 50000, estado: "Finalizado", proximaFecha: "2026-09-15" },
  { id: 6, codigo: "MTTO-006", activoId: 8, activoCodigo: "TI-PC-00008", tipo: "Preventivo", fecha: "2026-05-10", tecnico: "Luis Alejandro Rincón", descripcion: "Mantenimiento preventivo: limpieza, actualización BIOS", costo: 45000, estado: "Finalizado", proximaFecha: "2026-08-10" },
  { id: 7, codigo: "MTTO-007", activoId: 2, activoCodigo: "TI-PR-00002", tipo: "Correctivo", fecha: "2026-04-05", tecnico: "Técnico externo - HP", descripcion: "Reparación de rodillo de transferencia", costo: 220000, estado: "Finalizado", proximaFecha: "" },
  { id: 8, codigo: "MTTO-008", activoId: 5, activoCodigo: "TI-PC-00005", tipo: "Preventivo", fecha: "2026-03-10", tecnico: "Luis Alejandro Rincón", descripcion: "Mantenimiento preventivo trimestral", costo: 40000, estado: "Finalizado", proximaFecha: "2026-06-10" },
  { id: 9, codigo: "MTTO-009", activoId: 4, activoCodigo: "TI-MN-00004", tipo: "Correctivo", fecha: "2026-02-15", tecnico: "Técnico externo - Lenovo", descripcion: "Cambio de cable de poder interno", costo: 85000, estado: "Finalizado", proximaFecha: "" },
  { id: 10, codigo: "MTTO-010", activoId: 1, activoCodigo: "TI-PC-00001", tipo: "Preventivo", fecha: "2026-01-10", tecnico: "Luis Alejandro Rincón", descripcion: "Mantenimiento preventivo anual: limpieza profunda, cambio pasta térmica", costo: 65000, estado: "Finalizado", proximaFecha: "2026-07-10" },
];

const mockActividad = [
  { id: 1, fecha: "2026-08-19", hora: "09:15", tipo: "registro", descripcion: "Nuevo portátil registrado: TI-PC-00021 HP ProBook 450 G9", usuario: "Luis Alejandro Rincón" },
  { id: 2, fecha: "2026-08-18", hora: "16:30", tipo: "asignacion", descripcion: "Activo TI-PC-00018 asignado a Santiago Restrepo", usuario: "Luis Alejandro Rincón" },
  { id: 3, fecha: "2026-08-18", hora: "14:00", tipo: "mantenimiento", descripcion: "Activo TI-PC-00005 enviado a mantenimiento - cambio de disco", usuario: "Luis Alejandro Rincón" },
  { id: 4, fecha: "2026-08-17", hora: "11:20", tipo: "baja", descripcion: "Activo TI-PC-00006 dado de baja - equipo obsoleto", usuario: "Luis Alejandro Rincón" },
  { id: 5, fecha: "2026-08-16", hora: "10:00", tipo: "edicion", descripcion: "Usuario Daniela Ospina actualizado - cambio de área", usuario: "Luis Alejandro Rincón" },
  { id: 6, fecha: "2026-08-15", hora: "15:45", tipo: "registro", descripcion: "Nuevo monitor registrado: TI-MN-00015 HP E24i G4", usuario: "Luis Alejandro Rincón" },
  { id: 7, fecha: "2026-08-14", hora: "09:00", tipo: "asignacion", descripcion: "Monitor TI-MN-00013 asignado a Valentina Giraldo", usuario: "Luis Alejandro Rincón" },
  { id: 8, fecha: "2026-08-13", hora: "13:30", tipo: "mantenimiento", descripcion: "Impresora TI-PR-00008 enviada a mantenimiento preventivo", usuario: "Luis Alejandro Rincón" },
];

let nextId = {
  equipos: 22,
  monitores: 16,
  impresoras: 11,
  perifericos: 21,
  software: 11,
  usuarios: 16,
  mantenimientos: 11,
};

export function getEquipos() {
  return [...mockEquipos];
}

export function getEquipoById(id) {
  return mockEquipos.find((e) => e.id === id) || null;
}

export function createEquipo(equipo) {
  const nuevo = { ...equipo, id: nextId.equipos++ };
  mockEquipos.push(nuevo);
  return nuevo;
}

export function updateEquipo(id, datos) {
  const idx = mockEquipos.findIndex((e) => e.id === id);
  if (idx === -1) return null;
  mockEquipos[idx] = { ...mockEquipos[idx], ...datos };
  return mockEquipos[idx];
}

export function deleteEquipo(id) {
  const idx = mockEquipos.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  mockEquipos.splice(idx, 1);
  return true;
}

export function getMonitores() {
  return [...mockMonitores];
}

export function getMonitorById(id) {
  return mockMonitores.find((m) => m.id === id) || null;
}

export function createMonitor(monitor) {
  const nuevo = { ...monitor, id: nextId.monitores++ };
  mockMonitores.push(nuevo);
  return nuevo;
}

export function updateMonitor(id, datos) {
  const idx = mockMonitores.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  mockMonitores[idx] = { ...mockMonitores[idx], ...datos };
  return mockMonitores[idx];
}

export function deleteMonitor(id) {
  const idx = mockMonitores.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  mockMonitores.splice(idx, 1);
  return true;
}

export function getImpresoras() {
  return [...mockImpresoras];
}

export function getImpresoraById(id) {
  return mockImpresoras.find((i) => i.id === id) || null;
}

export function createImpresora(impresora) {
  const nuevo = { ...impresora, id: nextId.impresoras++ };
  mockImpresoras.push(nuevo);
  return nuevo;
}

export function updateImpresora(id, datos) {
  const idx = mockImpresoras.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  mockImpresoras[idx] = { ...mockImpresoras[idx], ...datos };
  return mockImpresoras[idx];
}

export function deleteImpresora(id) {
  const idx = mockImpresoras.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  mockImpresoras.splice(idx, 1);
  return true;
}

export function getPerifericos() {
  return [...mockPerifericos];
}

export function getPerifericoById(id) {
  return mockPerifericos.find((p) => p.id === id) || null;
}

export function createPeriferico(periferico) {
  const nuevo = { ...periferico, id: nextId.perifericos++ };
  mockPerifericos.push(nuevo);
  return nuevo;
}

export function updatePeriferico(id, datos) {
  const idx = mockPerifericos.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  mockPerifericos[idx] = { ...mockPerifericos[idx], ...datos };
  return mockPerifericos[idx];
}

export function deletePeriferico(id) {
  const idx = mockPerifericos.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  mockPerifericos.splice(idx, 1);
  return true;
}

export function getSoftware() {
  return [...mockSoftware];
}

export function getSoftwareById(id) {
  return mockSoftware.find((s) => s.id === id) || null;
}

export function createSoftware(software) {
  const nuevo = { ...software, id: nextId.software++ };
  mockSoftware.push(nuevo);
  return nuevo;
}

export function updateSoftware(id, datos) {
  const idx = mockSoftware.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  mockSoftware[idx] = { ...mockSoftware[idx], ...datos };
  return mockSoftware[idx];
}

export function deleteSoftware(id) {
  const idx = mockSoftware.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  mockSoftware.splice(idx, 1);
  return true;
}

export function getUsuarios() {
  return [...mockUsuarios];
}

export function getUsuarioById(id) {
  return mockUsuarios.find((u) => u.id === id) || null;
}

export function createUsuario(usuario) {
  const nuevo = { ...usuario, id: nextId.usuarios++ };
  mockUsuarios.push(nuevo);
  return nuevo;
}

export function updateUsuario(id, datos) {
  const idx = mockUsuarios.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  mockUsuarios[idx] = { ...mockUsuarios[idx], ...datos };
  return mockUsuarios[idx];
}

export function deleteUsuario(id) {
  const idx = mockUsuarios.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  mockUsuarios.splice(idx, 1);
  return true;
}

export function getMantenimientos() {
  return [...mockMantenimientos];
}

export function getMantenimientoById(id) {
  return mockMantenimientos.find((m) => m.id === id) || null;
}

export function createMantenimiento(mantenimiento) {
  const nuevo = { ...mantenimiento, id: nextId.mantenimientos++ };
  mockMantenimientos.push(nuevo);
  return nuevo;
}

export function updateMantenimiento(id, datos) {
  const idx = mockMantenimientos.findIndex((m) => m.id === id);
  if (idx === -1) return null;
  mockMantenimientos[idx] = { ...mockMantenimientos[idx], ...datos };
  return mockMantenimientos[idx];
}

export function deleteMantenimiento(id) {
  const idx = mockMantenimientos.findIndex((m) => m.id === id);
  if (idx === -1) return false;
  mockMantenimientos.splice(idx, 1);
  return true;
}

export function getActividad() {
  return [...mockActividad];
}

export function getUsuarioNombre(usuarioId) {
  if (!usuarioId) return "Sin asignar";
  const u = mockUsuarios.find((usr) => usr.id === usuarioId);
  return u ? `${u.nombre} ${u.apellido}` : "Sin asignar";
}

export function getEstadisticas() {
  const totalActivos = mockEquipos.length + mockMonitores.length + mockImpresoras.length + mockPerifericos.length + mockSoftware.length;
  const enMantenimiento = mockMantenimientos.filter((m) => m.estado === "En proceso" || m.estado === "Programado").length;
  const dadosDeBaja = mockEquipos.filter((e) => e.estado === "Dado de baja").length + mockMonitores.filter((m) => m.estado === "Dado de baja").length;

  return {
    totalActivos,
    equipos: mockEquipos.length,
    monitores: mockMonitores.length,
    impresoras: mockImpresoras.length,
    perifericos: mockPerifericos.length,
    software: mockSoftware.length,
    usuarios: mockUsuarios.filter((u) => u.estado === "Activo").length,
    enMantenimiento,
    dadosDeBaja,
  };
}

export function getLicenciasResumen() {
  const disponibles = mockSoftware.reduce((acc, s) => acc + (s.cantidadAdquirida - s.cantidadUtilizada), 0);
  const utilizadas = mockSoftware.reduce((acc, s) => acc + s.cantidadUtilizada, 0);
  const porVencer = mockSoftware.filter((s) => s.estado === "Por vencer").length;
  const vencidas = mockSoftware.filter((s) => {
    if (!s.fechaVencimiento) return false;
    return new Date(s.fechaVencimiento) < new Date();
  }).length;

  return { disponibles, utilizadas, porVencer, vencidas };
}
