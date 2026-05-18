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

import { showToast } from "@/lib/toast.js";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import Link from "next/link.js";

import { acceptInvite } from "@/services/projects.js";

import { useState } from "react";

import { CircleLoader } from "react-spinners";

export function SignInForm({ className, ...props }) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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

      setLoading(true);
      const invitationToken = localStorage.getItem("inviteToken");

      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        showToast.error("Invalid email or password");
        setLoading(false);
        return;
      }


      if (invitationToken) {

        try {

          const inviteRes = await acceptInvite(invitationToken);
          localStorage.removeItem("inviteToken");
          setMessage(inviteRes.message || "User verified successfully");

          // router.push(ROUTES.ui.AUTH.DASHBOARD);
          return;
        } catch (error) {
          console.error("Error===========+>>>>>>>>>", error)
          setLoading(false);
          return;
        }
      }
      showToast.success("Login successful");
      form.reset();
      router.push(ROUTES.ui.AUTH.DASHBOARD);
    } catch (error) {

      console.log(error);

      showToast.error("Something went wrong");

    } finally {

      setLoading(false);
    }
  }


  if (loading || message) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">

        {loading && <CircleLoader size={80} />}

        {message && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold">
              You're Verified!
            </h2>

            <p className="text-muted-foreground">
              {message}
            </p>
            <button
              onClick={() => {
                router.push(ROUTES.ui.AUTH.DASHBOARD);
              }}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 md:h-[420px]">

          <div className="relative hidden bg-muted md:block">
            <img
              src="/signup.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="p-6 md:p-8"
          >

            <FieldGroup>

              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-3xl font-bold">
                  Sign In
                </h1>

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
                />

                {form.formState.errors.password && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </Field>

              <FieldDescription className="text-center">
                Don’t have an account?{" "}
                <Link href={ROUTES.ui.AUTH.REGISTER}>
                  Sign up
                </Link>
              </FieldDescription>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}