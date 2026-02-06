"use client";
import { motion } from "motion/react";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import { Controller } from "react-hook-form";
import { useSignUp } from "../hooks/use-sign-up";

export default function SignUpForm() {
  const { form, onSubmit } = useSignUp();

  return (
    <motion.div
      initial={{ y: 40, opacity: 0, scale: 0.97 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full sm:max-w-md"
    >
      <Card className="w-full sm:max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <CardHeader>
            <CardTitle>Welcome to CodeLeap network!</CardTitle>
            <CardDescription>
              Enter your information below to create your account.
            </CardDescription>
          </CardHeader>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <CardContent>
            <form id="form-sign-up" onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <Controller
                  name="username"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="username">
                        Please enter your username
                      </FieldLabel>
                      <Input
                        {...field}
                        id="username"
                        placeholder="John Doe"
                        autoComplete="off"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <CardFooter className="flex justify-end">
            <Button type="submit" form="form-sign-up">
              Enter
            </Button>
          </CardFooter>
        </motion.div>
      </Card>
    </motion.div>
  );
}
