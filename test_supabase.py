from database.supabase import supabase

print("Connected Successfully!")

response = supabase.table("devices").select("*").execute()

print(response.data)