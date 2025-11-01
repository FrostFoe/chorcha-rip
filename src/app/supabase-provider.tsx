"use client"

import { createContext, useContext, useEffect, useState } from "react"
import {
  createClientComponentClient,
  type Session,
} from "@supabase/auth-helpers-nextjs"

// Define a consistent type for the Supabase client
type SupabaseClient = ReturnType<typeof createClientComponentClient>

type SupabaseContext = {
  supabase: SupabaseClient
  session: Session | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [supabase] = useState(() => createClientComponentClient())
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const checkConnection = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()
      if (error) {
        console.error("Supabase connection error:", error.message)
      } else {
        console.log("Supabase connection successful.")
        setSession(session)
      }
    }

    checkConnection()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return (
    <Context.Provider value={{ supabase, session }}>
      {children}
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside a SupabaseProvider")
  }
  return context
}
