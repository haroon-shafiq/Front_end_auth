"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/login-schema";
import { ROUTES } from "../constants/routes.js";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginUser } from "@/services/auth";
import { showToast } from "@/lib/toast.js";
import { useRouter } from "next/navigation";
import Link from "next/link.js";

export function SignInForm({ className, ...props }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      const res = await loginUser(values);
      // localStorage.setItem("token", res.data);
      showToast.success("Login successful ");

      // console.log("User logged in:", res);

      form.reset();
      router.push(ROUTES.ui.AUTH.DASHBOARD);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 md:h-[420px]">
          <div className="relative hidden bg-muted md:block">
            <img
              src="/signup.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold">Sign In</h1>
                <p className="text-lg text-muted-foreground">
                  Enter your email and password
                </p>
              </div>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...form.register("email")}
                  className={
                    form.formState.errors.email
                      ? "border-red-500"
                      : form.formState.touchedFields.email
                  }
                />

                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  {...form.register("password")}
                  className={
                    form.formState.errors.password
                      ? "border-red-500"
                      : form.formState.touchedFields.password
                  }
                />

                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}

                {/* <FieldDescription>
                  Must be at least 6 characters long.
                </FieldDescription> */}
              </Field>

              <Field>

                <Button type="submit" className="w-full">
                  Sign In
                </Button>

              </Field>

              <FieldDescription className="text-center">
                Don’t have an account?{" "}
                <Link href={ROUTES.ui.AUTH.REGISTER}>Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
