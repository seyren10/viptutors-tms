<script setup lang="ts">
import type { LoginPayload } from '@/features/user/type';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLogin } from '@/features/user/queries';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Alert, AlertTitle } from '@/components/ui/alert';
import AlertDescription from '@/components/ui/alert/AlertDescription.vue';
import type { LaravelError } from '@/types/http';
import { CircleX } from 'lucide-vue-next';

const { mutate: loginMutate, isPending, isError } = useLogin()
const router = useRouter()
const errorMessage = ref<string>()
const loginPayload = ref<LoginPayload>({
    email: '',
    password: ''
})

const handleLogin = () => {
    loginMutate(loginPayload.value, {
        onSuccess: () => {
            router.replace({ name: 'userTasks' })
        },
        onError: (err) => {
            errorMessage.value = (err as LaravelError).response?.data.message
        }
    })
}

</script>

<template>
    <div class="h-screen grid place-content-center ">
        <Card class="md:w-md">
            <CardHeader>
                <CardTitle class="text-2xl">
                    Login
                </CardTitle>
                <CardDescription>
                    Enter your email below to login to your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form class="grid gap-4" @submit.prevent="handleLogin">
                    <Alert variant="destructive" v-if="isError">
                        <CircleX class="size-4" />
                        <AlertTitle>Error logging in</AlertTitle>
                        <AlertDescription>{{ errorMessage }}</AlertDescription>
                    </Alert>
                    <div class="grid gap-2">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required
                            v-model="loginPayload.email" />
                    </div>
                    <div class="grid gap-2">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" required v-model="loginPayload.password" />
                    </div>
                    <Button type="submit" class="w-full" :disabled="isPending">
                        Login
                    </Button>
                    <Button variant="outline" class="w-full">
                        Login with Google
                    </Button>
                </form>
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <a href="#" class="underline">
                        Sign up
                    </a>
                </div>
            </CardContent>
        </Card>

    </div>
</template>



<style lang="scss" scoped></style>