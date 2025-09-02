<script setup lang="ts">
import { LoaderCircle, LogOut, User2 } from 'lucide-vue-next';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import DropdownMenuLabel from '../ui/dropdown-menu/DropdownMenuLabel.vue';
import { useUserStore } from '@/features/user/store';
import { storeToRefs } from 'pinia';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { logout } from '@/features/user/api';
import { useRouter } from 'vue-router';
import { queryClient } from '@/services/vue-query';

const userStore = useUserStore()
const { user, userInitials } = storeToRefs(userStore)
const router = useRouter()

const { mutate: logoutMutate, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
        queryClient.removeQueries();
        router.replace({ name: 'login' })
        user.value = null;
    }
})
</script>

<template>
    <header class="p-2 bg-primary text-background flex items-center justify-between">
        <h1 class="text-lg font-bold">VIPTUTORS TMS</h1>
        <DropdownMenu v-if="user">
            <DropdownMenuTrigger>
                <LoaderCircle class="animate-spin" v-if="isPending" />
                <Button size="icon" variant="ghost" class="rounded-full" v-else>
                    <User2 />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarFallback className="rounded-lg">{{ userInitials }}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{{ user?.name }}</span>
                            <span className="truncate text-xs">{{ user?.email }}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem @select="() => logoutMutate()">
                    <LogOut />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </header>
</template>


<style scoped></style>