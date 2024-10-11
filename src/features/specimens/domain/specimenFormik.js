export default class SpecimenFormik {
  constructor(data = {}) {
    // Datos generales
    this.colection_number = data?.colection_number || "";
    this.colection_code = data?.colection_code || "";
    this.catalog_id = data?.catalog_id || "ND";
    this.colection_date = data?.colection_date || "";
    this.preparation_date = data?.preparation_date || null;
    this.hour = data?.hour || "";
    this.status = data?.status || "";
    this.nature = data?.nature || "";
    this.sex = data?.sex || "";
    this.number_embryos = data?.number_embryos || 0;
    this.comment = data?.comment || "";
    this.class_age = data?.class_age || "";

    // Medidas morfométricas
    this.length_total = data?.length_total || "";
    this.length_ear = data?.length_ear || "";
    this.length_paw = data?.length_paw || "";
    this.length_tail = data?.length_tail || "";
    this.weight = data?.weight || "";

    this.location = {

      // Ubicación
      coordinates_cartesian_plane_x: data?.coordinates_cartesian_plane_x || "",
      coordinates_cartesian_plane_y: data?.coordinates_cartesian_plane_y || "",
      geographical_coordinates_x: data?.geographical_coordinates_x || "",
      geographical_coordinates_y: data?.geographical_coordinates_y || "",
      utm_region: data?.utm_region || "",
      msnm_google: data?.msnm_google || "",
      altitude: data?.altitude || "",
      institute_code: data?.institute_code || "",
      institute: data?.institute || "",
      specific_location: data?.specific_location || "",
      municipality: data?.municipality || "",
      state: data?.state || "",
      country: data?.country || "",
  }
    
    // Colaboradores
    this.colector = data?.colector || "";
    this.preparator = data?.preparator || "";
  }
}
