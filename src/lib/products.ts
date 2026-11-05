import { supabasePublic } from "./supabase/public";
import type { Product } from "./types";

export async function getProducts(limit?: number): Promise<Product[]> {
  let q = supabasePublic()
    .from("products")
    .select("*, variants(*)")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data } = await q;
  return (data ?? []) as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data } = await supabasePublic()
    .from("products")
    .select("*, variants(*)")
    .eq("slug", slug)
    .eq("is_visible", true)
    .maybeSingle();
  return (data as Product | null) ?? null;
}