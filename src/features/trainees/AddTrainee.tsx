import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import Flex from "@/ui/Flex";
import ModalForm from "@/ui/ModalForm";
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { useParams } from "react-router-dom";
import { useTraineesStore } from "@/stores/traineesStore";
import { GET_TRAINEES_BY_GROUP_ID, UPLOAD_TRAINEES } from "@/services/trainees";
import Spinner from "@/ui/Spinner";

interface AddTraineeProps {
    onActionComplete: (actionType: "save" | "addMore", success: boolean) => void;
    pageNumber: number;
}

const AddTrainee: React.FC<AddTraineeProps> = ({ onActionComplete, pageNumber }) => {
    const { t } = useTranslation();
    const { groupId } = useParams();
    const { setTraineesList } = useTraineesStore();

    const [firstName, setFirstName] = useState<string>("");
    const [midName, setMidName] = useState<string>("");
    const [thirdName, setThirdName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");


    const { refetch } = useQuery(GET_TRAINEES_BY_GROUP_ID, {
        variables: { groupId: Number(groupId), pageNumber, pageSize: 6 },
        skip: true,
    });

    const [clickedButton, setClickedButton] = useState<"save" | "addMore" | null>(null);

    const [uploadTrainees, { loading }] = useMutation(UPLOAD_TRAINEES, {
        onCompleted: async (data) => {
            if (data) {
                try {
                    const refetchResult = await refetch();
                    const traineeData = refetchResult?.data?.traineeByGroupId?.traineeDetails?.data;
                    if (traineeData?.length > 0) {
                        setTraineesList({
                            traineesData: refetchResult.data.traineeByGroupId.traineeDetails.data,
                            currentPage: refetchResult.data.traineeByGroupId.traineeDetails.currentPage,
                            hasNextPage: refetchResult.data.traineeByGroupId.traineeDetails.hasNextPage,
                            hasPreviousPage: refetchResult.data.traineeByGroupId.traineeDetails.hasPreviousPage,
                            pageSize: refetchResult.data.traineeByGroupId.traineeDetails.pageSize,
                            totalCount: refetchResult.data.traineeByGroupId.traineeDetails.totalCount,
                            totalPages: refetchResult.data.traineeByGroupId.traineeDetails.totalPages,
                            groupDetails: refetchResult.data.traineeByGroupId.groupDetails,
                        });
                        setFirstName("");
                        setMidName("");
                        setThirdName("");
                        setLastName("");
                        setEmail("");
                        setPhoneNumber("");
                    }

                    onActionComplete(clickedButton!, true);
                } catch (error) {

                    onActionComplete(clickedButton!, false);
                }
            } else {
                onActionComplete(clickedButton!, false);
            }
            setClickedButton(null);
        },
        onError: (error) => {
            console.error("Error adding trainee:", error);
            onActionComplete(clickedButton!, false);
            setClickedButton(null);
        },
    });
    const handleSubmit = (buttonType: "save" | "addMore") => (e: React.FormEvent) => {
        e.preventDefault();
        setClickedButton(buttonType);
        uploadTrainees({
            variables: {
                email,
                firstName,
                fullName: `${firstName} ${midName} ${lastName}`,
                lastName,
                midName,
                phoneNumber,
                thirdName,
                traineeGroupId: Number(groupId),
            },
        });
    };

    const isFormValid = firstName && midName && thirdName && lastName && email && phoneNumber;
    return (
        <ModalForm onSubmit={handleSubmit("addMore")}>
            <Flex justify="space-between" gap={10} direction="row" wrap="nowrap">
                <Input
                    id="FirstName"
                    variant="secondary"
                    label={t("FirstName")}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t("FirstName")}
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    id="MiddleName"
                    variant="secondary"
                    label={t("MiddleName")}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t("MiddleName")}
                    required
                    value={midName}
                    onChange={(e) => setMidName(e.target.value)}
                />
            </Flex>
            <Flex justify="space-between" gap={10} direction="row" wrap="nowrap">
                <Input
                    id="ThirdName"
                    variant="secondary"
                    label={t("ThirdName")}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t("ThirdName")}
                    required
                    value={thirdName}
                    onChange={(e) => setThirdName(e.target.value)}
                />
                <Input
                    id="LastName"
                    variant="secondary"
                    label={t("LastName")}
                    type="text"
                    height="medium"
                    width="100%"
                    placeholder={t("LastName")}
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </Flex>
            <Input
                id="Email"
                variant="secondary"
                label={t("Email")}
                type="email"
                height="medium"
                width="100%"
                placeholder={t("Email")}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                id="PhoneNumber"
                variant="secondary"
                label={t("PhoneNumber")}
                type="text"
                height="medium"
                width="100%"
                placeholder={t("PhoneNumber")}
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Flex justify="space-between" gap={10} direction="row" wrap="nowrap">
                <Button
                    key={"addMore"}
                    variant={loading && clickedButton === "addMore" ? "secondary" : "tertiary"}
                    size="medium"
                    width="full"
                    disabled={loading && clickedButton === "addMore" || !isFormValid}
                    type="submit"
                    onClick={handleSubmit("addMore")}
                >
                    {loading && clickedButton === "addMore" ? (
                        <Spinner size="1.5rem" />
                    ) : (
                        t("SaveAddMore")
                    )}
                </Button>
                <Button
                    key={"save"}
                    variant={loading && clickedButton === "save" || !isFormValid ? "secondary" : "primary"}
                    size="medium"
                    width="full"
                    disabled={loading && clickedButton === "save" || !isFormValid}
                    type="submit"
                    onClick={handleSubmit("save")}
                >
                    {loading && clickedButton === "save" ? (
                        <Spinner size="1.5rem" />
                    ) : (
                        t("AddTrainee")
                    )}
                </Button>
            </Flex>
        </ModalForm>
    );
};

export default AddTrainee;