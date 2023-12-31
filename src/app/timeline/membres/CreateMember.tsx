"use client";

import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FormikHelpers, useFormik } from "formik";
import { FormattedMessage, useIntl } from "react-intl";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";

import { HiUser, HiUserAdd, HiCash } from "react-icons/hi";

import { MemberType } from "../../../../types";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AuthContext } from "@/components/contexts/authContext";
import { SnackAlertContext } from "@/components/contexts/snackAlertContext";
type CreateMemberProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  member: MemberType;
};
export default function CreateMember({
  open,
  setOpen,
  member,
}: CreateMemberProps) {
  const router = useRouter();
  //   const [open, setOpen] = React.useState(false);
  const intl = useIntl();
  const { user } = useContext(AuthContext);
  const { handleOpenAlert } = useContext(SnackAlertContext);

  const [creating, setCreating] = useState(false);
  const [errors, setErrors] = useState({
    nom: "",
    prenom: "",
    contact: "",
    email: "",
    password: "",
  });
  const validationSchema = () => {
    if (formik.values.nom.trim() === "") {
      setErrors((_) => ({
        ...errors,
        nom: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.prenom.trim() === "") {
      setErrors((_) => ({
        ...errors,
        prenom: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.contact.trim() === "") {
      setErrors((_) => ({
        ...errors,
        contact: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.contact.trim()?.length <= 10) {
     handleOpenAlert("info",intl.formatMessage({ id: "contact-length" }))
      setErrors((_) => ({
        ...errors,
        contact: intl.formatMessage({ id: "contact-length" }),
      }));
      return false;
    }
    if (formik.values.email.trim() === "") {
      setErrors((_) => ({
        ...errors,
        email: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    if (formik.values.password?.trim() === "") {
      setErrors((_) => ({
        ...errors,
        password: intl.formatMessage({ id: "req-field" }),
      }));
      return false;
    }
    return true;
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (
    values: typeof member,
    resetForm: FormikHelpers<{
      id: string | number | undefined;
      nom: string;
      prenom: string;
      contact: string;
      email: string;
      password: string | undefined;
      role: string;
    }>
  ) => {
    let res: any = "";

    setCreating(true);
    try {
      if (member.id)
        res = await fetch(
          `${process.env.NEXT_PUBLIC_ROOT_API}/membres/${member.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(values),
          }
        );
      else
        res = await fetch(`${process.env.NEXT_PUBLIC_ROOT_API}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify(values),
        });
      // cb()
      await res.json();
      setCreating(false);
      resetForm.resetForm();

      member.id
        ? handleOpenAlert("success", <FormattedMessage id="edit-succ" />)
        : handleOpenAlert("success", <FormattedMessage id="create-succ" />);
      handleCloseDialog();
      router.push("/timeline/membres?page=0&size=10");
    } catch (error) {
      setCreating(false);
      handleOpenAlert("error", <FormattedMessage id="operation-failed" />);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: member.id,
      nom: member.nom,
      prenom: member.prenom,
      contact: member.contact,
      email: member.email,
      password: member.password,
      role: member.role,
    },
    onSubmit: async (values, resetForm) => {
      if (validationSchema()) await handleSubmit(values, resetForm);
    },
  });

  const handleCloseDialog = () => {
    formik.resetForm();
    setErrors({
      nom: "",
      prenom: "",
      contact: "",
      email: "",
      password: "",
    });
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleCloseDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Creér un membre"}</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                <FormattedMessage
                  id="nom"
                  description="izina"
                  defaultMessage="heheheh"
                />
              </InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("nom")}
                error={Boolean(errors.nom)}
                helperText={errors.nom}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="prenom" />
              </InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("prenom")}
                error={Boolean(errors.prenom)}
                helperText={formik.touched.prenom && errors.prenom}
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>
                <FormattedMessage id="contact" />
              </InputLabel>

              <PhoneInput
                country={"us"}
                inputStyle={{ width: "100%" }}
                {...formik.getFieldProps("contact")}
                onChange={(phone) => {
                  formik.setFieldValue("contact", "+" + phone);
                }}
                
              />
              <small className="text-red-800">
                {formik.values.contact && formik.errors.contact}
              </small>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel sx={{ fontWeight: "bold" }}>Email</InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("email")}
                error={Boolean(errors.email)}
                helperText={errors.email}
                type="email"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel sx={{ fontWeight: "bold" }}>Password</InputLabel>
              <TextField
                fullWidth
                id="nom"
                {...formik.getFieldProps("password")}
                error={Boolean(errors.password)}
                helperText={errors.password}
                type="text"
                size="small"
                required
              />
            </Grid>
            <Grid item xs={12} display="flex" gap="1rem" flexDirection="row">
              <Stack
                onClick={() => formik.setFieldValue("role", "ADMIN")}
                className="transition-all duration-500"
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  ":hover": { cursor: "pointer", backgroundColor: "#62A388" },
                  backgroundColor:
                    formik.values.role === "ADMIN" ? "#62A388" : "white",
                  boxShadow:
                    " 0 4px 8px 0 rgba(160, 158, 158, 0.2),0 6px 20px 0 rgba(221, 218, 218, 0.3)",
                  paddingY: "1rem",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HiUserAdd size={20} />
                <Typography>admin</Typography>
              </Stack>
              <Stack
                onClick={() => formik.setFieldValue("role", "USER")}
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  ":hover": { cursor: "pointer", backgroundColor: "#62A388" },
                  backgroundColor:
                    formik.values.role === "USER" ? "#62A388" : "white",
                  boxShadow:
                    "0 4px 8px 0 rgba(160, 158, 158, 0.2),0 6px 20px 0 rgba(221, 218, 218, 0.3)",
                  paddingY: "1rem",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HiUser size={20} />
                <Typography>user</Typography>
              </Stack>
              <Stack
                onClick={() => formik.setFieldValue("role", "TRESORIER")}
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  ":hover": { cursor: "pointer", backgroundColor: "#62A388" },
                  backgroundColor:
                    formik.values.role === "TRESORIER" ? "#62A388" : "white",
                  boxShadow:
                    "0 4px 8px 0 rgba(160, 158, 158, 0.2),0 6px 20px 0 rgba(221, 218, 218, 0.3)",
                  paddingY: "1rem",
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <HiCash size={20} />
                <Typography>tresorier</Typography>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type="submit" disabled={!formik.dirty || creating}>
            {member.id ? (
              <FormattedMessage id="edit" />
            ) : (
              <FormattedMessage id="create" />
            )}
          </Button>
          <Button
            onClick={handleCloseDialog}
            disabled={!formik.dirty || creating}
            autoFocus
            color="error"
          >
            <FormattedMessage id="cancel" />
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
