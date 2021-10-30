import {act, fireEvent} from "@testing-library/react";

export const setFieldValue = async (fieldElement: HTMLElement, value: string): Promise<void> => {
    await act(async () => {
        fireEvent.change(fieldElement, {
            target: {value}
        });
    })
}
