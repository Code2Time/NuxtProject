export default async function ({ store, redirect }) {
  try {
    await store.dispatch('auth/initAuth')
  } catch (e) {
    console.error('Error in auth middleware:', e)
  }

  if (!store.getters['auth/isAuthenticated']) {
    return redirect('/login')
  }
}