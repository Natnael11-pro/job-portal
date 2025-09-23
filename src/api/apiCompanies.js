import supabaseClient, { supabaseUrl } from "@/utils/supabase";

// Fetch Companies
export async function getCompanies(token) {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from("companies").select("*");

  if (error) {
    console.error("Error fetching Companies:", error);
    return null;
  }

  return data;
}

// Add Company
export async function addNewCompany(_, __, companyData) {
  const random = Math.floor(Math.random() * 90000);
  const fileExt = companyData.logo.name.split(".").pop();
  const fileName = `logo-${random}-${companyData.name}.${fileExt}`;

  // Upload to bucket "company-logo"
  const { error: storageError } = await supabase.storage
    .from("company-logo")
    .upload(fileName, companyData.logo, {
      cacheControl: "3600",
      upsert: false,
    });

  if (storageError) {
    console.error(storageError);
    throw new Error("Error uploading Company Logo");
  }

  // Build public URL
  const logo_url = `${supabaseUrl}/storage/v1/object/public/company-logo/${fileName}`;

  // Insert company row
  const { data, error } = await supabase
    .from("companies")
    .insert([{ name: companyData.name, logo_url }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error submitting Company");
  }

  return data;
}
