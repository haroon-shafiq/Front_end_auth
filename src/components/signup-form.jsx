"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validations/register-schema";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth";
import { ROUTES } from "../constants/routes.js";
import { showToast } from "@/lib/toast.js";
import { useState } from "react";
import { useRouter } from "next/navigation.js";
import Link from "next/link.js";

export function SignupForm({ className, ...props }) {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    setSubmitting(true);
    try {
      const res = await registerUser(values);
      showToast.success("Account created");
      // console.log("User created:", res);

      setTimeout(() => {
        router.push(ROUTES.AUTH.LOGIN);
      }, 500);

      form.reset();
    } catch (error) {
      console.log("Error", error);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 ">
        <div className="grid p-0 md:grid-cols-2 items-stretch md:h-[520px]">
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold">Create your account</h1>
                <p className="text-lg text-muted-foreground">
                  Enter your details below
                </p>
              </div>

              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  {...form.register("name")}
                  className={
                    form.formState.errors.name
                      ? "border-red-500"
                      : form.formState.touchedFields.name
                  }
                />

                <p className="text-sm text-red-500 ">
                  {form.formState.errors.name?.message}
                </p>
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...form.register("email")}
                  className={
                    form.formState.errors.email
                      ? "border-red-500 "
                      : form.formState.touchedFields.email
                  }
                />

                <p className="text-sm text-red-500 ">
                  {form.formState.errors.email?.message}
                </p>
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

                <p className="text-sm text-red-500 ">
                  {form.formState.errors.password?.message}
                </p>

          
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  onClick={() => setSubmitting(true)}
                >
                  {isSubmitting ? "Creating..." : "Create"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href={ROUTES.AUTH.LOGIN}>Login</Link>
              </FieldDescription>
            </FieldGroup>
          </form>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/signup.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
