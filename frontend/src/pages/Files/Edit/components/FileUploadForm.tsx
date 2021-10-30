import React from "react";
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";

interface FileUploadFormProps {
    handleSubmit: () => void;
    handleChange: (event: any) => void;
}

interface FormData {
    file: string;
}

const FileUploadForm = ({handleSubmit, handleChange}: FileUploadFormProps) => {
    const {
        register,
        handleSubmit: submitHandler,
        formState: {errors, touchedFields}
    } = useForm<FormData>({
        mode: 'onChange',
        reValidateMode: 'onBlur'
    });

    return (
        <div className="align-middle">
            <h1 className="text-center">Upload file</h1>
            <Form onSubmit={submitHandler(handleSubmit)} data-testid="fileForm">
                <Form.Group className="mb-3">
                    <Form.Control
                        {...register('file', {
                            validate: {
                                required: value => value.length > 0
                            }
                        })}
                        type="file"
                        placeholder="File"
                        isInvalid={touchedFields.file && !!errors.file}
                        onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                        File is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" onClick={submitHandler(handleSubmit)}>
                    Save
                </Button>
            </Form>
        </div>
    );
}

export default FileUploadForm;
