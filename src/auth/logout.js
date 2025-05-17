import { createClient } from '@/utils/supabase/server'

export async function logout() {
  const supabase = await createClient()

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    await supabase
    .from('users')
    .update({ is_online: false })
    .eq('user_id', user.user_metadata.user_id)
    await supabase.auth.signOut()
  }

  return {
    success: true,
    message: 'Logout successful',
  }
}