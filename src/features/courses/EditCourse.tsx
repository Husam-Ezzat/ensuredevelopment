import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EDIT_COURSE } from "@/services/courses";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import ModalForm from "@/ui/ModalForm";
import Spinner from "@/ui/Spinner";
import { EditCourseProps, EditCourseVariables } from "@/types/courses";
import { useCoursesStore } from '@/stores/coursesStore';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SubmitEvent = React.FormEvent<HTMLFormElement>;

const EditCourse: React.FC<EditCourseProps> = ({ courseId, onEdit }) => {
    const { t } = useTranslation();
    const updateCourseInStore = useCoursesStore((state) => state.updateCourse);

    const [updateCourse, { loading }] = useMutation<void, EditCourseVariables>(EDIT_COURSE, {
        onCompleted: () => {
            onEdit('success');
        },
        onError: () => {
            onEdit('faild');
        }
    });

    const [courseName, setCourseName] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);

    const courseEditHandler = ({ target: { value } }: ChangeEvent) => {
        setCourseName(value);
    };

    const submitHandler = async (e: SubmitEvent) => {
        e.preventDefault();
        if (isValid) {
            updateCourseInStore({ id: courseId, name: courseName } as any);
            await updateCourse({
                variables: { courseName: courseName, id: courseId },
            });
        }
    };

    const validateInput = () => {
        setIsValid(courseName.trim() !== "");
    };

    useEffect(() => {
        validateInput();
    }, [courseName]);

    return (
        <>
            <ModalForm onSubmit={submitHandler}>
                <Input
                    id="courseName"
                    variant="secondary"
                    label={t("CourseName")}
                    height="medium"
                    type="text"
                    autoComplete="off"
                    value={courseName}
                    placeholder={t(`EditCourseName`)}
                    required
                    onChange={courseEditHandler}
                />
                <Button
                    variant={isValid ? "primary" : "secondary"}
                    size="medium"
                    width="full"
                    disabled={!isValid || loading}
                    type="submit"
                >
                    {loading ? <Spinner size="1.5rem" /> : t("EditCourseName")}
                </Button>
            </ModalForm>
        </>
    );
};

export default EditCourse;
