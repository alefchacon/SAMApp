import React, { Component } from "react";
// FORMS
import LocationForm from "../../../features/specimens/newSpecimen/LocationForm";
import ContributorsForm from "@/features/specimens/newSpecimen/ContributorsForm";
import MorphometricMeasuresForm from "@/features/specimens/newSpecimen/MorphometricMeasuresForm";
import { Specie } from "@/features/specie/domain/Specie";
// COMPONENTS
import Stepper from "@/components/ui/Stepper";
import CardSpecie from "../../../features/specie/components/CardSpecie";
import { Formik, Form, FormikProps, FormikErrors, FormikTouched } from "formik";
import { specimenSchema } from "../../../features/specimens/formikSchemas/specimenSchema";
import Page from "@/components/ui/Page";

import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import useContributorsAndRoles from "../../../features/contributors/businessLogic/useContributorsAndRoles";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
// import SpecimenFormik from "../../../features/specimens/domain/specimenFormik";
import Specimen, {
  defaultSpecimen,
  ISpecimen,
} from "@/features/specimens/domain/model/Specimen";
import { useState } from "react";
import Step from "@/components/ui/Step";
import Button from "@/components/ui/ButtonCustom";
import { decimalRegex } from "@/validation/regexes";

interface ISpecimenFormProps {
  onResetScroll: () => void;
}
export default function SpecimenForm({ onResetScroll }: ISpecimenFormProps) {
  const { addSpecimen } = useSpecimens();
  const { addContributorSpecimen } = useContributorsAndRoles();
  const { showSnackbar } = useSnackbar();
  const [invalidSteps, setInvalidSteps] = useState<string[]>([]);
  const location = useLocation();
  const selectedSpecie = location.state.specie;

  const handleSubmit = async (values: ISpecimen) => {
    console.error("submitting");
    const responseSpecimen = await addSpecimen(values, selectedSpecie.id);
  };

  //I thought of using selectedStepId as a way of controlling the Stepper
  //with the URL, but I never got around to implementing it.
  //It's currently being used for validation.
  const stepIds = Object.freeze({
    colectStep: "colecta",
    morphometricMeasuresStep: "medidas-morfometricas",
    locationStep: "ubicacion",
  });

  const colectFields = [
    "colector",
    "preparator",
    "colection_code",
    "colection_date",
    "colection_number",
    "nature",
    "status",
  ];
  const findInvalidSteps = (errors: FormikErrors<ISpecimen>) => {
    setInvalidSteps([]);
    const errorKeys = Object.keys(errors);

    if (errorKeys.length < 1) {
      return;
    }
    let newInvalidSteps = [];
    for (const key of errorKeys) {
      if (colectFields.includes(key)) {
        newInvalidSteps.push(stepIds.colectStep);
      } else if (key === "location") {
        newInvalidSteps.push(stepIds.locationStep);
      } else {
        newInvalidSteps.push(stepIds.morphometricMeasuresStep);
      }
    }
    setInvalidSteps(newInvalidSteps);
  };

  const handleValidation = async (formik: FormikProps<ISpecimen>) => {
    const errors = await formik.validateForm().then((errors) => {
      const allFieldsTouched = markAllFieldsTouched(formik.values);
      formik.setTouched(allFieldsTouched);
      return errors;
    });

    findInvalidSteps(errors);

    if (Object.entries(errors).length > 0) {
      showSnackbar({
        content: "Por favor, corrija los errores antes de continuar",
        isError: true,
      });
      return;
    }
    formik.submitForm();
  };

  /*
    Fields need to be touched in order to show their error message.
    Typically, when Formik submits, it sets every field as touched.
    Our validation procedure needs to run validateForm() manually
    in order to get the list of errors.
    The problem with validateForm() is that it does not set the fields
    as touched, so we need to do that manually as well.
    The problem with THAT is that the Specimen object has a
    nested location object in it, so in order to set it as 
    touched I had to do recursion.
  */

  function markAllFieldsTouched<T extends object>(values: T): FormikTouched<T> {
    const touched = {} as FormikTouched<T>;

    function recurse(currentValues: any, currentTouched: any) {
      Object.keys(currentValues).forEach((key) => {
        const val = currentValues[key];
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          currentTouched[key] = {};
          recurse(val, currentTouched[key]);
        } else {
          currentTouched[key] = true;
        }
      });
    }

    recurse(values, touched);
    return touched;
  }

  return (
    <Page
      title={"Agregar espécimen"}
      subtitle={<CardSpecie specie={new Specie(selectedSpecie)} />}
    >
      <Formik
        validationSchema={specimenSchema}
        initialValues={defaultSpecimen}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formik) => (
          <Form className="w-100" autoComplete="off">
            <Stepper
              onEndButtonClick={() => handleValidation(formik)}
              selectedStepId={"medidas-morfometricas"}
              onResetScroll={onResetScroll}
              invalidSteps={invalidSteps}
            >
              <Step
                label={"Medidas morfométricas"}
                id={"medidas-morfometricas"}
              >
                <MorphometricMeasuresForm></MorphometricMeasuresForm>
              </Step>
              <Step label={"Ubicación"} id={"ubicacion"}>
                <LocationForm></LocationForm>
              </Step>
              <Step label={"Colecta"} id={"colecta"}>
                <ContributorsForm></ContributorsForm>
              </Step>
            </Stepper>
            <Button onClick={() => handleValidation(formik)}>Test</Button>
          </Form>
        )}
      </Formik>
    </Page>
  );
}
