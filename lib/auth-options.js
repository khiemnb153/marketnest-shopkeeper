import Credentials from 'next-auth/providers/credentials'

const authOptions = {
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })

        const data = await res.json()

        if (!data.success) {
          return null
        }

        const { id, displayName, avatar, username, status } = data.data.user
        const { role, accessToken } = data.session

        return {
          id,
          email,
          displayName,
          avatar,
          username,
          status,
          role,
          shop: data.session.shops[0],
          accessToken,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, ...restOfUser } = user
        token = {
          ...token,
          accessToken,
          user: restOfUser,
        }
      }

      return token
    },
    async session({ session, token }) {
      const { shop, ...restOfUser } = token.user
      session.user = restOfUser
      session.accessToken = token.accessToken
      session.shop = shop

      return session
    },
    async signIn({ user }) {
      if (user.role !== 'Shopkeeper') {
        return '/you-are-not-a-shopkeeper'
      }

      if (user.shop.status == 'Deactivated') {
        return '/your-shop-is-deactivated'
      }

      return true
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
}

export default authOptions
