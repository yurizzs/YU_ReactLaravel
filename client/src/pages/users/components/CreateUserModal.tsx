import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import { notify } from "../../../util/notify";
import { InputField, FileUploadField, PasswordInputField } from "../../../components/ui/forms";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateUserModal = ({ isOpen, onClose }: Props) => {
    const [isLoading, setIsLoading] = useState(false);

    const initialFormState = {
        avatar: null as File | null,
        name: "",
        email: "",
        password: "",
        confirm_password: "",
    };

    const [form, setForm] = useState(initialFormState);

    const handleFileSelect = (files: File[]) => {
        setForm((prev) => ({
            ...prev,
            avatar: files[0] || null,
        }));
    };
    
    
    const handleChange = (name: string, value: string) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            notify.success("User added!");
            setForm({...initialFormState});
            onClose();
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create User"
            size="md"
            primaryAction={{
                label: "Create",
                onClick: handleSubmit,
                variant: "primary",
                iconName: "FaFloppyDisk",
                isLoading,
                loadingText: "Creating User..."
            }}
            secondaryAction={{
                label: "Cancel",
                onClick: onClose,
                variant: "secondary",
            }}
            >
            <form className="space-y-4">

                <FileUploadField
                label="Avatar"
                name="avatar_url"
                accept="image/jpg,jpeg,png"
                onFileSelect={handleFileSelect}
                />
                <InputField
                    name="name"
                    label="Name"
                    type="text"
                    placeholder="Enter your name"
                    required
                    fullWidth
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    iconName="FaUser"
                />
                <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    required
                    fullWidth
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    iconName="FaEnvelope"
                />
                <PasswordInputField
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    fullWidth
                />
                <PasswordInputField
                    name="confirm_password"
                    label="Confirm Password"
                    placeholder="Enter your confirm password"
                    fullWidth
                />

            </form>
        </Modal>
    );
};

export default CreateUserModal;