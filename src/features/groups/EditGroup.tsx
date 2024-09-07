import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UPDATE_GROUP } from "@/services/groups";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import ModalForm from "@/ui/ModalForm";
import Spinner from "@/ui/Spinner";
import { EditGroupProps, UpdateGroupVariables } from "@/types/groups";
import { useGroupsStore } from '@/stores/groupsStore';

type ChangeEvent = React.ChangeEvent<HTMLInputElement>;
type SubmitEvent = React.FormEvent<HTMLFormElement>;

const EditGroup: React.FC<EditGroupProps> = ({ groupId, courseId, onEdit }) => {
    const { t } = useTranslation();
    const updateGroupNameInStore = useGroupsStore((state) => state.updateGroup);

    const [updateGroup, { loading }] = useMutation<void, UpdateGroupVariables>(UPDATE_GROUP, {
        onCompleted: () => {
            onEdit('success');
        },
        onError: () => {
            onEdit('failed');
        }
    });

    const [groupNameEn, setGroupNameEn] = useState<string>("");
    const [groupNameAr, setGroupNameAr] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean>(false);

    const groupNameEnHandler = ({ target: { value } }: ChangeEvent) => {
        setGroupNameEn(value);
        setGroupNameAr(value);
    };

    const submitHandler = async (e: SubmitEvent) => {
        e.preventDefault();
        if (isValid) {
            updateGroupNameInStore(groupId, groupNameEn, groupNameAr, courseId);
            await updateGroup({
                variables: { groupNameEn, groupNameAr, id: groupId, courseId: courseId },
            });
        }
    };

    const validateInput = () => {
        setIsValid(groupNameEn.trim() !== "" && groupNameAr.trim() !== "");
    };

    useEffect(() => {
        validateInput();
    }, [groupNameEn, groupNameAr]);

    return (
        <>
            <ModalForm onSubmit={submitHandler}>
                <Input
                    id="groupNameEn"
                    variant="secondary"
                    label={t("GroupName")}
                    height="medium"
                    type="text"
                    autoComplete="off"
                    value={groupNameEn}
                    placeholder={t(`editGroupName`)}
                    required
                    onChange={groupNameEnHandler}
                />
                <Button
                    variant={isValid ? "primary" : "secondary"}
                    size="medium"
                    width="full"
                    disabled={!isValid || loading}
                    type="submit"
                >
                    {loading ? <Spinner size="1.5rem" /> : t("editGroupName")}
                </Button>
            </ModalForm>
        </>
    );
};

export default EditGroup;
