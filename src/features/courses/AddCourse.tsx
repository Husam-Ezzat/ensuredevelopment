import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ADD_COURSE } from "@/services/courses";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import ModalForm from "@/ui/ModalForm";
import Spinner from "@/ui/Spinner";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import i18next from 'i18next';
import { AddCourseResponse, AddCourseVariables } from "@/types/courses";

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SubmitEvent = React.FormEvent<HTMLFormElement>;

const AddCourse: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = i18next.language;

  const [addCourse, { data, loading, error }] = useMutation<AddCourseResponse, AddCourseVariables>(ADD_COURSE);
  const [courseName, setCourseName] = useState<string>("");
  const [groupName, setGroupName] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const courseChangeHandler = ({ target: { value } }: ChangeEvent) => {
    setCourseName(value);
  };

  const groupChangeHandler = ({ target: { value } }: ChangeEvent) => {
    setGroupName(value);
  };

  const submitHandler = async (e: SubmitEvent) => {
    e.preventDefault();
    await addCourse({
      variables: { name: courseName, groupName: groupName },
    });
  };

  useEffect(() => {
    if (data) {
      const { courseId, groupId } = data.addCourse.addCourseResult;
      navigate(`/courses/${courseId}/groups/${groupId}/trainees`, {
        state: { isNewCourse: true },
      });
    }
    if (error) {
      toast.warning(t(`Somethingwentwrong`));
    }
  }, [data, error, navigate]);

  const validateInput = () => {
    setIsValid(courseName?.trim() !== "" && groupName?.trim() !== "");
  };

  useEffect(() => {
    validateInput();
  }, [courseName, groupName]);

  return (
    <>
      <ModalForm onSubmit={submitHandler}>
        <Input
          id="course"
          variant="secondary"
          label={t("CourseName")}
          type="text"
          value={courseName}
          placeholder={t(`AddCourseName`)}
          height="medium"
          required
          onChange={courseChangeHandler}
        />
        <Input
          id="group"
          variant="secondary"
          label={t("GroupName")}
          type="text"
          height="medium"
          value={groupName}
          placeholder={t(`AddGroupName`)}
          required
          onChange={groupChangeHandler}
        />
        <Button
          variant={isValid ? "primary" : "secondary"}
          size="medium"
          width="full"
          disabled={!isValid || loading}
          type="submit"
        >
          {loading ? <Spinner size="1.5rem" /> : t("AddCourse")}
        </Button>
      </ModalForm>
      <Toaster
        richColors
        closeButton
        position="top-center"
        dir={lang === 'ar' ? 'rtl' : 'ltr'}
        toastOptions={{
          style: {
            background: 'var(--color-rejected-100)',
            color: 'var(--color-rejected-500)',
          }
        }}
      />
    </>
  );
};

export default AddCourse;
