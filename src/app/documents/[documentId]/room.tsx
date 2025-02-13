"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { getUsers } from "./actions";
type User={id: string, name: string, avatar: string}

export function Room({ children }: { children: ReactNode }) {
    const params = useParams()
    const [users, setUsers] = useState<User[]>([])
    const fetchUsers = useMemo(()=>async()=>{
      try {
        const list = await getUsers()
        setUsers(list)
      } catch (error) {
        console.log('Failed to fetch users', error);
        
      }
    },[])

    useEffect(()=>{fetchUsers()},[fetchUsers])
  return (
    <LiveblocksProvider authEndpoint='/api/liveblocks-auth' throttle={16} resolveUsers={({userIds})=>{
      return userIds.map((userId)=> users.find((user)=> user.id===userId)?? undefined)
    }} resolveMentionSuggestions={({text})=>{
      let filteredUsers = users;
      if(text){
        filteredUsers = users.filter((user)=>user.name.toLowerCase().includes(text.toLowerCase()))
      }
      return filteredUsers.map((user)=>user.id)
    }} resolveRoomsInfo={()=>[]} >
      <RoomProvider id={params.documentId as string} initialStorage={{leftMargin: 56, rightMargin:56}}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}