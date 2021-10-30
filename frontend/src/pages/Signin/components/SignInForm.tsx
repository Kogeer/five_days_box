import React from "react";
import {useForm} from "react-hook-form";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

interface SignInFormProps {
    handleSubmit: (data: FormData) => void;
}

interface FormData {
    email: string;
    password: string;
}

const SignInForm = ({handleSubmit}: SignInFormProps): JSX.Element => {
    const {
        register,
        handleSubmit: submitHandler,
        formState: {errors, touchedFields}
    } = useForm<FormData>({
        mode: 'onBlur'
    });

    return (
        <div className="align-middle">
            <Form onSubmit={submitHandler(handleSubmit)} noValidate>
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
                <div className="d-flex justify-content-between">
                    <Button variant="primary" onClick={submitHandler(handleSubmit)}>
                        Sign in
                    </Button>
                    <Link to="/auth/signup" className="d-flex justify-content-center">
                        <Button>Sign up</Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
}

export default SignInForm;
