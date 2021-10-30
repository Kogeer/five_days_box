import React from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";

interface SignUpFormProps {
    handleSubmit: (data: FormData) => void;
}

interface FormData {
    name: string;
    email: string;
    password: string;
}

const SignUpForm = ({handleSubmit}: SignUpFormProps): JSX.Element => {
    const {
        register,
        handleSubmit: submitHandler,
        formState: {errors, touchedFields}
    } = useForm<FormData>({
        mode: 'onTouched'
    });

    return (
        <div className="align-middle">
            <Form onSubmit={submitHandler(handleSubmit)} noValidate>
                <Form.Group className="mb-3">
                    <Form.Control
                        {...register('name', {
                            required: true,
                            minLength: 3,
                        })}
                        placeholder="Name"
                        isInvalid={touchedFields.name && !!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                        Name is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        {...register('email', {
                            required: true,
                            minLength: 3,
                        })}
                        placeholder="E-mail"
                        isInvalid={touchedFields.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        E-mail is required!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control
                        {...register('password', {
                            required: true,
                            minLength: 4
                        })}
                        placeholder="Password"
                        type="password"
                        isInvalid={touchedFields.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        Password is required and minimum 4 length!
                    </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" onClick={submitHandler(handleSubmit)}>
                    Sign up
                </Button>
            </Form>
        </div>
    );
}

export default SignUpForm;
